from __future__ import annotations

import ast
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
VALIDATOR = ROOT / "scripts" / "validate_second_brain.py"

def test_every_validator_function_is_wired_into_main():
    tree = ast.parse(VALIDATOR.read_text(encoding="utf-8"))
    functions = {node.name for node in tree.body if isinstance(node, ast.FunctionDef) and node.name.startswith("validate_")}
    main = next(node for node in tree.body if isinstance(node, ast.FunctionDef) and node.name == "main")
    calls = {node.func.id for node in ast.walk(main) if isinstance(node, ast.Call) and isinstance(node.func, ast.Name)}
    missing = sorted(functions - calls)
    assert not missing, f"validator functions not wired into main: {missing}"