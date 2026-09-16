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


def validate_topic_readme(path: Path, errors: list[str]) -> None:
    text = read_text(path)
    positions = []
    for section in CORE_TOPIC_SECTIONS:
        marker = f"## {section}"
        pos = text.find(marker)
        if pos < 0:
            fail(f"Missing topic section: {path}: {section}", errors)
        positions.append((section, pos))
    if all(pos >= 0 for _, pos in positions):
        if any(positions[i][1] >= positions[i + 1][1] for i in range(len(positions) - 1)):
            fail(f"Topic README core sections out of order: {path}", errors)


def validate_ai_memory(errors: list[str]) -> set[str]:
    path = ROOT / "AI_MEMORY.md"
    if not path.exists():
        fail("Missing AI_MEMORY.md", errors)
        return set()
    text = read_text(path)
    active = set()
    for line in text.splitlines():
        m = re.match(r"\|\s*([^|]+?)\s*\|\s*Active\s*\|\s*`(TOPICS/[^`]+/README\.md)`\s*\|", line)
        if m:
            topic = m.group(1).strip()
            active.add(topic)
            readme = ROOT / m.group(2)
            if not readme.exists():
                fail(f"Active topic points to missing README: {topic} -> {m.group(2)}", errors)
    return active


def validate_topic_registry(active_topics: set[str], errors: list[str]) -> None:
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
    missing = active_topics - actual
    for topic in sorted(missing):
        fail(f"Active topic missing from TOPICS/: {topic}", errors)


def validate_forbidden_files(errors: list[str]) -> None:
    for path in ROOT.rglob("*"):
        if not path.is_file() or ".git" in path.parts:
            continue
        lower = path.name.lower()
        if any(marker.lower() in lower for marker in FORBIDDEN_MARKERS):
            fail(f"Forbidden artifact marker found: {path.relative_to(ROOT)}", errors)


def validate_local_links(errors: list[str]) -> None:
    md_files = list(ROOT.rglob("*.md"))
    code_pattern = re.compile(r"(?<!https?://)(?<![\w/])((?:TOPICS|\.github|scripts)/[^\s)\]`]+)")
    for path in md_files:
        text = read_text(path)
        for raw in code_pattern.findall(text):
            candidate = raw.rstrip(".,;:")
            target = ROOT / candidate
            if not target.exists():
                # Ignore conceptual paths containing angle-bracket placeholders.
                if "<" in candidate or ">" in candidate:
                    continue
                fail(f"Broken local reference in {path.relative_to(ROOT)}: {candidate}", errors)


def validate_csv_files(errors: list[str]) -> None:
    for path in ROOT.rglob("*.csv"):
        try:
            with path.open("r", encoding="utf-8-sig", newline="") as f:
                rows = list(csv.reader(f))
        except Exception as exc:
            fail(f"Cannot parse CSV {path.relative_to(ROOT)}: {exc}", errors)
            continue
        if not rows:
            fail(f"Empty CSV: {path.relative_to(ROOT)}", errors)
            continue
        width = len(rows[0])
        for i, row in enumerate(rows[1:], start=2):
            if len(row) != width:
                fail(f"CSV column mismatch: {path.relative_to(ROOT)} line {i}: expected {width}, got {len(row)}", errors)
                break


def validate_rnd_ids(errors: list[str]) -> None:
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
    ids: dict[str, set[str]] = {prefix: set() for prefix in set(specs.values())}
    for filename, prefix in specs.items():
        path = ks / filename
        if not path.exists():
            fail(f"Missing authoritative Knowledge Sheet file: {path.relative_to(ROOT)}", errors)
            continue
        with path.open("r", encoding="utf-8-sig", newline="") as f:
            rows = list(csv.DictReader(f))
        id_field = next((k for k in rows[0].keys()) if k and "ID" in k.upper()), None if rows else None
        if not id_field:
            fail(f"No ID column detected: {path.relative_to(ROOT)}", errors)
            continue
        for row in rows:
            value = (row.get(id_field) or "").strip()
            if not value:
                continue
            if not re.fullmatch(rf"{re.escape(prefix)}-\d+", value):
                fail(f"Invalid ID {value} in {path.relative_to(ROOT)}; expected prefix {prefix}-", errors)
            if value in ids[prefix]:
                fail(f"Duplicate ID {value} in {path.relative_to(ROOT)}", errors)
            ids[prefix].add(value)


def main() -> int:
    errors: list[str] = []

    required = [ROOT / "AI_MEMORY.md", ROOT / "WORKFLOW.md", ROOT / "README.md"]
    for path in required:
        if not path.exists():
            fail(f"Missing required root file: {path.name}", errors)

    active = validate_ai_memory(errors)
    validate_topic_registry(active, errors)
    validate_forbidden_files(errors)
    validate_local_links(errors)
    validate_csv_files(errors)
    validate_rnd_ids(errors)

    if errors:
        print("Second-Brain validation: FAIL")
        for error in errors:
            print(f"- {error}")
        return 1

    print("Second-Brain validation: PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
