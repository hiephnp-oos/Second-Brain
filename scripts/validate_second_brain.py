from __future__ import annotations

import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOPICS = ROOT / "TOPICS"
CORE_TOPIC_SECTIONS = [
    "Scope", "Current Context", "Status", "Working Principles",
    "Active Projects / References", "Decisions", "Lessons", "Routing", "Next",
]
TOPIC_SECTION_ALIASES = {
    "Active Projects / References": {"Active Projects / References", "Active Workstreams"},
}
TOPIC_STATUS_VALUES = {"Building", "Active", "Maintenance", "Frozen", "Paused", "Archived"}
FORBIDDEN_MARKERS = ["DELETE_ME", ".tmp", ".temp", "placeholder"]
WORKSTREAM_PURPOSE_MARKERS = {"Purpose", "Purpose / Scope", "Scope", "Current Context"}
WORKSTREAM_STATE_MARKERS = {"Routing", "Next", "Decisions", "Decisions / Status", "Status", "Working Rules", "Operating Rule", "Capability", "Capability Contract", "Contract"}
CANONICAL_LIFECYCLE = "READ → ROUTE → INSPECT → TARGET STATE → CLASSIFY → RECONCILE → PRE-FLIGHT → ATOMIC CHANGE → VALIDATE → VERIFY → REPORT"
STALE_REFERENCE_FRAGMENTS = [
    "TOPICS/6. RnD INNOVATION",
    "TOPICS/2. CAREER/4. RUNS",
    "1. Personal Research/2. Project Improvement/",
    "1. Personal Research/1. Claw Discovery/",
    "2. Idea Review/",
    "3. Knowledge sheet/",
]
FORBIDDEN_PATHS = [
    Path("docs"),
]
CANONICAL_DOCS = [
    Path("README.md"),
    Path("SYSTEM CORE/WORKFLOW.md"),
    Path("SYSTEM CORE/REPOSITORY_CONTRACT.md"),
]
REMOVED_PLATFORM_CONTROLS = ["GitHub Rulesets"]
REQUIRED_GITHUB_COMPONENTS = [
    ".github/workflows/validate.yml",
    ".github/dependabot.yml",
    ".github/ISSUE_TEMPLATE/config.yml",
    ".github/ISSUE_TEMPLATE/change_request.yml",
    ".github/PULL_REQUEST_TEMPLATE.md",
    "GITHUB_PROJECTS.md",
    "SECURITY.md",
    "scripts/validate_second_brain.py",
]


def fail(msg: str, errors: list[str]) -> None:
    errors.append(msg)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def validate_root(errors: list[str]) -> None:
    required = ["AI_MEMORY.md", "README.md", "SYSTEM CORE/WORKFLOW.md", "SYSTEM CORE/REPOSITORY_CONTRACT.md"]
    for name in required:
        if not (ROOT / name).exists():
            fail(f"Missing required root/system file: {name}", errors)
    for name in REQUIRED_GITHUB_COMPONENTS:
        if not (ROOT / name).exists():
            fail(f"Missing required GitHub component: {name}", errors)

def validate_topic_readme(path: Path, errors: list[str]) -> None:
    text = read_text(path)
    positions = []
    for section in CORE_TOPIC_SECTIONS:
        aliases = TOPIC_SECTION_ALIASES.get(section, {section})
        matches = [(text.find(f"## {alias}"), alias) for alias in aliases]
        matches = [(pos, alias) for pos, alias in matches if pos >= 0]
        if not matches:
            fail(f"Missing topic section: {path.relative_to(ROOT)}: {section}", errors)
            positions.append((section, -1))
            continue
        pos, _ = min(matches, key=lambda item: item[0])
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
        if ".git" in path.parts:
            continue
        if not path.is_file() or path.name == "validate_second_brain.py":
            continue
        lower = path.name.lower()
        if any(marker.lower() in lower for marker in FORBIDDEN_MARKERS):
            fail(f"Forbidden artifact marker found: {path.relative_to(ROOT)}", errors)


