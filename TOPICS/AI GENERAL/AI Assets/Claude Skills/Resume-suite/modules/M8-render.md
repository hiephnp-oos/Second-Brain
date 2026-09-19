\# M8 — PDF Render



Input: CV content (text / markdown từ chat hoặc từ module trước).

Output: PDF file tới `/mnt/user-data/outputs/`. HTML chỉ build để render, không xuất.



\---



\## Templates



| | Template 1 (default) | Template 2 |

|---|---|---|

| Style | Modern sans-serif, màu accent | Classic serif, B\&W |

| Font | Lato | Libre Baskerville |

| Header | Left-aligned + photo | Centered, no photo |

| Section rule | Colored accent underline | Gray 0.5pt full-width |

| Bullet | `•` | `•` |

| Skills layout | 2-column grouped | Inline `bold label: items` |

| Accent default | `#1a6fa8` (Ocean Blue) | `#1155cc` (Classic Blue — decorative only) |

| Asset | `assets/template1\_reference.html` | Build từ template inline |



\*\*Selection:\*\* Không chỉ định → T1. "template 2" / "classic" / "serif" / "no photo" / "B\&W" → T2.



\---



\## STEP 1 — Parse Content



Extract verbatim:

```

name

contact: email, phone, location, \[linkedin/github — plain text only]

role / job title          \[omit if absent]

career\_highlights\[]       \[omit if absent — list of bullet strings]

summary                   \[omit if absent — omit if career\_highlights present and user chose replace]

experience\[]

&#x20; └─ company, role, date\_range, duties\[], achievements\[]

education\[]

&#x20; └─ degree, institution, \[gpa], \[date\_range]

skills\[]

&#x20; └─ \[group\_label], items\[]

certifications\[]          \[omit if absent]

```



Không rephrase. Không infer. Không thêm/bớt nội dung.



\*\*Career Highlights / Summary logic:\*\*

\- Nếu CV có `career\_highlights` → render section "CAREER HIGHLIGHTS" thay thế hoặc trước Summary tùy user chọn

\- Nếu chỉ có `summary` → render "SUMMARY" như cũ

\- Nếu cả hai → Career Highlights trước, Summary sau (chỉ khi user giữ cả hai)



\---



\## STEP 2 — Content Integrity Check



```

\[CONTENT CHECK]

✓ Career Highlights     : N bullets matched (hoặc "N/A — not present")

✓ Experience entries    : N matched

✓ Duties + achievements : N matched

✓ Skill items           : N matched

✓ Certifications        : N matched

✓ No additions          : confirmed

✓ No omissions          : confirmed

→ Template \[1|2] · Accent: #xxxxxx · Proceeding.

```



Bất kỳ ✗ → fix và re-check. Không skip.



\---



\## STEP 3 — Accent Color Picker



\*\*Skip nếu user đã chỉ định màu.\*\*



Nếu chưa có màu → render color picker widget (HTML artifact) và \*\*pause\*\*, chờ user chọn.



Palette (12 swatches + custom hex input):



| Hex | Label |

|-----|-------|

| `#1a6fa8` | Ocean Blue (T1 default) |

| `#1155cc` | Classic Blue (T2 default) |

| `#2e7d32` | Forest Green |

| `#b71c1c` | Deep Red |

| `#6a1b9a` | Violet |

| `#e65100` | Burnt Orange |

| `#37474f` | Slate |

| `#00695c` | Teal |

| `#4527a0` | Indigo |

| `#c62828` | Crimson |

| `#1565c0` | Navy |

| `#283593` | Royal Blue |



Widget: colored circle swatches + custom hex input + live preview swatch.

Click "Use This Color" → `window.sendPrompt('Accent color: #xxxxxx')`.



User nói "dùng màu mặc định" / skip → apply template default silently.



\*\*T2 note:\*\* Accent color chỉ ảnh hưởng contact links (ít visible). T2 là B\&W về visual chính.



\---



\## STEP 4 — Photo (T1 only)



```python

import base64, os



skill\_root = "/mnt/skills/user/resume-suite"

photo\_path = "<user\_uploaded\_path\_if\_any>"

if not os.path.exists(photo\_path):

&#x20;   photo\_path = os.path.join(skill\_root, "assets/default\_photo.jpg")



with open(photo\_path, "rb") as f:

&#x20;   b64 = base64.b64encode(f.read()).decode()



ext  = photo\_path.rsplit(".", 1)\[-1].lower()

mime = "image/png" if ext == "png" else "image/jpeg"

photo\_src = f"data:{mime};base64,{b64}"

```



T2 → skip entirely, không bao giờ render `<img>`.



\---



\## STEP 5A — Build HTML (Template 1)



Đọc `assets/template1\_reference.html` từ skill folder.

File này là fully pre-filled reference với Hiep's default content.



1\. Replace content nodes với parsed content từ Step 1 (verbatim)

