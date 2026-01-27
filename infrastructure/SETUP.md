# Resume Template Setup

## Quick Start

1. Create a new repository or fork this one.
2. Set up the minimal structure:
   ```
   your-resume-repo/
   ├── .github/workflows/release.yml
   ├── user-content/careerProfile.json
   └── (optional) user-content/templates/
   ```
3. Edit `user-content/careerProfile.json` with your personal data (follows JSON Resume schema).
4. Commit and push to `main`. GitHub Actions will automatically build and release your PDF resume.

## Required Files

- **`.github/workflows/release.yml`**: Workflow file that calls the reusable build process.
  ```yaml
  name: Build Resume
  on:
    push:
      branches: [main]
    pull_request:
      branches: [main]
  jobs:
    build:
      uses: sushruth/resume/.github/workflows/release.yml@main
  ```
- **`user-content/careerProfile.json`**: Your resume data in JSON Resume format.

## Optional Files

- **`user-content/templates/`**: Custom LaTeX/HTML templates to override defaults.

## Updating Your Resume

Edit `user-content/careerProfile.json`, commit, and push. New PDF releases automatically.

## Customization

- Add custom templates in `user-content/templates/` to modify sections (e.g., `tex/experience.template.ets.tex`).
- The reusable workflow handles all build infrastructure—no local setup required.
