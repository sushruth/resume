# Deployment Options for Resume HTML

This guide covers deploying the HTML version of your resume to various static hosting platforms.

## Build Process Overview

The build process is handled by `infrastructure/build.sh`, which:
1. Installs Bun if needed
2. Navigates to `infrastructure/cli` and runs `bun install`
3. Runs `bun run sync` to generate the HTML from `user-content/careerProfile.json`
4. Copies `infrastructure/resume/index.html` to `infrastructure/index.html`

## Cloudflare Pages

### Configuration

1. **Repository**: `sushruth/resume`
2. **Project name**: `resume` (or your preferred name)
3. **Root directory (path)**: `infrastructure`
4. **Build command**: `bash build.sh`
5. **Build output directory**: `.` (current directory)

### Advanced Settings

**Non-production branch deploy command**: `bash build.sh`

**Builds for non-production branches**: ✓ Enabled (if you want preview deployments)

### Notes
- The root directory is set to `infrastructure`, so the build runs from there
- The build command is simply `bash build.sh` (not `bash infrastructure/build.sh`)
- The HTML file is generated at `infrastructure/index.html` by the build script
- Cloudflare Pages will serve from the `infrastructure` directory

---

## Vercel

### Configuration

1. **Framework Preset**: Other
2. **Root Directory**: `infrastructure`
3. **Build Command**: `bash build.sh`
4. **Output Directory**: `.` (current directory, since build.sh outputs index.html to infrastructure/)
5. **Install Command**: (leave default or empty - Bun will be installed by build.sh)

### Alternative: vercel.json

Create a `vercel.json` file at the repository root:

```json
{
  "buildCommand": "bash infrastructure/build.sh",
  "outputDirectory": "infrastructure",
  "installCommand": "echo 'Dependencies installed by build.sh'"
}
```

### Notes
- Vercel will automatically detect the `index.html` in the output directory
- The build script handles Bun installation, so no separate install step is needed

---

## Netlify

### Configuration

1. **Base directory**: `infrastructure`
2. **Build command**: `bash build.sh`
3. **Publish directory**: `.` (current directory)

### Alternative: netlify.toml

Create a `netlify.toml` file at the repository root:

```toml
[build]
  base = "infrastructure"
  command = "bash build.sh"
  publish = "."

[build.environment]
  NODE_VERSION = "20"
```

### Notes
- Netlify will serve the `index.html` from the publish directory
- The build script installs Bun automatically

---

## Render.com

### Configuration

1. **Type**: Static Site
2. **Build Command**: `bash infrastructure/build.sh`
3. **Publish directory**: `infrastructure`

### Environment Variables (Optional)

If needed, you can set:
- `NODE_VERSION`: `20` (though the build script installs Bun independently)

### Notes
- Render.com will serve files from the publish directory
- The build process is straightforward since everything is handled by the build script

---

## Common Troubleshooting

### Bun Installation Fails

If the automatic Bun installation in `build.sh` fails, you may need to:

1. **Cloudflare Pages**: Bun should install without issues
2. **Vercel**: Usually works, but if it fails, consider using Node.js and converting the CLI
3. **Netlify**: Should work; ensure Ubuntu-based build image is used
4. **Render**: Should work without issues

### Build Path Issues

If the deployment can't find `index.html`:

1. Verify the build command runs successfully in logs
2. Check that `infrastructure/index.html` exists after build
3. Ensure the publish/output directory is set to `infrastructure`

### Preview Deployments

For preview deployments on pull requests or branches:
- All platforms support this
- Use the same build configuration
- The HTML will be generated from the branch's `user-content/careerProfile.json`

---

## Recommendations

- **Best performance**: Cloudflare Pages (global CDN, edge network)
- **Easiest setup**: Vercel or Netlify (automatic Git integration)
- **Most flexible**: Render.com (more control over build environment)

All platforms offer:
- Automatic deployments on Git push
- HTTPS by default
- Custom domain support
- Branch preview deployments
