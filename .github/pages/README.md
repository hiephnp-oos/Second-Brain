# Pages presentation

This directory contains the user-facing, read-only landing page for Second-Brain.

- `index.html` is a presentation layer, not a source of truth.
- Topic and policy links point to canonical repository files on GitHub.
- Deployment is handled by `.github/workflows/pages.yml` from `main`.
- Do not maintain topic knowledge or operational status independently in this site.

Update the landing page only when navigation or system-level presentation materially changes. Keep detailed knowledge in the canonical Markdown files.
