# GitHub Actions Workflows - Resume Template

## Release Workflow (`release.yml`)

Automatically builds and releases your resume PDF whenever changes are pushed to `main`. This workflow works for any forked repository with no configuration needed.

### Trigger

Runs on:

- Push to `main` branch **only if** one of these paths change:
  - `infrastructure/cli/**` - CLI codebase changes
  - `infrastructure/resume/**` - Resume LaTeX files and styles
  - `user-content/**` - User resume data (careerProfile.json, metadata)
  - `.github/workflows/release.yml` - Workflow changes
- `workflow_call` - Allows this workflow to be called as a reusable workflow from other repositories.

Does NOT trigger on changes to: docs, root README.md, etc.

### Reusable Workflow Usage

This workflow can be used as a reusable workflow in other repositories. To use it:

1. In your repository, create a `.github/workflows/build-resume.yml` file.
2. Add the following content:

```yaml
name: Build Resume

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-resume:
    uses: your-username/your-resume-repo/.github/workflows/release.yml@main
```

Replace `your-username/your-resume-repo` with the actual repository path. This allows forked repositories to automatically build and release resumes without duplicating the workflow code.

### Concurrency Control

Uses GitHub Actions concurrency groups to cancel in-progress builds when new commits are pushed:

- **Group**: `{workflow}-{branch}` (e.g., `release.yml-main`)
- **Cancel-in-progress**: `true`

This prevents multiple builds from running simultaneously and ensures only the latest commit completes.

### Pipeline Steps

1. **Checkout code** - Clone the repository
2. **Set up Bun** - Install the Bun JavaScript runtime
3. **Install dependencies** - Install CLI dependencies
4. **Sync LaTeX files** - Run `bun run sync` from `infrastructure/cli/` to generate LaTeX sections from `user-content/careerProfile.json`
5. **Compile LaTeX document** - Use `xu-cheng/latex-action` with TeX Live packages to compile PDF
6. **Set current year and PDF name** - Generate timestamped filename
7. **Rename PDF** - Format PDF as `Your_Name_Resume_YYYY.pdf`
8. **Create release** - Use GitHub CLI to create a new GitHub release with version `v{run_number}`
9. **Upload release asset** - Use GitHub CLI to attach the generated PDF to the release

### Build Times

| Scenario        | Duration | Why                                           |
| --------------- | -------- | --------------------------------------------- |
| First run       | 1-2 min  | Downloads TeX Live packages on the runner     |
| Subsequent runs | 1-2 min  | Reuses cached TeX Live packages on the runner |

### Release Artifacts

Each workflow run creates a GitHub Release with:

- **Tag**: `v{run_number}` (e.g., `v42`)
- **Name**: `Resume v{run_number}`
- **Asset**: `{Your_Name}_Resume_{YEAR}.pdf` (where {YEAR} is the current year)

Releases are automatically listed on the repository's Releases page.

Note: This template does not include GitHub Pages deployment. Users can enable it separately if desired.

### Troubleshooting

#### PDF not generated

- Check that all required files exist in `user-content/` and `infrastructure/resume/` folders
- Run `bun run sync` locally from `infrastructure/cli/` directory to validate CLI
- Check workflow logs for LaTeX compilation errors
- Verify templates in `infrastructure/cli/src/templates/` are valid

#### LaTeX package install fails

- Confirm environment variable `LATEX_PACKAGES` includes all required packages from `infrastructure/resume.tex` and `infrastructure/resume/TLCresume.sty`
- Check TeX Live package names (tlmgr uses lowercase names like `pdfx`, `arydshln`)

#### Workflow doesn't trigger

- Verify your push includes changes to `infrastructure/cli/**`, `infrastructure/resume/**`, `user-content/**`, or workflow
- Documentation-only changes (like docs/ folder) won't trigger build
- Check branch is `main` (not `develop` or other branches)

#### Build cancelled unexpectedly

- Check if another commit was pushed while the build was running
- Concurrency control automatically cancels older builds in favor of newer ones

### Local Development

To test the build locally using TeX Live:

```bash
# Sync LaTeX files
cd infrastructure/cli
bun run sync
cd ../..

# Compile PDF
cd infrastructure/resume
latexmk -pdf -interaction=nonstopmode resume.tex
cd ../..

# Check output
ls -lh infrastructure/resume/resume.pdf
```

If you prefer `pdflatex`, run it twice to resolve references.
