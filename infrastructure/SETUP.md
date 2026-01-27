# Resume Template Setup

## Quick Start

1. Fork this repository.
2. Edit `user-content/careerProfile.json` with your personal data (follows JSON Resume schema).
3. Commit and push to `main`. GitHub Actions will automatically build and release your PDF resume.

All necessary templates, defaults, and build infrastructure are included in this repo—no external dependencies required.

## Updating Your Resume

Edit `user-content/careerProfile.json`, commit, and push. New PDF releases automatically.

## Customization

- For advanced changes, modify files in `infrastructure/` (e.g., LaTeX templates).
- Ensure GitHub Actions permissions allow writing for releases.