def validate_platform_layers(errors: list[str]) -> None:
    projects = ROOT / "GITHUB_PROJECTS.md"
    security = ROOT / "SECURITY.md"
    dependabot = ROOT / ".github/dependabot.yml"

    if (ROOT / ".github/workflows/pages.yml").exists() or (ROOT / ".github/pages").exists():
        fail("Removed GitHub Pages artifacts remain", errors)

    if not projects.exists():
        fail("GitHub Projects configuration contract missing", errors)
    else:
        text = read_text(projects).lower()
        for phrase in [
            "execution-tracking layer",
            "markdown files remain the source of truth",
            "must not become a second authoritative copy",
            "second-brain operations",
        ]:
            if phrase not in text:
                fail(f"GITHUB_PROJECTS.md missing platform boundary '{phrase}'", errors)

    if not security.exists():
        fail("SECURITY.md missing", errors)
    else:
        text = read_text(security).lower()
        for phrase in [
            "secret scanning",
            "dependabot",
            "security controls are protection layers",
            "claw",
        ]:
            if phrase not in text:
                fail(f"SECURITY.md missing security boundary '{phrase}'", errors)

    if not dependabot.exists():
        fail(".github/dependabot.yml missing", errors)
    else:
        text = read_text(dependabot).lower()
        for phrase in [
            'package-ecosystem: "github-actions"',
            'directory: "/"',
            'interval: "weekly"',
        ]:
            if phrase not in text:
                fail(f"Dependabot configuration missing '{phrase}'", errors)


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
    root_pattern = re.compile(r"`((?:TOPICS|SYSTEM CORE|\.github|scripts)/[^`]+)`")
    markdown_link_pattern = re.compile(r"\]\(([^)]+)\)")

    def is_template_reference(candidate: str) -> bool:
        """
        Template/example paths are documentation syntax, not repository references.
        Do not require a concrete file for placeholders such as YYYY-W##.md.
        """
        return bool(re.search(r"\bYYYY(?:-[A-Z]{1,4})+\b|\bYYYY-[Ww]##\b", candidate))

    def check_candidate(source: Path, raw: str) -> None:
        candidate = raw.strip().strip("<>").split(' "')[0].strip()
        if not candidate or candidate.startswith(("#", "http://", "https://", "mailto:")):
            return
        candidate = candidate.rstrip(".,;:")
        if is_template_reference(candidate):
            return
        if candidate.startswith("/"):
            target = ROOT / candidate.lstrip("/")
        else:
            target = source.parent / candidate
        if not target.exists():
            fail(f"Broken local reference in {source.relative_to(ROOT)}: {candidate}", errors)

    for path in ROOT.rglob("*.md"):
        text = read_text(path)
        for raw in root_pattern.findall(text):
            candidate = raw.rstrip(".,;:")
            if "<" in candidate or ">" in candidate or is_template_reference(candidate):
                continue
            if not (ROOT / candidate).exists():
                fail(f"Broken local reference in {path.relative_to(ROOT)}: {candidate}", errors)
        for raw in markdown_link_pattern.findall(text):
            check_candidate(path, raw)


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
            if not row or all(not cell.strip() for cell in row):
                continue
            if len(row) != width:
                fail(f"CSV column mismatch: {path.relative_to(ROOT)} line {index}: expected {width}, got {len(row)}", errors)
                break


def validate_rnd_knowledge_sheet(errors: list[str]) -> None:
    ks = ROOT / "TOPICS/E. RnD INNOVATION/3. KNOWLEDGE/RELEASED/Release_23Sep2026"
    if not ks.exists():
        fail(f"Released R&D Knowledge Sheet missing: {ks.relative_to(ROOT)}", errors)
        return
    candidate = ROOT / "TOPICS/E. RnD INNOVATION/3. KNOWLEDGE/BETA"
    if not candidate.exists():
        fail(f"R&D BETA knowledge area missing: {candidate.relative_to(ROOT)}", errors)
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
        if any(not (header or "").strip() for header in headers):
            fail(f"Blank CSV header: {path.relative_to(ROOT)}", errors)
        normalized_headers = [(header or "").strip().casefold() for header in headers]
        if len(normalized_headers) != len(set(normalized_headers)):
            fail(f"Duplicate CSV headers: {path.relative_to(ROOT)}", errors)
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


