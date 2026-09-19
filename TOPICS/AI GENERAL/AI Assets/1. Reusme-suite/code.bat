@echo off

echo Dang tao thu muc "modules" va cac file con...
mkdir modules
for %%F in (M0-context M1-match M2-edit M3-ats M4-research-discovery M7-humanize M8-render) do type nul > "modules\%%F.md"

echo Dang tao thu muc "references" va cac file con...
mkdir references
for %%F in (branching-questions bullet-philosophy humanizer-rules industry-keywords matching-strategies research-prompts) do type nul > "references\%%F.md"

echo.
echo Hoan thanh viec tao folder va file!
pause