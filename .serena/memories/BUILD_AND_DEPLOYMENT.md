# Build and Deployment Pipeline

## GitHub Actions Workflow (CI/CD)

**File**: `.github/workflows/release.yml`

### Trigger Conditions
- Push to `main` branch
- Only if changes include:
  - `cli/**` (CLI code changes)
  - `resume/**` (Resume source changes)
- Ignores: README, AGENTS.md, docs, etc.

### Pipeline Steps

1. **Checkout & Setup** (30 sec)
   - Clone repo
   - Install Bun runtime

2. **CLI Sync** (10 sec)
   - Run `bun run sync` from `/cli`
   - Reads `resume/careerProfile.json`
   - Generates `resume/sections/*.tex` files
   - Fails if data validation error occurs

3. **Docker Build with Caching** (30-180 sec)
   - Uses `docker/setup-buildx-action` for advanced features
   - Builds `Dockerfile` with Alpine + texlive-full
   - **Caching Strategy**:
     - Cache key: Hash of Dockerfile contents
     - If Dockerfile unchanged: Reuse all layers (30-60 sec)
     - If Dockerfile changed: Rebuild from change point (2-3 min)
     - Cache stored locally in `/tmp/.buildx-cache`
     - Never expires unless Dockerfile changes

4. **LaTeX Compilation** (30-60 sec)
   - Runs Docker container
   - Executes `pdflatex` twice (for cross-references)
   - Outputs `resume.pdf` in workspace root

5. **GitHub Release** (10 sec)
   - Creates release tag: `v{run_number}` (e.g., v42)
   - Release name: `Resume v{run_number}`
   - Uploads `resume.pdf` as asset

**Total time**: 2-4 minutes (first run) → 1-2 minutes (cached runs)

## Docker Image

**File**: `Dockerfile`

### Base Image
- **Alpine Linux** (minimal, lightweight)
- **texlive-full** package (TeX Live distribution)

### Build Behavior
- Copies source files from `resume/` folder
- Copies `careerProfile.json` for embedding in PDF
- Sets working directory to `/workspace`
- Entrypoint: `pdflatex -interaction=nonstopmode -output-directory=. resume.tex`

### Cache Strategy
The workflow uses a file-based Docker buildx cache:
```
Cache Key: docker-cache-{Dockerfile hash}
├─ Same hash → Reuse entire cache (30-60 sec builds)
└─ Different hash → Rebuild affected layers (2-3 min builds)

Storage: /tmp/.buildx-cache (per-runner, survives workflow runs)
Invalidation: Automatic when Dockerfile changes
```

## Local Development

### Sync LaTeX Sections Locally
```bash
cd cli
bun run sync
cd ..
```

Output: Generates `resume/sections/*.tex` files

### Build and Run Docker Locally
```bash
# Build image
docker build -t latex-builder .

# Compile resume
docker run --rm -v $(pwd):/workspace latex-builder:latest

# Check output
ls -lh resume.pdf
```

### Manual Test (without Docker)
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

### Docker Build Fails
- **Check Dockerfile syntax**: `docker build -t test .`
- **Check Alpine package name**: `texlive-full` is correct (not `texlive-latex` or similar)
- **Check COPY paths**: Must match current file structure (resume/ folder)

### Workflow Doesn't Trigger
- **Check branch**: Only runs on `main`, not other branches
- **Check paths**: Changes must touch `cli/**` or `resume/**`
- **Check permissions**: Workflow needs `contents: write` permission (already set)

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
- Docker cache is ephemeral (per-runner, ~7 days without use)
- Build logs are retained per GitHub's default retention policy
