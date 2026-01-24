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

### 2. Customize Your Resume

Edit the files in the `user-content/` directory:

#### 📝 `user-content/careerProfile.json`
This is the **single source of truth** for your resume data. Update it with your:

- Personal information (name, contact, etc.)
- Work experience
- Education details
- Skills
- Career objective
- Publications (if any)

**Example structure:**
```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Professional Title",
    "contact": {
      "email": "your.email@example.com",
      "phone": "+1-555-0123",
      "location": "Your City, State",
      "github": "yourusername",
      "linkedin": "yourlinkedin",
      "website": "https://yourwebsite.com"
    }
  },
  "experience": [
    {
      "title": "Senior Software Engineer",
      "company": "Tech Company",
      "duration": "2022 - Present",
      "highlights": ["Led development of key features", "Improved performance by 40%"]
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Science in Computer Science",
      "institution": "University Name",
      "duration": "2018 - 2022",
      "gpa": "3.8"
    }
  ],
  "skills": {
    "languages": ["JavaScript", "Python", "TypeScript"],
    "frameworks": ["React", "Node.js", "Django"],
    "tools": ["Git", "Docker", "AWS"]
  },
  "objective": "Experienced software engineer seeking to leverage technical expertise in a challenging role."
}
```

#### 📄 `user-content/resume.xmpdata`
Update PDF metadata:
```latex
\Title{Your Name - Resume}
\Author{Your Name}
\Keywords{resume, software engineer, your-specialties}
```

#### 📖 `user-content/README.md`
Update the project description to reflect your personal information and preferences.

### 3. Generate Your Resume

#### Option A: Local Development
```bash
cd infrastructure/cli
bun install
bun run sync
cd ../..
pdflatex infrastructure/resume/resume.tex
```

#### Option B: Automatic (Recommended)
1. Commit your changes:
   ```bash
   git add .
   git commit -m "Update resume with my information"
   git push
   ```
2. The automatic GitHub Actions will:
   - Sync your data to LaTeX format
   - Compile your PDF resume
   - Create a GitHub release with your PDF

### 4. Download Your Resume

1. Go to your repository's "Releases" page
2. Download the latest PDF resume
3. The filename will be formatted as: `Your_Name_Resume_YYYY.pdf`

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