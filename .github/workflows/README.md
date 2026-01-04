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
5. **Cache Podman layers** - Restore cached container layers from previous builds
6. **Build LaTeX image with Podman** - Build the lightweight Alpine-based container image with TeX Live
7. **Compile LaTeX document** - Run Podman container to compile `resume.tex` → `resume.pdf`
8. **Create release** - Tag a new GitHub release with version `v{run_number}`
9. **Upload release asset** - Attach the generated PDF to the release

### Podman Build Strategy

The workflow uses Podman (rootless container runtime) instead of Docker:
- **Layer caching**: `--layers` flag enables efficient layer reuse
- **Cache TTL**: `--cache-ttl=168h` (7 days) keeps layers cached
- **SELinux compatibility**: `:Z` volume mount suffix for proper labeling
- **GitHub Actions cache**: Stores `~/.local/share/containers` directory

#### Cache Key Logic
```
Key: podman-cache-{Dockerfile hash}
├─ Same Dockerfile → Reuse entire cache (30-60 sec builds)
└─ Different Dockerfile → New key, rebuild from change point (2-3 min builds)
```

### Build Times

| Scenario | Duration | Why |
|----------|----------|-----|
| First run | 2-3 min | Builds all container layers from scratch |
| Subsequent runs | 30-60 sec | Reuses cached `texlive-full` layer |
| After Dockerfile change | 2-3 min | Rebuilds affected layers, caches earlier ones |

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

#### Podman build fails
- Verify `Dockerfile` syntax: `podman build -t test .`
- Check Alpine package availability: Uses `texlive`, `texlive-luatex`, `texmf-dist-latexextra`, `texmf-dist-fontsextra`
- Review Podman version compatibility (GitHub runners use latest)
- If disk space errors occur, the minimal TeX Live packages should prevent this (replaces ~5GB `texlive-full`)

#### Workflow doesn't trigger
- Verify your push includes changes to `cli/**`, `resume/**`, workflow, or Dockerfile
- Documentation-only changes won't trigger the build
- Check branch is `main` (not `develop` or other branches)

#### Build cancelled unexpectedly
- Check if another commit was pushed while the build was running
- Concurrency control automatically cancels older builds in favor of newer ones

### Local Development

To test the workflow locally using Podman:

```bash
# Sync LaTeX files
cd cli
bun run sync
cd ..

# Build container image
podman build --layers -t latex-builder .

# Compile resume
podman run --rm -w /workspace/resume -v "$(pwd):/workspace:Z" latex-builder pdflatex -interaction=nonstopmode -output-directory=/workspace resume.tex

# Check output
ls -lh resume.pdf
```

Alternatively, use the convenience script:
```bash
bash scripts/build.sh
```
