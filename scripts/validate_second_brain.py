from __future__ import annotations

import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOPICS = ROOT / "TOPICS"
CORE_TOPIC_SECTIONS = [
    "Scope", "Current Context", "Status", "Working Principles", "Active Projects / References",
    "Decisions", "Lessons", "Routing", "Next",
]
TOPIC_STATUS_VALUES = {"Building", "Active", "Maintenance", "Frozen", "Paused", "Archived"}
FORBIDDEN_MARKERS = ["DELETE_ME", ".tmp", ".temp", "placeholder", "staging"]
FORBIDDEN_PATHS = [
    Path("docs"),
    Path(".github/workflows/pages.yml"),
]
CANONICAL_DOCS = [
    Path("README.md"),
    Path("WORKFLOW.md"),
    Path("REPOSITORY_CONTRACT.md"),
]
REMOVED_PLATFORM_CONTROLS = ["GitHub Pages", "GitHub Rulesets"]
REQUIRED_GITHUB_COMPONENTS = [
    ".github/workflows/validate.yml",
    ".github/ISSUE_TEMPLATE/config.yml",
    ".github/ISSUE_TEMPLATE/change_request.yml",
    "scripts/validate_second_brain.py",
]


def fail(msg: str, errors: list[str]) -> None:
    errors.append(msg)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def validate_root(errors: list[str]) -> None:
    for name in ["AI_MEMORY.md", "WORKFLOW.md", "REPOSITORY_CONTRACT.md", "README.md"]:
        if not (ROOT / name).exists():
            fail(f"Missing required root file: {name}", errors)
    for name in REQUIRED_GITHUB_COMPONENTS:
        if not (ROOT / name).exists():
            fail(f"Missing required GitHub component: {name}", errors)


def validate_topic_readme(path: Path, errors: list[str]) -> None:
    text = read_text(path)
    positions = []
    for section in CORE_TOPIC_SECTIONS:
        pos = text.find(f"## {section}")
        if pos < 0:
            fail(f"Missing topic section: {path.relative_to(ROOT)}: {section}", errors)
        positions.append((section, pos))
    if all(pos >= 0 for _, pos in positions):
        if any(positions[i][1] >= positions[i + 1][1] for i in range(len(positions) - 1)):
            fail(f"Topic README core sections out of order: {path.relative_to(ROOT)}", errors)
    status_match = re.search(r"## Status\s*\n\s*- State:\s*([^\n]+)\n\s*- Summary:\s*([^\n]+)\n\s*- Direction:\s*([^\n]+)\n\s*- Last reviewed:\s*(\d{4}-\d{2}-\d{2})", text)
    if not status_match:
        fail(f"Topic README has invalid/missing Status block: {path.relative_to(ROOT)}", errors)
    elif status_match.group(1).strip() not in TOPIC_STATUS_VALUES:
        fail(f"Invalid topic state in {path.relative_to(ROOT)}: {status_match.group(1).strip()}", errors)


def extract_topic_registry(errors: list[str]) -> tuple[set[str], dict[str, str]]:
    path = ROOT / "AI_MEMORY.md"
    if not path.exists():
        return set(), {}
    registered = set()
    states: dict[str, str] = {}
    for line in read_text(path).splitlines():
        match = re.match(r"\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*`(TOPICS/[^`]+/README\.md)`\s*\|", line)
        if not match:
            continue
        entry_name, state, readme_rel = match.groups()
        state = state.strip()
        if state not in TOPIC_STATUS_VALUES:
            fail(f"Invalid topic status in AI_MEMORY.md: {entry_name} -> {state}", errors)
            continue
        topic_name = Path(readme_rel).parts[-2]
        if topic_name in states:
            fail(f"Duplicate topic registry entry: {topic_name}", errors)
        states[topic_name] = state
        readme = ROOT / readme_rel
        if not readme.exists():
            fail(f"Topic registry points to missing README: {entry_name} -> {readme_rel}", errors)
            continue
        if state != "Archived":
            registered.add(topic_name)
    if not states:
        fail("AI_MEMORY.md contains no topic registry entries", errors)
    return registered, states


