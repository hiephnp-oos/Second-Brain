#!/usr/bin/env python3
"""Build read-only Career and Idea Review datasets for GitHub Pages."""
from pathlib import Path
import json
import re

ROOT = Path("_site_source")

def md_table_rows(text):
    lines = text.splitlines()
    for i, line in enumerate(lines):
        if not line.strip().startswith("|") or i + 1 >= len(lines):
            continue
        if not re.match(r"\s*\|?\s*:?-{2,}", lines[i + 1]):
            continue
        headers = [x.strip() for x in line.strip().strip("|").split("|")]
        rows = []
        for raw in lines[i + 2:]:
            if not raw.strip().startswith("|"):
                break
            values = [x.strip() for x in raw.strip().strip("|").split("|")]
            if len(values) == len(headers):
                rows.append(dict(zip(headers, values)))
        return rows
    return []

def clean(value):
    return re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r"\1", value or "").replace("**", "").strip()

reports = sorted(Path("TOPICS/B. CAREER/2. REPORTS").glob("*.md"), reverse=True)
reports = [p for p in reports if re.fullmatch(r"\d{4}-W\d{2}\.md", p.name)]
if not reports:
    raise SystemExit("No Career weekly report found")
report = reports[0]
report_text = report.read_text(encoding="utf-8")
items = []

sections = [
    ("job", "## 1. Job Search", "Job Title", "Company"),
    ("company", "## 2. Company Radar", "Company", ""),
    ("remote", "## 3. Remote / AI", "Job / Project Title", "Platform / Company"),
]
for kind, heading, title_key, company_key in sections:
    section = report_text.split(heading, 1)[1].split("\n## ", 1)[0] if heading in report_text else ""
    for row in md_table_rows(section):
        title = clean(row.get(title_key, ""))
        if not title or title == "—":
            continue
        direct_link = clean(row.get("Direct Link", ""))
        items.append({
            "kind": kind,
            "title": title,
            "company": clean(row.get(company_key, "")) if company_key else "",
            "location": clean(row.get("Location", "") or row.get("Location / Remote Scope", "")),
            "priority": clean(row.get("Priority", "")),
            "group": clean(row.get("Job Group", "") or row.get("Work Type", "")),
            "signal": clean(row.get("Signal Strength", "")),
            "status": clean(row.get("Status", "")),
            "verified": clean(row.get("Verified", "")),
            "evidence": clean(row.get("CV Fit / Evidence", "") or row.get("Evidence / Source", "") or row.get("CV / Capability Fit", "")),
            "fit": clean(row.get("Fit to Career Profile", "")),
            "signal_detail": clean(row.get("Signal", "")),
            "risk": clean(row.get("Risk / Uncertainty", "")),
            "gaps": clean(row.get("Gaps / Risks", "")),
            "action": clean(row.get("Recommended Action", "")),
            "apply_url": direct_link if direct_link.startswith("http") else "",
            "report_url": report.as_posix().replace(" ", "%20")[:-3] + ".html",
        })

(ROOT / "career-data.json").write_text(
    json.dumps({"report_title": report.stem, "report_date": report.stem, "items": items}, ensure_ascii=False, indent=2),
    encoding="utf-8",
)

idea_root = Path("TOPICS/E. RnD INNOVATION/2. WORKSTREAMS/2.2 IDEA_REVIEW")
ideas = []
for path in sorted(idea_root.rglob("*.md")):
    if not (path.name.startswith("IDEA_REVIEW_") or path.name.startswith("IDEA_OVERVIEW_") or path.name.endswith("_REVIEW_2026-09-28.md")):
        continue
    content = path.read_text(encoding="utf-8")
    title_match = re.search(r"(?m)^#\s+(.+)$", content)
    date_match = re.search(r"(?m)^- \*\*Ngày review:\*\*\s*(.+)$", content)
    assessment_match = re.search(r"(?im)^\s*\*\*Kết luận:\*\*\s*([^\n]+)", content)
    if not assessment_match:
        assessment_match = re.search(r"(?im)^\s*\*\*Initial Assessment:\*\*\s*([^\n]+)", content)
    assessment = clean(assessment_match.group(1)) if assessment_match else ("Đang review ban đầu" if "IDEA_OVERVIEW" in path.name else "Chưa trích xuất")
    scope_match = re.search(r"(?m)^- \*\*Phạm vi:\*\*\s*(.+)$", content)
    summary_match = re.search(r"(?ims)^##\s+1\..*?\n(.*?)(?=\n##\s+2\.)", content)
    summary = ""
    if summary_match:
        first_paragraph = re.sub(r"(?m)^\s*>.*$", "", summary_match.group(1)).strip().split("\n\n")[0]
        summary = clean(first_paragraph)[:420]
    unknown_match = re.search(r"(?im)^\s*(?:[-*]\s*)?(?:\*\*)?(?:Key Unknowns|Điểm cần làm rõ)(?:\*\*)?\s*[:—-]\s*([^\n]+)", content)
    action_match = re.search(r"(?im)^\s*(?:[-*]\s*)?(?:\*\*)?(?:Recommended Next Action|Bước tiếp theo)(?:\*\*)?\s*[:—-]\s*([^\n]+)", content)
    relative = path.as_posix().replace(" ", "%20").replace("#", "%23")
    ideas.append({
        "title": clean(title_match.group(1)) if title_match else path.parent.name,
        "date": clean(date_match.group(1)) if date_match else "",
        "assessment": assessment,
        "scope": clean(scope_match.group(1)) if scope_match else "Initial review",
        "summary": summary,
        "unknowns": clean(unknown_match.group(1))[:280] if unknown_match else "Mở báo cáo để xem các điểm chưa xác định.",
        "next_action": clean(action_match.group(1))[:280] if action_match else "Mở báo cáo để xem bước tiếp theo.",
        "url": relative[:-3] + ".html",
    })

(ROOT / "idea-data.json").write_text(json.dumps({"items": ideas}, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Career rows: {len(items)}; Idea documents: {len(ideas)}")
