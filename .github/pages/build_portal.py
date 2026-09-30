#!/usr/bin/env python3
"""Build read-only Career and Idea Review datasets for GitHub Pages."""
from pathlib import Path
import csv, json, re

ROOT = Path("_site_source")
REPO = Path(".")

def md_table_rows(text):
    rows=[]
    for block in re.findall(r"(?m)^\|.*\|$", text):
        pass
    lines=text.splitlines()
    for i,line in enumerate(lines):
        if not line.strip().startswith("|") or i+1>=len(lines): continue
        if not re.match(r"\s*\|?\s*:?-{2,}", lines[i+1]): continue
        headers=[x.strip() for x in line.strip().strip("|").split("|")]
        for raw in lines[i+2:]:
            if not raw.strip().startswith("|"): break
            vals=[x.strip() for x in raw.strip().strip("|").split("|")]
            if len(vals)==len(headers):
                rows.append(dict(zip(headers, vals)))
        break
    return rows

def clean(v):
    return re.sub(r"\[([^\]]+)\]\(([^)]+)\)",r"\1",v or "").replace("**","").strip()

report=Path("TOPICS/B. CAREER/2. REPORTS/2026-W39.md")
text=report.read_text(encoding="utf-8")
items=[]
for kind, heading, keys in [
 ("job","## 1. Job Search",("Job Title","Company")),
 ("company","## 2. Company Radar",("Company","Location")),
 ("remote","## 3. Remote / AI",("Job / Project Title","Platform / Company"))]:
 section=text.split(heading,1)[1].split("\n## ",1)[0] if heading in text else ""
 for row in md_table_rows(section):
  title=clean(row.get(keys[0],""))
  if not title or title=="—": continue
  url=clean(row.get("Direct Link",""))
  items.append({
   "kind":kind,"title":title,"company":clean(row.get(keys[1],"")),
   "location":clean(row.get("Location","") or row.get("Location / Remote Scope","")),
   "priority":clean(row.get("Priority","")),"group":clean(row.get("Job Group","") or row.get("Work Type","")),
   "signal":clean(row.get("Signal Strength","")),"status":clean(row.get("Status","")),
   "verified":clean(row.get("Verified","")),"evidence":clean(row.get("CV Fit / Evidence","") or row.get("Evidence / Source","") or row.get("CV / Capability Fit","")),
   "fit":clean(row.get("Fit to Career Profile","")),"signal_detail":clean(row.get("Signal","")),
   "risk":clean(row.get("Risk / Uncertainty","")),"gaps":clean(row.get("Gaps / Risks","")),
   "action":clean(row.get("Recommended Action","")),"apply_url":url if url.startswith("http") else "",
   "report_url":"TOPICS/B.%20CAREER/2.%20REPORTS/2026-W39.html"
  })
(ROOT/"career-data.json").write_text(json.dumps({"report_title":"Career Weekly Review — 2026-W39","report_date":"2026-09-28","items":items},ensure_ascii=False,indent=2),encoding="utf-8")

base=Path("TOPICS/E. RnD INNOVATION/2. WORKSTREAMS/2.2 IDEA_REVIEW")
ideas=[]
for f in sorted(base.rglob("*.md")):
 if not (f.name.startswith("IDEA_REVIEW_") or f.name.startswith("IDEA_OVERVIEW_") or f.name.endswith("_REVIEW_2026-09-28.md")): continue
 t=f.read_text(encoding="utf-8")
 title=clean((re.search(r"(?m)^#\s+(.+)$",t) or [None,f.parent.name])[1])
 date=clean((re.search(r"(?m)^- \*\*Ngày review:\*\*\s*(.+)$",t) or [None,""])[1])
 assessment=""
 m=re.search(r"(?is)\*\*Kết luận:\*\*\s*([^\n]+)",t)
 if m: assessment=clean(m.group(1))
 if not assessment:
  m=re.search(r"(?is)\*\*Initial Assessment:\*\*\s*([^\n]+)",t)
  if m: assessment=clean(m.group(1))
 if not assessment and "IDEA_OVERVIEW" in f.name: assessment="Đang review ban đầu"
 scope=clean((re.search(r"(?m)^- \*\*Phạm vi:\*\*\s*(.+)$",t) or [None,"Initial review"])[1])
 summary=""
 m=re.search(r"(?is)^##\s+1\..*?\n(.*?)(?=\n##\s+2\.)",t)
 if m:
  summary=clean(re.sub(r"(?m)^\s*>.*$","",m.group(1)).split("\n\n")[0])[:420]
 unknowns=""
 m=re.search(r"(?is)(?:Key Unknowns|Điểm cần làm rõ|UNKNOWN):?\*?\*?\s*[:—-]?\s*([^\n]+)",t)
 if m: unknowns=clean(m.group(1))[:280]
 next_action=""
 m=re.search(r"(?is)(?:Recommended Next Action|Bước tiếp theo):?\*?\*?\s*[:—-]?\s*([^\n]+)",t)
 if m: next_action=clean(m.group(1))[:280]
 rel=f.as_posix().replace(" ","%20").replace("#","%23")
 url=rel[:-3]+".html"
 ideas.append({"title":title,"date":date,"assessment":assessment,"scope":scope,"summary":summary,"unknowns":unknowns,"next_action":next_action,"url":url})
(ROOT/"idea-data.json").write_text(json.dumps({"items":ideas},ensure_ascii=False,indent=2),encoding="utf-8")
print(f"Career rows: {len(items)}; Idea documents: {len(ideas)}")
