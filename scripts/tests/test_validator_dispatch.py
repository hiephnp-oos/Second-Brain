from __future__ import annotations

import ast
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
VALIDATOR = ROOT / "scripts" / "validate_second_brain.py"

class ValidatorDispatchContract(unittest.TestCase):
    def test_validator_dispatch_has_no_missing_or_extra_functions(self):
        tree = ast.parse(VALIDATOR.read_text(encoding="utf-8"))
        functions = {node.name for node in tree.body if isinstance(node, ast.FunctionDef) and node.name.startswith("validate_")}
        delegated = {"validate_topics", "validate_future_rnd_references", "validate_topic_readme"}
        functions |= delegated
        main = next(node for node in tree.body if isinstance(node, ast.FunctionDef) and node.name == "main")
        calls = {node.func.id for node in ast.walk(main) if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id.startswith("validate_")}
        self.assertEqual(functions, calls, f"validator dispatch mismatch: missing={sorted(functions-calls)}, extra={sorted(calls-functions)}")

if __name__ == "__main__":
    unittest.main()