def validate_workstream_readmes(errors: list[str]) -> None:
    if not TOPICS.exists():
        return
    for path in TOPICS.rglob("README.md"):
        relative = path.relative_to(TOPICS)
        # Apply workstream-specific README requirements only to workstream-owned docs.
        # Capability and Knowledge READMEs have separate contracts/validators.
        if "2. WORKSTREAMS" not in relative.parts:
            continue
        text = read_text(path)
        headings = {line[3:].strip() for line in text.splitlines() if line.startswith("## ")}
        if not text.lstrip().startswith("# "):
            fail(f"Workstream README missing title: {path.relative_to(ROOT)}", errors)
        if not headings.intersection(WORKSTREAM_PURPOSE_MARKERS):
            fail(f"Workstream README missing purpose/context section: {path.relative_to(ROOT)}", errors)
        if not headings.intersection(WORKSTREAM_STATE_MARKERS):
            fail(f"Workstream README missing routing/state/rules section: {path.relative_to(ROOT)}", errors)


def validate_control_reference_consistency(errors: list[str]) -> None:
    """Prevent structural refactors from leaving stale control or routing references."""
    roots = [ROOT / "AI_MEMORY.md", ROOT / "README.md", ROOT / "SYSTEM CORE", ROOT / ".github", ROOT / "TOPICS"]
    files = []
    for base in roots:
        if base.is_file():
            files.append(base)
        elif base.exists():
            files.extend(path for path in base.rglob("*") if path.is_file() and ".git" not in path.parts)
    for path in files:
        if path.name == "validate_second_brain.py":
            continue
        try:
            text = read_text(path)
        except UnicodeDecodeError:
            continue
        for fragment in STALE_REFERENCE_FRAGMENTS:
            if fragment in text:
                fail(f"Stale architecture reference in {path.relative_to(ROOT)}: {fragment}", errors)
        if path.suffix.lower() in {".md", ".yml", ".yaml"}:
            if re.search(r"(?<!SYSTEM CORE/)(?<!SYSTEM%20CORE/)\bWORKFLOW\.md\b", text):
                fail(f"Unqualified legacy workflow reference in {path.relative_to(ROOT)}", errors)
            if re.search(r"(?<!SYSTEM CORE/)(?<!SYSTEM%20CORE/)\bREPOSITORY_CONTRACT\.md\b", text):
                fail(f"Unqualified legacy repository contract reference in {path.relative_to(ROOT)}", errors)
    config = ROOT / ".github/ISSUE_TEMPLATE/config.yml"
    if config.exists() and "SYSTEM%20CORE/WORKFLOW.md" not in read_text(config):
        fail("Issue template contact link does not point to SYSTEM CORE/WORKFLOW.md", errors)


