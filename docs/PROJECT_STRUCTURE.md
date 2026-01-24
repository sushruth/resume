# Resume Template Repository Structure

## Directory Layout

```
resume-template/
├── user-content/                   # 📝 EDIT THIS - Your personal resume content
│   ├── careerProfile.json         # ✏️ All resume data (single source of truth)
│   ├── resume.xmpdata             # ✏️ PDF metadata (name, keywords, etc.)
│   ├── README.md                  # ✏️ Your project description
│   └── AGENTS.md                  # ✏️ AI agent instructions for your needs
│
├── infrastructure/                 # 🚫 DON'T EDIT - Template system
│   ├── cli/                       # 🔧 Bun/TypeScript CLI sync engine
│   │   ├── index.ts               # Entry point
│   │   ├── src/
│   │   │   ├── config.ts          # File path configuration
│   │   │   ├── file-names.ts      # Typed filename enums
│   │   │   ├── sync-latex.ts      # Main sync orchestration
│   │   │   ├── sync.types.ts      # TypeScript types for careerProfile.json
│   │   │   ├── templates/         # EmbeddedTS LaTeX templates
│   │   │   └── utils/             # Converters and file system ops
│   │   ├── bun.lock               # Bun lockfile
│   │   └── package.json           # Dependencies
│   │
│   ├── .github/workflows/         # 🔄 CI/CD pipeline
│   │   ├── release.yml            # Automated build and release
│   │   └── README.md              # CI/CD documentation
│   │
│   ├── resume/                    # 📄 LaTeX document system
│   │   ├── resume.tex             # Main LaTeX document
│   │   ├── resume.xmpdata         # PDF metadata (symlink to user-content)
│   │   ├── TLCresume.sty          # LaTeX styling
│   │   ├── resume.html.ejs        # HTML template
│   │   └── sections/              # Generated LaTeX sections (gitignored)
│   │       ├── _header.tex
│   │       ├── experience.tex
│   │       ├── education.tex
│   │       ├── skills.tex
│   │       ├── objective.tex
│   │       └── publications.tex
│   │
│   └── build.sh                   # 🏗️ Build script
│
├── docs/                           # 📚 Project documentation
│   ├── SPEC.md                    # Specification and task management
│   ├── CLAUDE.md                  # Claude-specific instructions
│   └── GEMINI.md                  # Gemini-specific instructions
│
├── .gitignore                     # Git ignore rules
├── .serena/                       # Serena agent cache and memories
└── resume.pdf                     # Generated PDF (artifact, not committed)
```

## 🎯 Quick Start for Template Users

1. **Fork this repository**
2. **Edit your content**: Update files in `user-content/`
3. **Run sync**: `cd infrastructure/cli && bun run sync`
4. **Commit and push**: Triggers automatic PDF generation

## 📝 What You Customize (user-content/)

- `careerProfile.json` - Your resume data
- `resume.xmpdata` - Your PDF metadata  
- `README.md` - Your project description
- `AGENTS.md` - Your AI agent preferences

## 🚫 What You Don't Touch (infrastructure/)

- Complete CLI sync engine
- Automated CI/CD pipeline
- LaTeX styling and templates
- Build and compilation system

## 🔄 Data Flow

```
user-content/careerProfile.json
        ↓
    [infrastructure/cli/sync-latex.ts]
        ↓
    [templates/ - jslatex compilation]
        ↓
    infrastructure/resume/sections/*.tex
        ↓
    [CI/CD LaTeX compilation]
        ↓
    resume.pdf
```

## 🏗️ Build Process

1. **Local Development**: `cd infrastructure/cli && bun run sync`
2. **Automatic Build**: Commit and push to trigger CI/CD
3. **PDF Generation**: LaTeX compilation creates `resume.pdf`

---

**This structure makes it immediately clear what users should edit versus what infrastructure they should never touch.**