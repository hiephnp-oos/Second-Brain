#!/usr/bin/env python3
"""Deterministic classification and incident reconciliation for Claw daily artifacts."""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

REQUIRED_PATTERNS = {
    "RUN_DATE": lambda run_date: re.compile(
        rf"^\s*[-*]?\s*\*\*RUN_DATE:\*\*\s+\*{{0,2}}{re.escape(run_date)}\*{{0,2}}\s*$",
        re.MULTILINE,
    ),
    "RUN_SLOT": lambda _run_date: re.compile(
        r"^\s*[-*]?\s*\*\*RUN_SLOT:\*\*\s+\*{0,2}01\*{0,2}\s*$",
        re.MULTILINE,
    ),
    "RS-10": lambda _run_date: re.compile(r"RS-10"),
    "RS-11": lambda _run_date: re.compile(r"RS-11"),
    "RS-12": lambda _run_date: re.compile(r"RS-12"),
}
ISSUE_TITLE = re.compile(
    r"^Claw daily report (?:MISSING|INCOMPLETE): (\d{4}-\d{2}-\d{2})$"
)
REPORT_RELATIVE_PATH = Path(
    "TOPICS/E. RnD INNOVATION/2. WORKSTREAMS/2.1 PERSONAL_RESEARCH"
)


def classify_report_text(text: str, run_date: str) -> dict[str, object]:
    """Classify artifact content without claiming external scheduler provenance."""
    missing = [
        name
        for name, pattern_factory in REQUIRED_PATTERNS.items()
        if not pattern_factory(run_date).search(text)
    ]
    manual = bool(re.search(r"MANUAL\s+RECOVERY", text, re.IGNORECASE))
    state = "INCOMPLETE" if missing else (
        "MANUAL_RECOVERY" if manual else "PRESENT_UNVERIFIED"
    )
    return {
        "artifact_state": state,
        "provenance_state": "NOT_VERIFIED",
        "missing_markers": missing,
    }


def classify_report_path(report_path: Path, run_date: str) -> dict[str, object]:
    if not report_path.is_file():
        return {
            "artifact_state": "MISSING",
            "provenance_state": "NOT_VERIFIED",
            "missing_markers": list(REQUIRED_PATTERNS),
        }
    return classify_report_text(report_path.read_text(encoding="utf-8"), run_date)


def recovered_issue_numbers(issues: list[dict[str, object]], report_dir: Path) -> list[int]:
    """Return only open watchdog incidents whose exact dated artifact is now complete."""
    recovered: list[int] = []
    for issue in issues:
        title = issue.get("title")
        number = issue.get("number")
        if not isinstance(title, str) or not isinstance(number, int):
            continue
        match = ISSUE_TITLE.fullmatch(title)
        if not match:
            continue
        run_date = match.group(1)
        report_path = report_dir / f"{run_date}.md"
        state = classify_report_path(report_path, run_date)["artifact_state"]
        if state in {"PRESENT_UNVERIFIED", "MANUAL_RECOVERY"}:
            recovered.append(number)
    return recovered


def main() -> int:
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(dest="command", required=True)
    classify = subparsers.add_parser("classify")
    classify.add_argument("--date", required=True)
    classify.add_argument("--report", type=Path, required=True)
    reconcile = subparsers.add_parser("recovered-issues")
    reconcile.add_argument("--report-dir", type=Path, required=True)
    args = parser.parse_args()

    if args.command == "classify":
        result = classify_report_path(args.report, args.date)
        print(f"artifact_state={result['artifact_state']}")
        print(f"provenance_state={result['provenance_state']}")
        print(f"state={result['artifact_state']}")
        print(f"missing_markers={','.join(result['missing_markers'])}")
        return 0

    try:
        issues = json.load(sys.stdin)
    except json.JSONDecodeError as exc:
        parser.error(f"stdin must contain a JSON issue list: {exc}")
    if not isinstance(issues, list):
        parser.error("stdin must contain a JSON array of issues")
    for number in recovered_issue_numbers(issues, args.report_dir):
        print(number)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