def validate_capabilities(errors: list[str]) -> None:
    career = ROOT / "TOPICS/B. CAREER"
    for name in ["1.1 JOB_SEARCH", "1.2 COMPANY_RADAR", "1.3 REMOTE_AI"]:
        if not (career / "1. CAPABILITIES" / name / "README.md").exists() or not (career / "1. CAPABILITIES" / name / "PROMPT.md").exists():
            fail(f"Career capability incomplete: {name}", errors)
    reports = career / "2. REPORTS"
    if not (reports / "README.md").exists():
        fail("Career weekly report contract missing", errors)
    if (reports / "2.1 WEEKLY").exists():
        fail("Obsolete Career weekly subfolder still exists", errors)

    rnd = ROOT / "TOPICS/E. RnD INNOVATION"
    capability_names = ["1.1 CLAW_DISCOVERY","1.2 VERIFICATION","1.3 DEEP_RESEARCH","1.4 EVALUATION","1.5 KNOWLEDGE_PROMOTION","1.6 SUPPLIER_KNOWLEDGE_INTAKE"]
    for name in capability_names:
        path = rnd / "1. CAPABILITIES" / name / "README.md"
        if not path.exists():
            fail(f"R&D capability missing: {path.relative_to(ROOT)}", errors)
            continue
        text = read_text(path).lower()
        required_groups = {
            "purpose": ["purpose"],
            "trigger": ["trigger"],
            "inputs": ["input", "preconditions"],
            "procedure": ["procedure", "process"],
            "tool boundary": ["tool boundary", "tools / ai"],
            "output": ["output"],
            "quality gate": ["quality gates", "validation"],
            "evidence state": ["evidence state", "evidence and uncertainty", "canonical states"],
            "handoff/escalation": ["handoffs", "escalation"],
            "human gate": ["human gate", "human verification gate"],
            "persistence boundary": ["persistence boundary", "promotion / persistence"],
            "failure handling": ["failure handling", "failure and stop conditions"],
        }
        for field, alternatives in required_groups.items():
            if not any(phrase in text for phrase in alternatives):
                fail(f"R&D capability contract missing '{field}' (accepted: {', '.join(alternatives)}): {path.relative_to(ROOT)}", errors)

    for name in ["2.1 PERSONAL_RESEARCH","2.2 IDEA_REVIEW","2.3 PROJECT_IMPROVEMENT"]:
        path = rnd / "2. WORKSTREAMS" / name / "README.md"
        if not path.exists():
            fail(f"R&D workstream missing: {path.relative_to(ROOT)}", errors)
    if not (rnd / "3. KNOWLEDGE/RELEASED/Release_23Sep2026/README.md").exists():
        fail("Released R&D Knowledge Sheet entry point missing", errors)
    if not (rnd / "3. KNOWLEDGE/BETA/README.md").exists():
        fail("R&D BETA knowledge entry point missing", errors)

    system = ROOT / "SYSTEM CORE/CAPABILITIES"
    for name in ["1. HANDOFF","2. RETRIEVAL"]:
        path = system / name / "README.md"
        if not path.exists():
            fail(f"System Core capability missing: {path.relative_to(ROOT)}", errors)

def validate_architecture_boundaries(errors: list[str]) -> None:
    rnd = ROOT / "TOPICS/E. RnD INNOVATION"
    capabilities = rnd / "1. CAPABILITIES"
    output = rnd / "2. WORKSTREAMS/2.1 PERSONAL_RESEARCH"

    if not output.exists():
        fail(f"Personal Research output owner missing: {output.relative_to(ROOT)}", errors)
    if (capabilities / "1.1 CLAW_DISCOVERY/staging").exists():
        fail("Capability owns execution staging; move it to the invoking workstream output area", errors)
    if (capabilities / "1.1 CLAW_DISCOVERY/batches").exists():
        fail("Capability owns execution batches; move them to the invoking workstream output area", errors)
    for legacy_dir in ["staging", "batches"]:
        if (output / legacy_dir).exists():
            fail(f"Retired Personal Research directory must not exist: {output / legacy_dir}", errors)

    stale_fragments = [
        "TOPICS/6. RnD INNOVATION",
        "TOPICS/2. CAREER/4. RUNS",
        "1. Personal Research/",
        "2. Idea Review/",
        "3. Knowledge sheet/",
        "1. Personal Research/2. Project Improvement/",
    ]
    canonical_docs = [
        ROOT / "AI_MEMORY.md",
        ROOT / "README.md",
        ROOT / "SYSTEM CORE/README.md",
        ROOT / "SYSTEM CORE/WORKFLOW.md",
        ROOT / "SYSTEM CORE/REPOSITORY_CONTRACT.md",
        rnd / "README.md",
        ROOT / "TOPICS/B. CAREER/README.md",
        ROOT / "TOPICS/B. CAREER/CAREER_EXECUTION_CONTRACT.md",
    ]
    for path in canonical_docs:
        if not path.exists():
            continue
        text = read_text(path)
        for fragment in stale_fragments:
            if fragment in text:
                fail(f"Stale refactor path/semantic reference in {path.relative_to(ROOT)}: {fragment}", errors)

