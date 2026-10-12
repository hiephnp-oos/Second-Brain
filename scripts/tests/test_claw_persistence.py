from __future__ import annotations

import importlib.util
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "claw_persistence.py"
SPEC = importlib.util.spec_from_file_location("claw_persistence", SCRIPT)
assert SPEC is not None and SPEC.loader is not None
claw_persistence = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(claw_persistence)
classify_report_path = claw_persistence.classify_report_path
classify_report_text = claw_persistence.classify_report_text
recovered_issue_numbers = claw_persistence.recovered_issue_numbers


def complete_report(run_date: str = "2026-10-12", manual: bool = False) -> str:
    mode = "**MANUAL RECOVERY**" if manual else "SCHEDULED RUN (provenance still unverified)"
    return (
        f"# Claw Daily Discovery — {run_date}\n"
        f"- **RUN_DATE:** {run_date}\n"
        f"- **RUN_MODE:** {mode}\n"
        "- **RUN_SLOT:** **01**\n"
        "RS-10 → RS-11 → RS-12\n"
    )


class ClawPersistenceContracts(unittest.TestCase):
    def test_valid_report_is_present_unverified(self):
        result = classify_report_text(complete_report(), "2026-10-12")
        self.assertEqual(result["artifact_state"], "PRESENT_UNVERIFIED")
        self.assertEqual(result["provenance_state"], "NOT_VERIFIED")
        self.assertEqual(result["missing_markers"], [])

    def test_manual_recovery_is_distinct_and_provenance_unverified(self):
        result = classify_report_text(complete_report(manual=True), "2026-10-12")
        self.assertEqual(result["artifact_state"], "MANUAL_RECOVERY")
        self.assertEqual(result["provenance_state"], "NOT_VERIFIED")

    def test_missing_report_is_missing(self):
        with tempfile.TemporaryDirectory() as tmp:
            result = classify_report_path(Path(tmp) / "2026-10-12.md", "2026-10-12")
        self.assertEqual(result["artifact_state"], "MISSING")
        self.assertEqual(result["provenance_state"], "NOT_VERIFIED")

    def test_wrong_date_and_slot_and_missing_rs_stage_are_incomplete(self):
        text = complete_report("2026-10-11").replace("**01**", "**02**").replace("RS-12", "")
        result = classify_report_text(text, "2026-10-12")
        self.assertEqual(result["artifact_state"], "INCOMPLETE")
        self.assertEqual(result["missing_markers"], ["RUN_DATE", "RUN_SLOT", "RS-12"])

    def test_exact_markdown_format_matches_date_and_slot(self):
        result = classify_report_text(
            "- **RUN_DATE:** 2026-10-12\n- **RUN_SLOT:** **01**\nRS-10 RS-11 RS-12",
            "2026-10-12",
        )
        self.assertEqual(result["artifact_state"], "PRESENT_UNVERIFIED")

    def test_reconciles_only_issues_with_complete_matching_artifacts(self):
        with tempfile.TemporaryDirectory() as tmp:
            report_dir = Path(tmp)
            (report_dir / "2026-10-08.md").write_text(
                complete_report("2026-10-08", manual=True), encoding="utf-8"
            )
            (report_dir / "2026-10-09.md").write_text("# incomplete", encoding="utf-8")
            issues = [
                {"number": 143, "title": "Claw daily report MISSING: 2026-10-08"},
                {"number": 145, "title": "Claw daily report MISSING: 2026-10-09"},
                {"number": 999, "title": "Unrelated issue"},
                {"number": 147, "title": "Claw daily report INCOMPLETE: 2026-10-10"},
            ]
            self.assertEqual(recovered_issue_numbers(issues, report_dir), [143])


if __name__ == "__main__":
    unittest.main()
