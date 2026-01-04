# GitHub Actions Workflows

## Release Workflow (`release.yml`)

Automatically builds and releases your resume PDF whenever changes are pushed to `main`.

### Trigger

Runs on push to `main` branch **only if** one of these paths change:
- `cli/**` - CLI codebase changes
- `resume/**` - Resume source files (data, LaTeX, styles)
- `.github/workflows/release.yml` - Workflow changes
- `Dockerfile` - Container image changes

Does NOT trigger on changes to: docs, README, AGENTS.md, etc.

### Concurrency Control

Uses GitHub Actions concurrency groups to cancel in-progress builds when new commits are pushed:
- **Group**: `{workflow}-{branch}` (e.g., `release.yml-main`)
- **Cancel-in-progress**: `true`

This prevents multiple builds from running simultaneously and ensures only the latest commit completes.

### Pipeline Steps

1. **Checkout code** - Clone the repository
2. **Set up Bun** - Install the Bun JavaScript runtime
3. **Install dependencies** - Install CLI dependencies
4. **Sync LaTeX files** - Run `bun run sync` to generate LaTeX sections from `careerProfile.json`
5. **Compile LaTeX document** - Use `xu-cheng/latex-action` with TeX Live `small` scheme and required packages
6. **Create release** - Use GitHub CLI to create a new GitHub release with version `v{run_number}`
7. **Upload release asset** - Use GitHub CLI to attach the generated PDF to the release

### Build Times

| Scenario | Duration | Why |
|----------|----------|-----|
| First run | 1-2 min | Downloads TeX Live packages on the runner |
| Subsequent runs | 1-2 min | Reuses cached TeX Live packages on the runner |

### Release Artifacts

Each workflow run creates a GitHub Release with:
- **Tag**: `v{run_number}` (e.g., `v42`)
- **Name**: `Resume v{run_number}`
- **Asset**: `sushruth-sastry-resume.pdf`

Releases are automatically listed on the repo's [Releases](https://github.com/Sushruth-Sastry/Sushruth-Sastry---Resume-2025/releases) page.

### Troubleshooting

#### PDF not generated
- Check that all required files exist in `resume/` folder
- Run `bun run sync` locally from `cli/` directory to validate CLI
- Check workflow logs for LaTeX compilation errors

#### LaTeX package install fails
- Confirm `extra_packages` includes all required packages from `resume.tex` and `TLCresume.sty`
- Check TeX Live package names (tlmgr uses lowercase names like `pdfx`, `arydshln`)

#### Workflow doesn't trigger
- Verify your push includes changes to `cli/**`, `resume/**`, workflow, or Dockerfile
- Documentation-only changes won't trigger the build
- Check branch is `main` (not `develop` or other branches)

#### Build cancelled unexpectedly
- Check if another commit was pushed while the build was running
- Concurrency control automatically cancels older builds in favor of newer ones

### Local Development

To test the build locally using TeX Live:

```bash
# Sync LaTeX files
cd cli
bun run sync
cd ..

# Compile resume
cd resume
latexmk -pdf -interaction=nonstopmode resume.tex
cd ..

# Check output
ls -lh resume.pdf
```
If you prefer `pdflatex`, run it twice to resolve references.