def validate_future_rnd_references(errors: list[str]) -> None:
    for rel in [
        Path("TOPICS/E. RnD INNOVATION/2. WORKSTREAMS/2.3 PROJECT_IMPROVEMENT/02_SoL-Pi Reference Architecture.md"),
        Path("TOPICS/E. RnD INNOVATION/2. WORKSTREAMS/2.3 PROJECT_IMPROVEMENT/03_Future Improvement Reference Architecture.md"),
    ]:
        if not (ROOT / rel).exists():
            fail(f"Required R&D future reference missing: {rel}", errors)


def validate_career_scheduled_provenance(errors: list[str]) -> None:
    path = ROOT / Path("TOPICS/B. CAREER/CAREER_EXECUTION_CONTRACT.md")
    if not path.exists():
        fail("Career scheduled execution provenance contract missing", errors)
        return
    text = read_text(path)
    lowered = text.lower()
    canonical = ["missing", "incomplete", "present_unverified", "manual_recovery", "not_verified", "repository_contract.md"]
    for phrase in canonical:
        if phrase not in lowered:
            fail(f"Career scheduled provenance contract missing canonical state/reference '{phrase}'", errors)
    forbidden = ["scheduled invocation verified", "scheduled execution verified", "execution completed", "output recovered"]
    for phrase in forbidden:
        if phrase in lowered:
            fail(f"Career scheduled provenance contract contains non-canonical state '{phrase}'", errors)


def validate_claw_watchdog_contract(errors: list[str]) -> None:
    path = ROOT / Path(".github/workflows/claw-persistence-watchdog.yml")
    if not path.exists():
        fail("Claw persistence watchdog workflow missing", errors)
        return
    text = read_text(path)
    required = [
        'name: Claw Daily Persistence Watchdog',
        'cron: "0 1 * * *"',
        'TZ=Asia/Ho_Chi_Minh date +%F',
        'artifact_state=MISSING',
        'artifact_state=INCOMPLETE',
        'artifact_state=PRESENT_UNVERIFIED',
        'artifact_state=MANUAL_RECOVERY',
        'provenance_state=NOT_VERIFIED',
        'does not prove that the external 05:00 scheduled task executed',
    ]
    for phrase in required:
        if phrase not in text:
            fail(f"Claw watchdog contract missing '{phrase}'", errors)
    forbidden = [
        'provenance_state=SCHEDULED_EXECUTION_VERIFIED',
        'artifact_state=SCHEDULED_EXECUTION_VERIFIED',
    ]
    for phrase in forbidden:
        if phrase in text:
            fail(f"Claw watchdog must not claim external scheduler provenance: '{phrase}'", errors)


def validate_scheduled_capability_contracts(errors: list[str]) -> None:
    for rel in [
        Path("TOPICS/B. CAREER/IMPLEMENTATION_PLAN.md"),
        Path("TOPICS/E. RnD INNOVATION/1. CAPABILITIES/1.1 CLAW_DISCOVERY/README.md"),
    ]:
        path = ROOT / rel
        if not path.exists():
            fail(f"Scheduled capability contract missing: {rel}", errors)
            continue
        text = read_text(path).lower()
        for phrase in ["scheduler", "cadence", "trigger", "output", "validation"]:
            if phrase not in text:
                fail(f"Scheduled capability contract missing '{phrase}': {rel}", errors)

    # Durable scheduled outputs must expose persistence verification explicitly.
    persistence_contracts = [
        (
            Path("TOPICS/B. CAREER/CAREER_EXECUTION_CONTRACT.md"),
            ["weekly persistence", "re-read", "final repository state", "not completion"],
        ),
        (
            Path("TOPICS/E. RnD INNOVATION/1. CAPABILITIES/1.1 CLAW_DISCOVERY/README.md"),
            ["date-specific daily record", "re-read", "final repository state", "not completion"],
        ),
    ]
    for rel, phrases in persistence_contracts:
        path = ROOT / rel
        if not path.exists():
            fail(f"Scheduled persistence contract missing: {rel}", errors)
            continue
        text = read_text(path).lower()
        for phrase in phrases:
            if phrase not in text:
                fail(f"Scheduled persistence contract missing '{phrase}': {rel}", errors)