def validate_topics(active_topics: set[str], registry_states: dict[str, str], errors: list[str]) -> None:
    if not TOPICS.exists():
        fail("Missing TOPICS/", errors)
        return
    actual = {p.name for p in TOPICS.iterdir() if p.is_dir()}
    for topic in sorted(actual):
        readme = TOPICS / topic / "README.md"
        if not readme.exists():
            fail(f"Topic missing README.md: {topic}", errors)
        else:
            validate_topic_readme(readme, errors)
    for topic in sorted(active_topics - actual):
        fail(f"Registered topic missing from TOPICS/: {topic}", errors)


    for topic in sorted(actual - active_topics):
        if registry_states.get(topic) != "Archived":
            fail(f"Topic folder is not registered in AI_MEMORY.md: {topic}", errors)
    for topic, state in sorted(registry_states.items()):
        if state == "Archived":
            continue
        readme = TOPICS / topic / "README.md"
        if readme.exists():
            match = re.search(r"## Status\s*\n\s*- State:\s*([^\n]+)", read_text(readme))
            if match and match.group(1).strip() != state:
                fail(f"Topic status mismatch: AI_MEMORY.md={state}, {readme.relative_to(ROOT)}={match.group(1).strip()}", errors)


def validate_forbidden_files(errors: list[str]) -> None:
    for forbidden in FORBIDDEN_PATHS:
        path = ROOT / forbidden
        if path.exists():
            fail(f"Forbidden legacy platform path found: {forbidden}", errors)
    for path in ROOT.rglob("*"):
        if not path.is_file() or ".git" in path.parts or path.name == "validate_second_brain.py":
            continue
        lower = path.name.lower()
        if any(marker.lower() in lower for marker in FORBIDDEN_MARKERS):
            fail(f"Forbidden artifact marker found: {path.relative_to(ROOT)}", errors)


def validate_removed_platform_controls(errors: list[str]) -> None:
    for relative in CANONICAL_DOCS:
        path = ROOT / relative
        if not path.exists():
            continue
        text = read_text(path)
        for control in REMOVED_PLATFORM_CONTROLS:
            if control in text:
                fail(
                    f"Removed platform control still referenced in canonical operational document: "
                    f"{relative} -> {control}",
                    errors,
                )


def validate_local_references(errors: list[str]) -> None:
    pattern = re.compile(r"`((?:TOPICS|\.github|scripts)/[^`]+)`")
    for path in ROOT.rglob("*.md"):
        for raw in pattern.findall(read_text(path)):
            candidate = raw.rstrip(".,;:")
            if "<" in candidate or ">" in candidate:
                continue
            if not (ROOT / candidate).exists():
                fail(f"Broken local reference in {path.relative_to(ROOT)}: {candidate}", errors)


def validate_csv_shape(errors: list[str]) -> None:
    for path in ROOT.rglob("*.csv"):
        try:
            with path.open("r", encoding="utf-8-sig", newline="") as handle:
                rows = list(csv.reader(handle))
        except Exception as exc:
            fail(f"Cannot parse CSV {path.relative_to(ROOT)}: {exc}", errors)
            continue
        if not rows:
            fail(f"Empty CSV: {path.relative_to(ROOT)}", errors)
            continue
        width = len(rows[0])
        if width == 0:
            fail(f"CSV has empty header: {path.relative_to(ROOT)}", errors)
            continue
        for index, row in enumerate(rows[1:], start=2):
            if len(row) != width:
                fail(f"CSV column mismatch: {path.relative_to(ROOT)} line {index}: expected {width}, got {len(row)}", errors)
                break


