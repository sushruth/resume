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
5. **Build output directory**: `public`

### Advanced Settings

**Non-production branch deploy command**: `bash build.sh`

**Builds for non-production branches**: ✓ Enabled (if you want preview deployments)

### Notes
- The root directory is set to `infrastructure`, so the build runs from there
- The build command is simply `bash build.sh` (not `bash infrastructure/build.sh`)
- The HTML file is generated in the `infrastructure/public/` directory by the build script
- The `public` output directory avoids symlink issues from `node_modules`

---

## Vercel

### Configuration

1. **Framework Preset**: Other
2. **Root Directory**: `infrastructure`
3. **Build Command**: `bash build.sh`
4. **Output Directory**: `public`
5. **Install Command**: (leave default or empty - Bun will be installed by build.sh)

### Alternative: vercel.json

Create a `vercel.json` file at the repository root:

```json
{
  "buildCommand": "cd infrastructure && bash build.sh",
  "outputDirectory": "infrastructure/public",
  "installCommand": "echo 'Dependencies installed by build.sh'"
}
```

### Notes
- The build script creates a clean `public` directory with only the HTML file
- This avoids symlink issues from `node_modules`
- Vercel will serve the `index.html` from the `public` directory

---

## Netlify

### Configuration

1. **Base directory**: `infrastructure`
2. **Build command**: `bash build.sh`
3. **Publish directory**: `public`

### Alternative: netlify.toml

Create a `netlify.toml` file at the repository root:

```toml
[build]
  base = "infrastructure"
  command = "bash build.sh"
  publish = "public"

[build.environment]
  NODE_VERSION = "20"
```

### Notes
- The build script creates a clean `public` directory with only the HTML file
- This avoids symlink issues from `node_modules`
- Netlify will serve the `index.html` from the `public` directory
- The build script installs Bun automatically

---

## Render.com

### Configuration

1. **Type**: Static Site
2. **Root Directory**: `infrastructure`
3. **Build Command**: `bash build.sh`
4. **Publish directory**: `public`

### Alternative (if root directory not supported)

If Render doesn't support setting a root directory:

1. **Build Command**: `cd infrastructure && bash build.sh`
2. **Publish directory**: `infrastructure/public`

### Environment Variables (Optional)

If needed, you can set:
- `NODE_VERSION`: `20` (though the build script installs Bun independently)

### Notes
- The build script creates a clean `public` directory with only the HTML file
- This avoids symlink issues from `node_modules`
- Render.com will serve the `index.html` from the publish directory

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
2. Check that `infrastructure/public/index.html` exists after build
3. Ensure the publish/output directory is set to `public`

### Symlink Errors

If you see errors about "links to files that can't be accessed":

1. This happens when `node_modules` is in the output directory
2. The build script now outputs to a clean `public` directory to avoid this
3. Make sure your output/publish directory is set to `public`, not `.` or `infrastructure`

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
