# Project Structure Overview

## Directory Layout

```
/
├── user-content/                   # User personal data and metadata
│   ├── careerProfile.json         # Single source of truth for all resume data (JSON Resume schema)
│   ├── README.md                  # User philosophy and technical arsenal
│   ├── AGENTS.md                  # Instructions for AI agents
│   ├── AI_AND_RESUME.md           # AI usage stance
│   ├── resume.xmpdata             # PDF metadata (title, keywords, etc.)
│   └── templates/                 # User-customizable templates (optional)
│
├── infrastructure/                # Build system and templates
│   ├── cli/                       # Bun/TypeScript CLI for syncing data to LaTeX
│   │   ├── index.ts               # Entry point
│   │   ├── src/
│   │   │   ├── config.ts          # File path configuration
│   │   │   ├── file-names.ts      # Strictly typed filename enums
│   │   │   ├── sync-latex.ts      # Main sync orchestration
│   │   │   ├── sync.types.ts      # TypeScript types for careerProfile.json
│   │   │   ├── templates/         # EmbeddedTS LaTeX templates
│   │   │   │   ├── tex/           # LaTeX templates
│   │   │   │   └── html/          # HTML templates
│   │   │   └── utils/
│   │   │       ├── converters.ts  # LaTeX escaping and template compilation
│   │   │       └── file-system.ts # File I/O operations
│   │   ├── bun.lock               # Bun lockfile
│   │   └── package.json           # Dependencies
│   ├── resume.tex                 # Main LaTeX document
│   ├── TLCresume.sty              # LaTeX style file
│   ├── SETUP.md                   # Simple setup instructions for template users
│   └── sections/                  # Generated LaTeX sections (gitignored)
│       ├── header.tex
│       ├── experience.tex
│       ├── education.tex
│       ├── skills.tex
│       ├── objective.tex
│       └── publications.tex
│
├── .github/workflows/
│   ├── release.yml                # CI/CD: Sync → Compile LaTeX → Release (reusable)
│   └── README.md                  # CI/CD documentation and troubleshooting
├── docs/                          # Project documentation
├── .gitignore                     # Ignores: infrastructure/sections/, *.pdf, *.log, etc.
├── README.md                      # Project overview and philosophy
├── AGENTS.md                      # Instructions for AI agents (you are here)
├── resume                         # Local build script
└── (other files: .git, .serena, etc.)
```

## Key Separation

### Source vs. Artifacts

- **Source** (committed): `user-content/careerProfile.json`, `infrastructure/resume.tex`, `infrastructure/TLCresume.sty`, `infrastructure/cli/`
- **Generated** (gitignored): `infrastructure/sections/*.tex`, `infrastructure/resume.pdf`, Docker images, build caches

### Data Flow

```
user-content/careerProfile.json
        ↓
    [CLI sync-latex.ts]
        ↓
    [converters.ts - escape LaTeX]
        ↓
    [templates/*.ets.tex - jslatex]
        ↓
    infrastructure/sections/*.tex
        ↓
    [latex-action + latexmk]
        ↓
    infrastructure/resume.pdf
```

## File Naming Convention

All hardcoded filenames are strictly typed in `infrastructure/cli/src/file-names.ts`:

- `InputFileNames` enum - Input files
- `OutputFileNames` enum - Generated .tex files
- `TemplateFileNames` enum - Template files

This prevents typos and ensures consistency across the codebase.
