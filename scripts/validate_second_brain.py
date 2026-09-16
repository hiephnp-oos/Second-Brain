from __future__ import annotations

import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOPICS = ROOT / "TOPICS"
CORE_TOPIC_SECTIONS = [
    "Scope",
    "Current Context",
    "Working Principles",
    "Active Projects / References",
    "Decisions",
    "Lessons",
    "Routing",
    "Next",
]
FORBIDDEN_MARKERS = ["DELETE_ME", ".tmp", ".temp", "placeholder", "staging"]


def fail(msg: str, errors: list[str]) -> None:
    errors.append(msg)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def validate_root(errors: list[str]) -> None:
    for name in ["AI_MEMORY.md", "WORKFLOW.md", "REPOSITORY_CONTRACT.md", "README.md"]:
        if not (ROOT / name).exists():
            fail(f"Missing required root file: {name}", errors)
    for name in [".github/workflows/validate.yml", "scripts/validate_second_brain.py"]:
        if not (ROOT / name).exists():
            fail(f"Missing validation component: {name}", errors)


def validate_topic_readme(path: Path, errors: list[str]) -> None:
    text = read_text(path)
    positions: list[tuple[str, int]] = []
    for section in CORE_TOPIC_SECTIONS:
        marker = f"## {section}"
        pos = text.find(marker)
        if pos < 0:
            fail(f"Missing topic section: {path.relative_to(ROOT)}: {section}", errors)
        positions.append((section, pos))
    if all(pos >= 0 for _, pos in positions):
        if any(positions[i][1] >= positions[i + 1][1] for i in range(len(positions) - 1)):
            fail(f"Topic README core sections out of order: {path.relative_to(ROOT)}", errors)


def extract_active_topics(errors: list[str]) -> set[str]:
    path = ROOT / "AI_MEMORY.md"
    if not path.exists():
        return set()
    active: set[str] = set()
    for line in read_text(path).splitlines():
        match = re.match(r"\|\s*([^|]+?)\s*\|\s*Active\s*\|\s*`(TOPICS/[^`]+/README\.md)`\s*\|", line)
        if match:
            entry_name = match.group(1).strip()
            readme_rel = match.group(2)
            readme = ROOT / readme_rel
            if not readme.exists():
                fail(f"Active topic points to missing README: {entry_name} -> {readme_rel}", errors)
                continue
            # The entry-point path is authoritative for the actual topic folder.
            # The display name in the Topic column may differ in case or wording.
            topic = Path(readme_rel).parts[-2]
            active.add(topic)
    return active


def validate_topics(active_topics: set[str], errors: list[str]) -> None:
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
        fail(f"Active topic missing from TOPICS/: {topic}", errors)


def validate_forbidden_files(errors: list[str]) -> None:
    for path in ROOT.rglob("*"):
        if not path.is_file() or ".git" in path.parts:
            continue
        if path.name == "validate_second_brain.py":
            continue
        lower = path.name.lower()
        if any(marker.lower() in lower for marker in FORBIDDEN_MARKERS):
            fail(f"Forbidden artifact marker found: {path.relative_to(ROOT)}", errors)


def validate_local_references(errors: list[str]) -> None:
    md_files = list(ROOT.rglob("*.md"))
    # Validate explicit backticked repository-relative paths only. This avoids
    # false positives from prose examples and conceptual paths.
    pattern = re.compile(r"`((?:TOPICS|\.github|scripts)/[^`]+)`")
    for path in md_files:
        for raw in pattern.findall(read_text(path)):
            candidate = raw.rstrip(".,;:")
            if "<" in candidate or ">" in candidate:
                continue
            if candidate.startswith(("TOPICS/", ".github/", "scripts/")):
                target = ROOT / candidate
                if not target.exists():
                    fail(f"Broken local reference in {path.relative_to(ROOT)}: {candidate}", errors)


