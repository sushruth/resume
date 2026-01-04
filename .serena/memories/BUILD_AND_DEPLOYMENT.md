# Build and Deployment Pipeline

## GitHub Actions Workflow (CI/CD)

**File**: `.github/workflows/release.yml`

### Trigger Conditions
- Push to `main` branch
- Only if changes include:
  - `cli/**` (CLI code changes)
  - `resume/**` (Resume source changes)
  - `.github/workflows/release.yml` (Workflow changes)
  - `Dockerfile` (Container image changes)
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

3. **Podman Build with Caching** (30-180 sec)
   - Uses GitHub Actions cache for `~/.local/share/containers`
   - Builds with `podman build --layers --cache-ttl=168h`
   - **Caching Strategy**:
     - Cache key: Hash of Dockerfile contents
     - If Dockerfile unchanged: Reuse all layers (30-60 sec)
     - If Dockerfile changed: Rebuild from change point (2-3 min)
     - Cache TTL: 7 days (168 hours)
     - Storage: `~/.local/share/containers` (Podman's default)

4. **LaTeX Compilation** (30-60 sec)
   - Runs Podman container with volume mount
   - Mount suffix `:Z` for SELinux compatibility
   - Executes `pdflatex -interaction=nonstopmode`
   - Outputs `resume.pdf` in workspace root

5. **GitHub Release** (10 sec)
   - Creates release tag: `v{run_number}` (e.g., v42)
   - Release name: `Resume v{run_number}`
   - Uploads `resume.pdf` as asset

**Total time**: 2-4 minutes (first run) → 1-2 minutes (cached runs)

## Container Image

**File**: `Dockerfile`

### Base Image
- **Alpine Linux** (minimal, lightweight)
- **texlive-full** package (TeX Live distribution)

### Build Behavior
- Uses volume mounts at runtime (no COPY commands)
- Sets working directory to `/workspace`
- No entrypoint (command specified at runtime)

### Cache Strategy
The workflow uses GitHub Actions cache + Podman's native layer caching:
```
Cache Key: podman-cache-{Dockerfile hash}
├─ Same hash → Reuse entire cache (30-60 sec builds)
└─ Different hash → Rebuild affected layers (2-3 min builds)

Storage: ~/.local/share/containers (per-runner)
Invalidation: Automatic when Dockerfile changes
TTL: 7 days (via --cache-ttl=168h)
```

## Local Development

### Sync LaTeX Sections Locally
```bash
cd cli
bun run sync
cd ..
```

Output: Generates `resume/sections/*.tex` files

### Build and Run with Podman Locally
Use the convenience script:
```bash
bash scripts/build.sh
```

Or manually:
```bash
# Build image
podman build --layers -t latex-builder .

# Compile resume
podman run --rm -w /workspace/resume -v "$(pwd):/workspace:Z" latex-builder pdflatex -interaction=nonstopmode -output-directory=/workspace resume.tex

# Check output
ls -lh resume.pdf
```

### Manual Test (without Podman)
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

### Podman Build Fails
- **Check Dockerfile syntax**: `podman build -t test .`
- **Check Alpine package name**: `texlive-full` is correct (not `texlive-latex` or similar)
- **Check Podman installation**: Ensure Podman is available on runner (Ubuntu latest has it)

### Workflow Doesn't Trigger
- **Check branch**: Only runs on `main`, not other branches
- **Check paths**: Changes must touch `cli/**`, `resume/**`, workflow, or Dockerfile
- **Check permissions**: Workflow needs `contents: write` permission (already set)

### Build Cancelled Unexpectedly
- **Concurrency control**: New commits automatically cancel older in-progress builds
- **Check workflow runs**: Only the latest commit should complete
- **Expected behavior**: This prevents wasting resources on outdated commits

## Release Management

### Release Naming
- **Tag**: `v{github.run_number}` (incrementing, not semver)
- **Name**: `Resume v{github.run_number}`
- **Asset**: `sushruth-sastry-resume.pdf`

### Finding Releases
- GitHub Releases tab: https://github.com/Sushruth-Sastry/Sushruth-Sastry---Resume-2025/releases
- Direct link to latest: `/releases/latest`

### Artifacts Retention
- Released PDFs are permanent (stored in GitHub Releases)
- Podman cache expires after 7 days without use (per GitHub Actions cache policy)
- Build logs are retained per GitHub's default retention policy