def validate_prompt_duplicate_rules(errors: list[str]) -> None:
    prompt_files = [
        ROOT / "TOPICS/E. RnD INNOVATION/2. WORKSTREAMS/2.1 PERSONAL_RESEARCH/Prompt.csv",
        ROOT / "TOPICS/E. RnD INNOVATION/2. WORKSTREAMS/2.3 PROJECT_IMPROVEMENT/Prompt.csv",
    ]
    for path in prompt_files:
        if not path.exists():
            continue
        text = read_text(path)
        # Detect exact repeated escaped instruction lines inside a prompt asset.
        logical_lines = [line.strip() for line in text.replace("\\n", "\n").splitlines() if line.strip()]
        for index in range(1, len(logical_lines)):
            if logical_lines[index] == logical_lines[index - 1] and logical_lines[index].startswith("- "):
                fail(f"Duplicated consecutive prompt rule in {path.relative_to(ROOT)}: {logical_lines[index]}", errors)


def validate_rnd_regression_contract(errors: list[str]) -> None:
    root = ROOT / "TOPICS/E. RnD INNOVATION/2. WORKSTREAMS/2.3 PROJECT_IMPROVEMENT/Regression"
    required = [root / "README.md", root / "CASES.md", root / "RUN_TEMPLATE.md", root / "BASELINE.md"]
    for rel in required:
        if not rel.exists():
            fail(f"Missing R&D regression artifact: {rel}", errors)

    cases = root / "CASES.md"
    if cases.exists():
        text = read_text(cases)
        required_case_ids = [f"RND-REG-{i:03d}" for i in range(1, 39)]
        for case_id in required_case_ids:
            if case_id not in text:
                fail(f"Missing R&D regression case: {case_id}", errors)
        for result in ["PASS", "FAIL", "NOT OBSERVED", "INCONCLUSIVE"]:
            if result not in text:
                fail(f"R&D regression result state missing: {result}", errors)

    template = root / "RUN_TEMPLATE.md"
    if template.exists():
        text = read_text(template)
        for phrase in [
            "Capability:",
            "Prompt ID / execution contract:",
            "Baseline compared with:",
            "Repository commit / task ref:",
            "Knowledge snapshot / release:",
            "Positive-control evidence",
            "Limitations",
            "Regression cases",
            *[f"RND-REG-{i:03d}" for i in range(1, 39)],
            "Performance comparison",
            "Human decision",
            "Do not update the R&D baseline",
        ]:
            if phrase not in text:
                fail(f"R&D regression run template missing '{phrase}'", errors)

    readme = root / "README.md"
    if readme.exists():
        text = read_text(readme)
        for phrase in [
            "real R&D capability executions",
            "CASES.md",
            "RUN_TEMPLATE.md",
            "does not become a second workflow",
        ]:
            if phrase not in text:
                fail(f"R&D regression README missing '{phrase}'", errors)


def validate_removed_topic(errors: list[str]) -> None:
    if (ROOT / "TOPICS" / "3. CONSTRUCTION").exists():
        fail("Removed topic still exists: TOPICS/3. CONSTRUCTION", errors)
    for relative in [Path("AI_MEMORY.md"), Path("README.md"), Path("SYSTEM CORE/WORKFLOW.md"), Path("SYSTEM CORE/REPOSITORY_CONTRACT.md")]:
        path = ROOT / relative
        if path.exists() and "TOPICS/3. CONSTRUCTION" in read_text(path):
            fail(f"Stale removed-topic reference: {relative}", errors)


