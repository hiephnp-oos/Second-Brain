from __future__ import annotations

import ast
import importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
VALIDATOR = ROOT / "scripts" / "validate_second_brain.py"

def load_validator():
    spec = importlib.util.spec_from_file_location("second_brain_validator", VALIDATOR)
    assert spec is not None and spec.loader is not None
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

def test_every_validator_function_is_wired_into_main():
    tree = ast.parse(VALIDATOR.read_text(encoding="utf-8"))
    functions = {node.name for node in tree.body if isinstance(node, ast.FunctionDef) and node.name.startswith("validate_")}
    main = next(node for node in tree.body if isinstance(node, ast.FunctionDef) and node.name == "main")
    calls = {node.func.id for node in ast.walk(main) if isinstance(node, ast.Call) and isinstance(node.func, ast.Name)}
    assert not sorted(functions - calls)

def test_critical_provenance_validator_rejects_noncanonical_state(tmp_path: Path):
    module = load_validator()
    contract_dir = tmp_path / "TOPICS" / "B. CAREER"
    contract_dir.mkdir(parents=True)
    (contract_dir / "CAREER_EXECUTION_CONTRACT.md").write_text(
        "MISSING INCOMPLETE PRESENT_UNVERIFIED MANUAL_RECOVERY NOT_VERIFIED REPOSITORY_CONTRACT.md\nscheduled execution verified\n",
        encoding="utf-8")
    old_root = module.ROOT
    try:
        module.ROOT = tmp_path
        errors: list[str] = []
        module.validate_career_scheduled_provenance(errors)
        assert any("non-canonical state" in item for item in errors)
    finally:
        module.ROOT = old_root

def test_forbidden_artifact_validator_fails_closed(tmp_path: Path):
    module = load_validator()
    (tmp_path / "bad.placeholder").write_text("x", encoding="utf-8")
    old_root = module.ROOT
    try:
        module.ROOT = tmp_path
        errors: list[str] = []
        module.validate_forbidden_files(errors)
        assert any("Forbidden artifact marker found" in item for item in errors)
    finally:
        module.ROOT = old_root

def test_career_weekly_schema_validator_rejects_bad_header(tmp_path: Path):
    module = load_validator()
    report_dir = tmp_path / "TOPICS" / "B. CAREER" / "2. REPORTS"
    capability_dir = tmp_path / "TOPICS" / "B. CAREER" / "1. CAPABILITIES"
    for name, schema in {"1.1 JOB_SEARCH":"A | B", "1.2 COMPANY_RADAR":"C | D", "1.3 REMOTE_AI":"E | F"}.items():
        d = capability_dir / name
        d.mkdir(parents=True)
        (d / "README.md").write_text("# Capability\n`" + schema + "`\n", encoding="utf-8")
    report_dir.mkdir(parents=True)
    (report_dir / "2026-W40.md").write_text(
        "# Career Weekly Review — 2026-W40\n## 1. Job Search\n| WRONG | HEADER |\n|---|---|\n| x | y |\n## 2. Company Radar\n| C | D |\n|---|---|\n| x | y |\n## 3. Remote / AI\n| E | F |\n|---|---|\n| x | y |\n",
        encoding="utf-8")
    old_root = module.ROOT
    try:
        module.ROOT = tmp_path
        errors: list[str] = []
        module.validate_career_weekly_report_contract(errors)
        assert any("schema mismatch" in item for item in errors)
    finally:
        module.ROOT = old_root