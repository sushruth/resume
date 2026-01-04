# Project Structure Overview

## Directory Layout

```
Sushruth-Sastry---Resume-2025/
├── resume/                          # Resume source files (all generated files gitignored)
│   ├── careerProfile.json          # Single source of truth for all resume data
│   ├── resume.tex                  # Main LaTeX document
│   ├── resume.xmpdata              # PDF metadata (title, keywords, etc.)
│   ├── TLCresume.sty               # LaTeX style file
│   └── sections/                   # Generated LaTeX sections (gitignored)
│       ├── _header.tex
│       ├── experience.tex
│       ├── education.tex
│       ├── skills.tex
│       ├── objective.tex
│       └── publications.tex
│
├── cli/                            # Bun/TypeScript CLI for syncing data to LaTeX
│   ├── index.ts                    # Entry point
│   ├── src/
│   │   ├── config.ts               # File path configuration
│   │   ├── file-names.ts           # Strictly typed filename enums
│   │   ├── sync-latex.ts           # Main sync orchestration
│   │   ├── sync.types.ts           # TypeScript types for careerProfile.json
│   │   ├── templates/              # EmbeddedTS LaTeX templates
│   │   │   ├── header.template.ets.tex
│   │   │   ├── experience.template.ets.tex
│   │   │   ├── education.template.ets.tex
│   │   │   ├── skills.template.ets.tex
│   │   │   ├── objective.template.ets.tex
│   │   │   └── publications.template.ets.tex
│   │   └── utils/
│   │       ├── converters.ts       # LaTeX escaping and template compilation
│   │       └── file-system.ts      # File I/O operations
│   ├── bun.lock                    # Bun lockfile
│   └── package.json                # Dependencies
│
├── .github/workflows/
│   ├── release.yml                 # CI/CD: Sync → Compile LaTeX → Release
│   └── README.md                   # CI/CD documentation and troubleshooting
│
├── Dockerfile                      # Legacy/local container build (not used in CI)
├── .gitignore                      # Ignores: resume/sections/, *.pdf, *.log, etc.
├── README.md                       # Project overview and philosophy
├── AGENTS.md                       # Instructions for AI agents (you are here)
├── resume.pdf                      # Generated PDF (artifact, not committed)
└── (other files: .git, .serena, etc.)
```

## Key Separation

### Source vs. Artifacts
- **Source** (committed): `resume/careerProfile.json`, `resume.tex`, `resume.xmpdata`, `TLCresume.sty`, `/cli`
- **Generated** (gitignored): `resume/sections/*.tex`, `resume.pdf`, Docker images, build caches

### Data Flow
```
resume/careerProfile.json
        ↓
    [CLI sync-latex.ts]
        ↓
    [converters.ts - escape LaTeX]
        ↓
    [templates/*.ets.tex - jslatex]
        ↓
    resume/sections/*.tex
        ↓
    [latex-action + latexmk]
        ↓
    resume.pdf
```

## File Naming Convention

All hardcoded filenames are strictly typed in `/cli/src/file-names.ts`:
- `InputFileNames` enum - Input files
- `OutputFileNames` enum - Generated .tex files
- `TemplateFileNames` enum - Template files

This prevents typos and ensures consistency across the codebase.
