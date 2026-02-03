# Migration Plan: Resume Repo to Pause Paradigm

## Overview
Migrate from custom Bun/TypeScript/LaTeX infrastructure to the [Pause](https://github.com/usually-frustrated/pause) GitHub Action. Keep `user-content/` directory. Delete everything else.

---

## Phase 1: Delete Old Infrastructure

### Step 1.1: Delete directories
```bash
rm -rf infrastructure/
rm -rf docs/
rm -rf .serena/
```

### Step 1.2: Delete old workflow files
```bash
rm .github/workflows/release.yml
rm .github/workflows/README.md
```

### Step 1.3: Delete root config files
```bash
rm opencode.jsonc
```

---

## Phase 2: Reorganize Files

### Step 2.1: Move resume data to root
```bash
cp user-content/careerProfile.json ./resume.json
```
Note: Copy (not move) so original stays in `user-content/` as backup until verified.

### Step 2.2: Keep these files in user-content/
- `user-content/AGENTS.md` - Keep, update later
- `user-content/AI_AND_RESUME.md` - Keep as-is
- `user-content/README.md` - Keep as-is
- `user-content/resume.xmpdata` - Keep for reference (Pause may not use it)
- `user-content/careerProfile.json` - Delete after verifying `resume.json` works

---

## Phase 3: Create Pause Workflow

### Step 3.1: Create `.github/workflows/resume.yml`

```yaml
name: Build Resume

on:
  push:
    branches: [main]
    paths:
      - "resume.json"
      - ".github/workflows/resume.yml"
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Build resume with Pause
        uses: usually-frustrated/pause@main
        with:
          resume_file: "resume.json"
          templates: |
            minimal
            simple
          github_token: ${{ secrets.GITHUB_TOKEN }}
          create_release: true
```

---

## Phase 4: Update .gitignore

### Step 4.1: Replace `.gitignore` with:

```gitignore
# macOS
.DS_Store

# Editor
.vscode/
.idea/

# Pause output
*.pdf
output/

# Node
node_modules/
.bun
```

---

## Phase 5: Update Root README

### Step 5.1: Create new `README.md` at repo root

```markdown
# Sushruth Sastry - Resume

[![Build Resume](https://github.com/sushruth/resume/actions/workflows/resume.yml/badge.svg)](https://github.com/sushruth/resume/actions/workflows/resume.yml)

Resume source in [JSON Resume](https://jsonresume.org/) format. Built automatically via [Pause](https://github.com/usually-frustrated/pause).

## Usage

1. Edit `resume.json`
2. Push to `main`
3. Download PDF/HTML from GitHub Actions artifacts or Releases

## Structure

```
resume.json          # Resume data (JSON Resume format)
user-content/        # Additional documentation
```

## Templates

- `minimal` - LaTeX PDF
- `simple` - HTML
```

---

## Phase 6: Commit and Push

### Step 6.1: Stage and commit
```bash
git add -A
git commit -m "refactor: migrate to Pause GitHub Action

- Delete infrastructure/ (Bun/TS CLI, LaTeX templates)
- Delete docs/, .serena/
- Add resume.json at root
- Add Pause workflow
- Update README and .gitignore

BREAKING: Local build removed. Uses Pause GH Action now."
```

### Step 6.2: Push
```bash
git push origin main
```

---

## Phase 7: Post-Migration Cleanup

### Step 7.1: Verify GitHub Actions succeeds
1. Go to GitHub repo > Actions tab
2. Confirm "Build Resume" workflow passes
3. Download artifacts, verify PDF/HTML content

### Step 7.2: After verification, delete backup
```bash
rm user-content/careerProfile.json
git add -A
git commit -m "chore: remove careerProfile.json backup"
git push
```

### Step 7.3: Update AGENTS.md (optional, do later)
The file references old CLI architecture. Update to reflect Pause paradigm when ready.

---

## Files Summary

### DELETE
- `infrastructure/` (entire directory)
- `docs/` (entire directory)
- `.serena/` (entire directory)
- `.github/workflows/release.yml`
- `.github/workflows/README.md`
- `opencode.jsonc`

### KEEP (in user-content/)
- `user-content/AGENTS.md`
- `user-content/AI_AND_RESUME.md`
- `user-content/README.md`
- `user-content/resume.xmpdata`

### CREATE
- `resume.json` (copy of careerProfile.json)
- `.github/workflows/resume.yml`
- `README.md` (new root README)
- `.gitignore` (updated)

---

## Verification

1. Push to main triggers "Build Resume" workflow
2. Workflow completes without errors
3. Artifacts contain:
   - PDF from `minimal` template
   - HTML from `simple` template
4. PDF content matches original resume data
