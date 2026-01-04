# Build and Deployment Pipeline

## GitHub Actions Workflow (CI/CD)

**File**: `.github/workflows/release.yml`

### Trigger Conditions
- Push to `main` branch
- Only if changes include:
  - `cli/**` (CLI code changes)
  - `resume/**` (Resume source changes)
  - `.github/workflows/release.yml` (Workflow changes)
- Ignores: README, AGENTS.md, standalone docs, etc.

### Concurrency Control
- **Group**: `{workflow}-{branch}` (scoped per branch)
- **Cancel-in-progress**: Enabled
- **Behavior**: New commits cancel older running builds

### Pipeline Steps

1. **Checkout & Setup** (30 sec)
   - Clone repo
   - Install Bun runtime

2. **CLI Sync** (10 sec)
   - Run `bun run sync` from `/cli`
   - Reads `resume/careerProfile.json`
   - Generates `resume/sections/*.tex` files
   - Fails if data validation error occurs

3. **LaTeX Compilation** (30-90 sec)
   - Uses `xu-cheng/latex-action` with TeX Live `small` scheme
   - Installs required packages via `extra_packages`
   - Runs `latexmk` to compile `resume/resume.tex`
   - Outputs `resume.pdf` in workspace root

4. **GitHub Release** (10 sec)
   - Runs `gh release create` to create release tag: `v{run_number}` (e.g., v42)
   - Release name: `Resume v{run_number}`
   - Runs `gh release upload` to upload `resume.pdf` as asset

**Total time**: 1-2 minutes (typical)

## Local Development

### Sync LaTeX Sections Locally
```bash
cd cli
bun run sync
cd ..
```

Output: Generates `resume/sections/*.tex` files

### Manual Test
```bash
# Requires pdflatex installed locally
cd resume
pdflatex -interaction=nonstopmode resume.tex
pdflatex -interaction=nonstopmode resume.tex
cd ..
ls -lh resume.pdf
```

## Troubleshooting

### PDF Not Generated
- **Check 1**: Are resume/sections/*.tex files present?
  - Run `bun run sync` from `/cli`
- **Check 2**: Does resume/resume.tex compile?
  - Run `pdflatex` locally to see errors
- **Check 3**: Workflow logs on GitHub
  - Check for LaTeX compilation errors



### Workflow Doesn't Trigger
- **Check branch**: Only runs on `main`, not other branches
- **Check paths**: Changes must touch `cli/**`, `resume/**`, or workflow
- **Check permissions**: Workflow needs `contents: write` permission (already set)

### Build Cancelled Unexpectedly
- **Concurrency control**: New commits automatically cancel older in-progress builds
- **Check workflow runs**: Only the latest commit should complete
- **Expected behavior**: This prevents wasting resources on outdated commits

## Release Management

### Release Naming
- **Tag**: `v{github.run_number}` (incrementing, not semver)
- **Name**: `Resume v{github.run_number}`
- **Asset**: `Sushruth_Sastry_Resume_{YEAR}.pdf` (where {YEAR} is the current year)

### Finding Releases
- GitHub Releases tab: https://github.com/Sushruth-Sastry/Sushruth-Sastry---Resume-2025/releases
- Direct link to latest: `/releases/latest`

### Artifacts Retention
- Released PDFs are permanent (stored in GitHub Releases)
- Build logs are retained per GitHub's default retention policy