2\. Replace `{{PHOTO\_SRC}}` → base64 URI từ Step 4

3\. Replace `--accent` value → accent hex

4\. Contact `<span>` items → \*\*plain text only, không `<a>` tags\*\*

5\. \*\*Omit\*\* section/field nào không có data

6\. Remove tất cả HTML comments (`<!-- ... -->`)

7\. \*\*Career Highlights:\*\* nếu `career\_highlights\[]` có data → render trước Summary dùng bullet list style (same CSS pattern as experience bullets). Section title: "CAREER HIGHLIGHTS" (uppercase, same styling as other section titles). Nếu không có → skip hoàn toàn.



Section order: \*\*Career Highlights (nếu có) → Summary (nếu có / nếu giữ) → Skills → Experience → Education → Certifications\*\*



\*\*Overflow handling:\*\*

1\. Reduce section/bullet spacing

2\. Reduce margins nhẹ

3\. Reduce `font-size` 0.3pt mỗi bước — floor \*\*9pt body\*\*, \*\*8.5pt metadata\*\*

4\. Nếu vẫn overflow: allow 2 pages — không truncate, không dưới floor



\---



\## STEP 5B — Build HTML (Template 2)



Construct từ template inline trong file này. Inject `{{ACCENT}}`. Không render `<img>`.



```html

<!DOCTYPE html>

<html lang="en">

<head>

&#x20; <meta charset="UTF-8"/>

&#x20; <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400\&display=swap" rel="stylesheet"/>

&#x20; <style>

&#x20;   :root { --accent: {{ACCENT}}; --text: #000; --muted: #444; --rule: #aaaaaa; }

&#x20;   \*, \*::before, \*::after { box-sizing: border-box; margin: 0; padding: 0; }

&#x20;   html, body {

&#x20;     font-family: 'Libre Baskerville', Georgia, 'Times New Roman', serif; font-size: 9.8pt;

&#x20;     color: var(--text); line-height: 1.45;

&#x20;     -webkit-print-color-adjust: exact; print-color-adjust: exact;

&#x20;   }

&#x20;   .page { width: 210mm; min-height: 297mm; background: #fff; padding: 10mm 12mm; }

&#x20;   @media print { @page { size: A4; margin: 0; } }

&#x20;   .header { text-align: center; margin-bottom: 10px; }

&#x20;   .header\_\_name { font-size: 17pt; font-weight: 700; letter-spacing: .3px; line-height: 1.15; }

&#x20;   .header\_\_contacts { margin-top: 4px; font-size: 8.4pt; color: var(--muted); }

&#x20;   .header\_\_contacts span + span::before { content: " | "; color: var(--rule); }

&#x20;   .section { margin-top: 8px; }

&#x20;   .section\_\_title { font-size: 9.4pt; font-weight: 700; text-transform: uppercase;

&#x20;     letter-spacing: .8px; margin-bottom: 2px; }

&#x20;   .section\_\_rule { border: none; border-top: 0.5pt solid var(--rule); margin: 0 0 5px 0; }

&#x20;   .summary-text { font-size: 8.4pt; line-height: 1.55; text-align: left; }

&#x20;   .highlights-list { margin: 0; padding: 0; list-style: none; }

&#x20;   .highlights-row { display: grid; grid-template-columns: 10pt 1fr; margin-bottom: 2px; line-height: 1.45; }

&#x20;   .highlights-dot  { font-size: 8.4pt; padding-top: .5px; }

&#x20;   .highlights-text { font-size: 8.4pt; text-align: left; }

&#x20;   .skill-line { font-size: 8.4pt; margin-bottom: 2px; line-height: 1.45; }

&#x20;   .skill-line strong { font-weight: 700; }

&#x20;   .exp-item { margin-bottom: 7px; }

&#x20;   .exp-item:last-child { margin-bottom: 0; }

&#x20;   .exp-header { display: grid; grid-template-columns: 1fr auto; align-items: baseline; gap: 6px; }

&#x20;   .exp-company { font-weight: 700; font-size: 9.8pt; }

&#x20;   .exp-date    { font-size: 8.4pt; color: var(--muted); white-space: nowrap; }

&#x20;   .exp-role    { font-size: 8.4pt; font-style: italic; color: var(--muted); margin: 1px 0 3px 0; }

&#x20;   .exp-bullets { margin-top: 2px; }

&#x20;   .bullet-row  { display: grid; grid-template-columns: 10pt 1fr; margin-bottom: 1px; line-height: 1.42; }

&#x20;   .bullet-dot  { font-size: 8.4pt; padding-top: .5px; }

&#x20;   .bullet-text { font-size: 8.4pt; text-align: left; }

&#x20;   .achievements-label { font-size: 8.4pt; font-weight: 700; font-style: italic;

&#x20;     margin-top: 4px; margin-bottom: 2px; }

&#x20;   .edu-header { display: grid; grid-template-columns: 1fr auto; align-items: baseline; gap: 6px; }

&#x20;   .edu-institution { font-weight: 700; font-size: 9.8pt; }

&#x20;   .edu-date   { font-size: 8.4pt; color: var(--muted); white-space: nowrap; }

&#x20;   .edu-degree { font-size: 8.4pt; color: var(--muted); margin-top: 1px; }

&#x20;   .certs-text { font-size: 8.4pt; line-height: 1.5; }

&#x20; </style>

</head>

<body><div class="page">

&#x20; <header class="header">

&#x20;   <div class="header\_\_name">{{NAME}}</div>

&#x20;   <div class="header\_\_contacts"><!-- plain text spans --></div>

&#x20; </header>

&#x20; <!-- sections: Career Highlights (if present), Summary (if present), Skills, Experience, Education, Certifications -->

&#x20; <!-- Career Highlights structure:

&#x20;   <section class="section">

&#x20;     <div class="section\_\_title">Career Highlights</div>

&#x20;     <hr class="section\_\_rule"/>

&#x20;     <ul class="highlights-list">

&#x20;       <li class="highlights-row"><span class="highlights-dot">•</span><span class="highlights-text">...</span></li>

&#x20;     </ul>

&#x20;   </section>

&#x20; -->

&#x20; <!-- OMIT section if absent -->

</div></body></html>

```



