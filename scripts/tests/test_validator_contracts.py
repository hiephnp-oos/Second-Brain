from __future__ import annotations

import importlib.util
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
VALIDATOR = ROOT / "scripts" / "validate_second_brain.py"

def load_validator():
    spec = importlib.util.spec_from_file_location("second_brain_validator", VALIDATOR)
    assert spec is not None and spec.loader is not None
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

class ValidatorCriticalContracts(unittest.TestCase):
    def test_required_root_file_failure(self):
        module = load_validator()
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            (root / "AI_MEMORY.md").write_text("x", encoding="utf-8")
            (root / "README.md").write_text("x", encoding="utf-8")
            old = module.ROOT
            try:
                module.ROOT = root
                errors = []
                module.validate_root(errors)
                self.assertTrue(any("SYSTEM CORE/WORKFLOW.md" in e for e in errors))
            finally:
                module.ROOT = old

    def test_canonical_lifecycle_failure(self):
        module = load_validator()
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            core = root / "SYSTEM CORE"
            core.mkdir()
            (core / "WORKFLOW.md").write_text("## VALIDATE\n", encoding="utf-8")
            (core / "REPOSITORY_CONTRACT.md").write_text("x", encoding="utf-8")
            (root / "README.md").write_text("GitHub Actions Issue Forms Task Lists GitHub Projects Security Mermaid Capability Staging SYSTEM CORE", encoding="utf-8")
            old = module.ROOT
            try:
                module.ROOT = root
                errors = []
                module.validate_high_level_controls(errors)
                self.assertTrue(any("lifecycle" in e for e in errors))
            finally:
                module.ROOT = old

    def test_topic_registry_missing_readme_failure(self):
        module = load_validator()
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            (root / "AI_MEMORY.md").write_text("| T | Active | `TOPICS/Missing/README.md` |\n", encoding="utf-8")
            old = module.ROOT
            try:
                module.ROOT = root
                errors = []
                active, _ = module.extract_topic_registry(errors)
                self.assertEqual(active, set())
                self.assertTrue(any("Missing/README.md" in e for e in errors))
            finally:
                module.ROOT = old

    def test_critical_negative_path_failure(self):
        module = load_validator()
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            (root / "TOPICS/E. RnD INNOVATION/2. WORKSTREAMS/2.1 PERSONAL_RESEARCH/staging").mkdir(parents=True)
            old = module.ROOT
            try:
                module.ROOT = root
                errors = []
                module.validate_critical_negative_paths(errors)
                self.assertTrue(errors)
            finally:
                module.ROOT = old

    def test_noncanonical_provenance_failure(self):
        module = load_validator()
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            p = root / "TOPICS/B. CAREER"
            p.mkdir(parents=True)
            (p / "CAREER_EXECUTION_CONTRACT.md").write_text("MISSING INCOMPLETE PRESENT_UNVERIFIED MANUAL_RECOVERY NOT_VERIFIED REPOSITORY_CONTRACT.md\nscheduled execution verified\n", encoding="utf-8")
            old = module.ROOT
            try:
                module.ROOT = root
                errors = []
                module.validate_career_scheduled_provenance(errors)
                self.assertTrue(any("non-canonical state" in e for e in errors))
            finally:
                module.ROOT = old

    def test_forbidden_artifact_failure(self):
        module = load_validator()
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            (root / "bad.placeholder").write_text("x", encoding="utf-8")
            old = module.ROOT
            try:
                module.ROOT = root
                errors = []
                module.validate_forbidden_files(errors)
                self.assertTrue(any("Forbidden artifact marker found" in e for e in errors))
            finally:
                module.ROOT = old

    def test_career_weekly_schema_failure(self):
        module = load_validator()
        with tempfile.TemporaryDirectory() as d:
            root = Path(d)
            base = root / "TOPICS/B. CAREER/1. CAPABILITIES"
            for name, schema in {"1.1 JOB_SEARCH":"A | B", "1.2 COMPANY_RADAR":"C | D", "1.3 REMOTE_AI":"E | F"}.items():
                p = base / name
                p.mkdir(parents=True)
                (p / "README.md").write_text("# Capability\n`" + schema + "`\n", encoding="utf-8")
            reports = root / "TOPICS/B. CAREER/2. REPORTS"
            reports.mkdir(parents=True)
            (reports / "2026-W40.md").write_text("## 1. Job Search\n| WRONG | HEADER |\n|---|---|\n|x|y|\n## 2. Company Radar\n| C | D |\n|---|---|\n|x|y|\n## 3. Remote / AI\n| E | F |\n|---|---|\n|x|y|\n", encoding="utf-8")
            old = module.ROOT
            try:
                module.ROOT = root
                errors = []
                module.validate_career_weekly_report_contract(errors)
                self.assertTrue(any("schema mismatch" in e for e in errors))
            finally:
                module.ROOT = old

    def test_valid_full_repository_passes(self):
        import subprocess
        result = subprocess.run(["python", "scripts/validate_second_brain.py"], cwd=ROOT, text=True, capture_output=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("Second-Brain validation: PASS", result.stdout)
    def test_validator_module_imports_cleanly(self):
        module = load_validator()
        self.assertTrue(hasattr(module, "main"))
        self.assertTrue(callable(module.main))
if __name__ == "__main__":
    unittest.main()