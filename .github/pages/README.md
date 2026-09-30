# Pages presentation

This directory contains the user-facing, read-only workspace for Second-Brain.

- `index.html` is the six-topic navigation home.
- `career.html` presents the latest committed Career weekly report as reviewable job, company-signal, and Remote/AI cards.
- `ideas.html` presents searchable Idea Review cards and links to rendered review documents.
- `build_portal.py` extracts presentation data from canonical Markdown during the Pages build. Generated JSON is build output, not a source of truth.
- The site is read-only. Decisions and edits must return to the canonical workflow; do not maintain topic knowledge or status independently here.
- Deployment is handled by `.github/workflows/pages.yml` from `main`.

Keep the landing page focused on topic routing and the review pages focused on their respective work. Avoid duplicating memory flow, platform governance, or detailed source content in the portal.
