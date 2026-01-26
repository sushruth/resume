# Resume Template Setup Guide

## 🚀 Quick Start

Use this template to create your own professional resume in minutes!

### 1. Fork This Repository

1. Click the "Fork" button at the top of this repository
2. Clone your forked repository locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/resume-template.git
   cd resume-template
   ```

### 2. Personalizing the Resume Template

Here is a checklist for anyone creating a new repository from this template, based on the steps we took to set up your profile.

**1. Update the Source of Truth**

- **File:** `user-content/careerProfile.json`
- **Action:** Replace all data with your own. This follows the standard [JSON Resume](https://jsonresume.org/schema/) schema.
- **Tip:** Do not worry about formatting yet; just get the raw data right.

**2. Personalize Documentation (The "User Content" Folder)**

- **File:** `user-content/README.md`
  - **Action:** Rewrite the "Engineering Philosophy" and "Technical Arsenal" sections to match your industry (e.g., Software, Hardware, Data Science).
  - **Action:** Update the links to your new repository URL and LinkedIn.
- **File:** `user-content/AGENTS.md`
  - **Action:** Update the **# IDENTITY & PURPOSE** and **# USER CONTEXT** sections. This ensures that if you use AI agents (like Gemini, Claude, or Cursor) to help you later, they know who you are and what tone to use.
- **File:** `user-content/resume.xmpdata`
  - **Action:** Update `\Title`, `\Author`, `\Subject`, and `\Keywords`. This ensures your generated PDF has professional metadata (great for ATS parsing).
- **File:** `user-content/AI_AND_RESUME.md` (Optional)
  - **Action:** Delete this if it doesn't apply to you, or rewrite it to explain your own stance on AI tools.

**3. Fix Hardcoded Infrastructure References**

Most name references are now **automatically pulled from `careerProfile.json`** (PDF filename, HTML title, LaTeX header). You only need to manually update repository-specific references:

**Automated (no changes needed):**

- ✅ PDF filename - Automatically uses `name` from `careerProfile.json`
- ✅ HTML title - Automatically uses `basics.name` from `careerProfile.json`
- ✅ LaTeX header - Automatically uses data from `careerProfile.json`

**Files to manually update:**

- **`infrastructure/cli/README.md`** - Update repository URL in the description
- **`docs/DEPLOYMENT_OPTIONS.md`** - Update repository references
- **`.serena/memories/BUILD_AND_DEPLOYMENT.md`** - Update releases URL and PDF asset name
- **`user-content/AI_AND_RESUME.md`** - Update the author name (or delete if not applicable)

**Quick search command to find remaining hardcoded references:**

```bash
grep -ri "sushruth\|keepam/resume" . --exclude-dir=node_modules --exclude-dir=.git
```

**4. Generate the Artifacts**
Before pushing, ensure the system works locally:

```bash
cd infrastructure/cli
bun install
bun run sync
```

- **Check:** Verify that `.tex` files in `infrastructure/cli/resume/sections/` have updated with your new data.

**5. Enable GitHub Actions**

- Push your changes to `main`.
- Go to your repository **Settings > Actions > General**.
- Ensure **Workflow permissions** are set to "Read and write permissions" (so the Action can create a Release).
- The `release.yml` workflow will automatically compile your PDF and publish it to the **Releases** tab.

## 🔄 Making Updates

Whenever you want to update your resume:

1. Edit `user-content/careerProfile.json`
2. Commit and push changes
3. GitHub Actions automatically rebuild your PDF

## 🛠️ Advanced Customization

### Styling Changes

- **Do NOT edit** `infrastructure/TLCresume.sty` unless you know LaTeX well
- For style changes, consider creating a fork and modifying the styling

### Template Structure

- **User Content** (`user-content/`): Your personal data
- **Infrastructure** (`infrastructure/`): Build system, templates, CI/CD
- **Documentation** (`docs/`): Project specs and guides

## 🐛 Troubleshooting

### Common Issues

**Build fails on GitHub Actions:**

- Check that `careerProfile.json` has valid JSON syntax
- Ensure all required fields are present
- Look at the Actions tab for specific error messages

**Local sync fails:**

```bash
cd infrastructure/cli
bun install  # Ensure dependencies are installed
bun run sync  # Check for specific error messages
```

**PDF formatting issues:**

- Check for special characters in your data that might break LaTeX
- Review the error logs from the build process

### Need Help?

1. Check the [Issues](../../issues) page
2. Create a new issue with:
   - What you tried
   - Error messages you received
   - Your operating system

## 📝 Best Practices

1. **Keep it current**: Update your resume regularly
2. **Proofread**: Review generated PDF for formatting issues
3. **Version control**: Commit meaningful changes with descriptive messages
4. **Backup**: Keep a copy of your final PDF resume

## 🎯 Success Metrics

A well-configured resume template should:

- ✅ Generate PDF automatically when you push changes
- ✅ Produce professional formatting without manual LaTeX editing
- ✅ Update in under 5 minutes when you need to make changes
- ✅ Work consistently across different systems

---

**🎉 Congratulations! You now have a professional, maintainable resume system!**
