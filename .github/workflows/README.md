# GitHub Actions Workflows

## Release Workflow (`release.yml`)

Automatically builds and releases your resume PDF whenever changes are pushed to `main`.

### Trigger

Runs on push to `main` branch **only if** one of these paths change:
- `cli/**` - CLI codebase changes
- `resume/**` - Resume source files (data, LaTeX, styles)

Does NOT trigger on changes to: docs, README, AGENTS.md, etc.

### Pipeline Steps

1. **Checkout code** - Clone the repository
2. **Set up Bun** - Install the Bun JavaScript runtime
3. **Install dependencies** - Install CLI dependencies
4. **Sync LaTeX files** - Run `bun run sync` to generate LaTeX sections from `careerProfile.json`
5. **Set up Docker Buildx** - Enable advanced Docker build features
6. **Build and cache LaTeX Docker image** - Build the lightweight Alpine-based Docker image with TeX Live
7. **Move Docker cache** - Update the build cache for next run
8. **Cache Docker layers** - Store Docker layers locally, keyed by Dockerfile hash
9. **Compile LaTeX document** - Run Docker container to compile `resume.tex` → `resume.pdf`
10. **Create release** - Tag a new GitHub release with version `v{run_number}`
11. **Upload release asset** - Attach the generated PDF to the release

### Docker Caching Strategy

The workflow uses a local file-based Docker cache that:
- **Persists indefinitely** unless the Dockerfile changes
- **Automatically invalidates** when you modify the Dockerfile (via `hashFiles('Dockerfile')`)
- **Rebuilds only changed layers** - Source file changes reuse the cached `texlive-full` layer

#### Cache Key Logic
```
Key: docker-cache-{Dockerfile hash}
├─ Same Dockerfile → Reuse entire cache (30-60 sec builds)
└─ Different Dockerfile → New key, rebuild from change point (2-3 min builds)
```

### Build Times

| Scenario | Duration | Why |
|----------|----------|-----|
| First run | 2-3 min | Builds all Docker layers from scratch |
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

#### Docker build fails
- Verify `Dockerfile` syntax: `docker build -t test .`
- Check Alpine package availability: `texlive-full` is the correct package name
- Review `COPY` paths in Dockerfile match current file structure

#### Workflow doesn't trigger
- Verify your push includes changes to `cli/**` or `resume/**`
- Documentation-only changes won't trigger the build
- Check branch is `main` (not `develop` or other branches)

### Local Development

To test the workflow locally:

```bash
# Sync LaTeX files
cd cli
bun run sync
cd ..

# Build Docker image
docker build -t latex-builder .

# Compile resume
docker run --rm -v $(pwd):/workspace latex-builder:latest

# Check output
ls -lh resume.pdf
```