def validate_rnd_knowledge_sheet(errors: list[str]) -> None:
    ks = ROOT / "TOPICS" / "RnD INNOVATION" / "Knowledge sheet"
    if not ks.exists():
        return
    specs = {
        "Market_Signal_v2.csv": "MS", "Competitor_Tech_v2.csv": "CT",
        "Supplier_tech_v2.csv": "ST", "Tech_radar_v2.csv": "TR", "Sources_v2.csv": "SRC",
    }
    master_ids = {prefix: set() for prefix in specs.values()}
    rows_by_file, headers_by_file = {}, {}
    for filename, prefix in specs.items():
        path = ks / filename
        if not path.exists():
            fail(f"Missing authoritative Knowledge Sheet file: {path.relative_to(ROOT)}", errors)
            continue
        try:
            with path.open("r", encoding="utf-8-sig", newline="") as handle:
                reader = csv.DictReader(handle)
                rows, headers = list(reader), reader.fieldnames or []
        except Exception as exc:
            fail(f"Cannot parse Knowledge Sheet file {path.relative_to(ROOT)}: {exc}", errors)
            continue
        rows_by_file[filename], headers_by_file[filename] = rows, headers
        id_field = next((h for h in headers if h and "ID" in h.upper()), None)
        if not id_field:
            fail(f"No ID column detected: {path.relative_to(ROOT)}", errors)
            continue
        for row in rows:
            value = (row.get(id_field) or "").strip()
            if not value:
                continue
            if not re.fullmatch(rf"{re.escape(prefix)}-\d+", value):
                fail(f"Invalid ID {value} in {path.relative_to(ROOT)}; expected {prefix}-<number>", errors)
            if value in master_ids[prefix]:
                fail(f"Duplicate ID {value} in {path.relative_to(ROOT)}", errors)
            master_ids[prefix].add(value)
    relation_specs = {
        "Competitor_Tech_v2.csv": [("Related Market Signal IDs", "MS")],
        "Supplier_tech_v2.csv": [],
        "Tech_radar_v2.csv": [("Supplier Tech IDs", "ST"), ("Competitor Tech IDs", "CT"), ("Market Signal IDs", "MS"), ("Source IDs", "SRC")],
        "Market_Signal_v2.csv": [("Source IDs", "SRC")],
        "Sources_v2.csv": [],
    }
    for filename, relations in relation_specs.items():
        for field, prefix in relations:
            if filename not in rows_by_file:
                continue
            if field not in headers_by_file.get(filename, []):
                fail(f"Missing expected relationship column {field} in {filename}", errors)
                continue
            for row_number, row in enumerate(rows_by_file[filename], start=2):
                raw = (row.get(field) or "").strip()
                for value in [x.strip() for x in raw.split(";") if x.strip()]:
                    if not re.fullmatch(rf"{re.escape(prefix)}-\d+", value):
                        fail(f"Invalid relationship ID {value} in {filename} line {row_number}; expected {prefix}-<number>", errors)
                    elif value not in master_ids.get(prefix, set()):
                        fail(f"Dangling relationship {value} in {filename} line {row_number}", errors)


def validate_high_level_controls(errors: list[str]) -> None:
    contract = ROOT / "REPOSITORY_CONTRACT.md"
    workflow = ROOT / "WORKFLOW.md"
    readme = ROOT / "README.md"
    if contract.exists():
        text = read_text(contract)
        for phrase in ["Core invariants", "Source-of-truth hierarchy", "Change contract", "Atomic publication contract", "Negative-state contract", "GitHub Actions", "Issue Forms", "Task Lists"]:
            if phrase not in text:
                fail(f"REPOSITORY_CONTRACT.md missing control section/phrase: {phrase}", errors)
    if workflow.exists():
        text = read_text(workflow)
        for phrase in ["TARGET STATE", "PRE-FLIGHT", "ATOMIC CHANGE", "VALIDATE", "VERIFY", "Risk-based execution", "User prompt reinforcement layer", "GitHub Actions", "Issue Form", "Task List"]:
            if phrase not in text:
                fail(f"WORKFLOW.md missing control section/phrase: {phrase}", errors)
    if readme.exists():
        text = read_text(readme)
        for phrase in ["GitHub Actions", "Issue Forms", "Task Lists", "Mermaid"]:
            if phrase not in text:
                fail(f"README.md missing platform capability: {phrase}", errors)


def main() -> int:
    errors: list[str] = []
    validate_root(errors)
    active, registry_states = extract_topic_registry(errors)
    validate_topics(active, registry_states, errors)
    validate_forbidden_files(errors)
    validate_removed_platform_controls(errors)
    validate_local_references(errors)
    validate_csv_shape(errors)
    validate_rnd_knowledge_sheet(errors)
    validate_high_level_controls(errors)
    if errors:
        print("Second-Brain validation: FAIL")
        for error in errors:
            print(f"- {error}")
        return 1
    print("Second-Brain validation: PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