def validate_high_level_controls(errors: list[str]) -> None:
    contract = ROOT / "SYSTEM CORE/REPOSITORY_CONTRACT.md"
    workflow = ROOT / "SYSTEM CORE/WORKFLOW.md"
    readme = ROOT / "README.md"
    if contract.exists():
        text = read_text(contract)
        for phrase in ["Core invariants", "Source-of-truth hierarchy", "Change contract", "Atomic publication contract", "Negative-state contract", "GitHub Actions", "Issue Forms", "Task Lists", "GitHub Projects", "Security", "Capability", "Staging", "Dry-run", "Contradiction", "Health"]:
            if phrase not in text:
                fail(f"REPOSITORY_CONTRACT.md missing control section/phrase: {phrase}", errors)
    if workflow.exists():
        text = read_text(workflow)
        for phrase in ["TARGET STATE", "PRE-FLIGHT", "ATOMIC CHANGE", "VALIDATE", "VERIFY", "Risk-based execution", "User prompt reinforcement layer", "GitHub Actions", "Issue Form", "Task List", "GitHub Projects", "Security", "Capability", "Staging", "Dry-run", "Contradiction", "Health"]:
            if phrase not in text:
                fail(f"WORKFLOW.md missing control section/phrase: {phrase}", errors)
        if CANONICAL_LIFECYCLE not in text:
            fail("WORKFLOW.md lifecycle does not match canonical lifecycle", errors)
    operations = ROOT / "SYSTEM CORE/Second_Brain_Operations.md"
    if operations.exists() and CANONICAL_LIFECYCLE not in read_text(operations):
        fail("Second_Brain_Operations.md lifecycle is out of sync with canonical lifecycle", errors)
    if readme.exists():
        text = read_text(readme)
        for phrase in ["GitHub Actions", "Issue Forms", "Task Lists", "GitHub Projects", "Security", "Mermaid", "Capability", "Staging", "SYSTEM CORE"]:
            if phrase not in text:
                fail(f"README.md missing platform capability: {phrase}", errors)

def validate_target_structure(errors: list[str]) -> None:
    expected = {"A. AI GENERAL","B. CAREER","C. NUVIO SETUP","D. RnD DATABASE","E. RnD INNOVATION"}
    actual = {p.name for p in (ROOT / "TOPICS").iterdir() if p.is_dir()} if (ROOT / "TOPICS").exists() else set()
    if actual != expected:
        fail(f"Topic structure mismatch: expected {sorted(expected)}, got {sorted(actual)}", errors)
    legacy = ["1. AI GENERAL","2. CAREER","3. CONSTRUCTION","4. NUVIO SETUP","5. RnD DATABASE","6. RnD INNOVATION","7. SYSTEMS"]
    for name in legacy:
        if (ROOT / "TOPICS" / name).exists():
            fail(f"Legacy topic folder still exists: TOPICS/{name}", errors)
    for name in ["WORKFLOW.md","REPOSITORY_CONTRACT.md"]:
        if (ROOT / name).exists():
            fail(f"Legacy root control still exists: {name}", errors)
    required_system = [
        "SYSTEM CORE/README.md",
        "SYSTEM CORE/WORKFLOW.md",
        "SYSTEM CORE/REPOSITORY_CONTRACT.md",
        "SYSTEM CORE/CAPABILITIES/1. HANDOFF/README.md",
        "SYSTEM CORE/CAPABILITIES/1. HANDOFF/Handoff_Template.md",
        "SYSTEM CORE/CAPABILITIES/2. RETRIEVAL/README.md",
        "SYSTEM CORE/CAPABILITIES/2. RETRIEVAL/Retrieval_Test.md",
    ]
    for rel in required_system:
        if not (ROOT / rel).exists():
            fail(f"Missing System Core artifact: {rel}", errors)

def main() -> int:
    errors: list[str] = []
    validate_root(errors)
    validate_target_structure(errors)
    active, registry_states = extract_topic_registry(errors)
    validate_topics(active, registry_states, errors)
    validate_forbidden_files(errors)
    validate_removed_platform_controls(errors)
    validate_local_references(errors)
    validate_workstream_readmes(errors)
    validate_csv_shape(errors)
    validate_capabilities(errors)
    validate_architecture_boundaries(errors)
    validate_future_rnd_references(errors)
    validate_career_scheduled_provenance(errors)
    validate_scheduled_capability_contracts(errors)
    validate_rnd_knowledge_sheet(errors)
    validate_prompt_duplicate_rules(errors)
    validate_removed_topic(errors)
    validate_platform_layers(errors)
    validate_control_reference_consistency(errors)
    validate_rnd_regression_contract(errors)
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