def validate_csv_shape(errors: list[str]) -> None:
    for path in ROOT.rglob("*.csv"):
        try:
            with path.open("r", encoding="utf-8-sig", newline="") as handle:
                reader = csv.reader(handle)
                rows = list(reader)
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
                fail(
                    f"CSV column mismatch: {path.relative_to(ROOT)} line {index}: expected {width}, got {len(row)}",
                    errors,
                )
                break


def validate_rnd_knowledge_sheet(errors: list[str]) -> None:
    ks = ROOT / "TOPICS" / "RnD INNOVATION" / "Knowledge sheet"
    if not ks.exists():
        return

    specs = {
        "Market_Signal_v2.csv": "MS",
        "Competitor_Tech_v2.csv": "CT",
        "Supplier_tech_v2.csv": "ST",
        "Tech_radar_v2.csv": "TR",
        "Sources_v2.csv": "SRC",
    }
    master_ids: dict[str, set[str]] = {prefix: set() for prefix in specs.values()}

    rows_by_file: dict[str, list[dict[str, str]]] = {}
    headers_by_file: dict[str, list[str]] = {}
    for filename, prefix in specs.items():
        path = ks / filename
        if not path.exists():
            fail(f"Missing authoritative Knowledge Sheet file: {path.relative_to(ROOT)}", errors)
            continue
        try:
            with path.open("r", encoding="utf-8-sig", newline="") as handle:
                reader = csv.DictReader(handle)
                rows = list(reader)
                headers = reader.fieldnames or []
        except Exception as exc:
            fail(f"Cannot parse Knowledge Sheet file {path.relative_to(ROOT)}: {exc}", errors)
            continue

        rows_by_file[filename] = rows
        headers_by_file[filename] = headers
        if not headers:
            fail(f"Missing CSV headers: {path.relative_to(ROOT)}", errors)
            continue

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
        "Tech_radar_v2.csv": [
            ("Supplier Tech IDs", "ST"),
            ("Competitor Tech IDs", "CT"),
            ("Market Signal IDs", "MS"),
            ("Source IDs", "SRC"),
        ],
        "Market_Signal_v2.csv": [("Source IDs", "SRC")],
        "Sources_v2.csv": [],
    }
    for filename, relations in relation_specs.items():
        for field, prefix in relations:
            if filename not in rows_by_file:
                continue
            headers = headers_by_file.get(filename, [])
            if field not in headers:
                fail(f"Missing expected relationship column {field} in {filename}", errors)
                continue
            for row_number, row in enumerate(rows_by_file[filename], start=2):
                raw = (row.get(field) or "").strip()
                if not raw:
                    continue
                for value in [item.strip() for item in raw.split(";") if item.strip()]:
                    if not re.fullmatch(rf"{re.escape(prefix)}-\d+", value):
                        fail(f"Invalid relationship ID {value} in {filename} line {row_number}; expected {prefix}-<number>", errors)
                    elif value not in master_ids.get(prefix, set()):
                        fail(f"Dangling relationship {value} in {filename} line {row_number}", errors)


def validate_high_level_controls(errors: list[str]) -> None:
    contract = ROOT / "REPOSITORY_CONTRACT.md"
    workflow = ROOT / "WORKFLOW.md"
    if contract.exists():
        text = read_text(contract)
        for required_phrase in ["Core invariants", "Source-of-truth hierarchy", "Change contract", "Negative-state contract"]:
            if required_phrase not in text:
                fail(f"REPOSITORY_CONTRACT.md missing control section/phrase: {required_phrase}", errors)
    if workflow.exists():
        text = read_text(workflow)
        for required_phrase in ["TARGET STATE", "VALIDATE", "VERIFY", "Risk-based execution", "User prompt reinforcement layer"]:
            if required_phrase not in text:
                fail(f"WORKFLOW.md missing control section/phrase: {required_phrase}", errors)


def main() -> int:
    errors: list[str] = []
    validate_root(errors)
    active = extract_active_topics(errors)
    validate_topics(active, errors)
    validate_forbidden_files(errors)
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