\---



\## STEP 6 — Render PDF



```python

import unicodedata, subprocess, sys, warnings

warnings.filterwarnings('ignore')



try:

&#x20;   import weasyprint

except ImportError:

&#x20;   subprocess.run(\[sys.executable, "-m", "pip", "install",

&#x20;                   "weasyprint", "--break-system-packages", "-q"])

&#x20;   import weasyprint



from weasyprint import HTML, CSS



html\_content = unicodedata.normalize("NFC", html\_content)



HTML(string=html\_content).write\_pdf(

&#x20;   output\_path,

&#x20;   stylesheets=\[CSS(string="@page { size: A4; margin: 0; }")]

)

```



\*\*PDF Validation:\*\*

```python

try:

&#x20;   import fitz

except ImportError:

&#x20;   subprocess.run(\[sys.executable, "-m", "pip", "install",

&#x20;                   "pymupdf", "--break-system-packages", "-q"])

&#x20;   import fitz



doc = fitz.open(output\_path)

extracted = "\\n".join(page.get\_text() for page in doc)



checks = {

&#x20;   "name": candidate\_name,

&#x20;   "section\_experience": "Experience",

&#x20;   "first\_company": first\_company\_name,

}

failed = \[k for k, v in checks.items() if v.lower() not in extracted.lower()]



if failed:

&#x20;   print(f"\[PDF VALIDATION WARNING] Missing tokens: {failed}")

else:

&#x20;   print("\[PDF VALIDATION] PASS")

```



Output path: `/mnt/user-data/outputs/<Name>\_Resume\_T\[1|2].pdf`

HTML: build trong memory hoặc temp file — \*\*không copy sang outputs\*\*.



\---



\## STEP 7 — Present Output



`present\_files(\[pdf\_path])`



One-line close: `"PDF ready — Template \[1|2], Accent: #xxxxxx."`



\---



\## ATS Compliance Rules



| Rule | Implementation |

|------|---------------|

| Text-only content | Tất cả text trong `<div>`, `<p>`, `<li>`, `<span>` — không SVG/canvas text |

| Selectable PDF | weasyprint outputs real text layer |

| DOM order = visual order | Không dùng `position:absolute`, `float`, CSS `order`, negative margins overlap, `transform:translate()` trên text |

| Contact plain text | LinkedIn/GitHub là plain text, không `<a href>` |

| Photo aria-hidden | `<img aria-hidden="true">` |

| Bullets as real text | `<span>•</span>` — không CSS pseudo, không dash variants |

| No icon fonts | Không FontAwesome, không SVG icons, không emoji |

| No justified text | `text-align: left` toàn bộ body content |

| Unicode | NFC normalize trước render — critical cho tiếng Việt |

| Font fallback | T1: `"Lato", "Calibri", "Arial", sans-serif` · T2: `"Libre Baskerville", "Georgia", serif` |



\## Hard Rules



| Rule | Detail |

|------|--------|

| No content invention | Mỗi từ trong output phải tồn tại trong input |

| No content deletion | Mọi bullet/skill/cert phải xuất hiện trong output |

| Single page preferred | Fit A4; overflow → giảm spacing → giảm margin → shrink font (floor 9pt/8.5pt); allow 2 pages trước khi xuống floor |

| HTML không xuất | Build để render PDF rồi discard |

| T2 no photo | Không bao giờ render `<img>` trong T2 |

| Step 2 mandatory | Content check mỗi run, không exception |

