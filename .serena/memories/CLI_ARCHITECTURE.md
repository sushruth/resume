# Resume LaTeX Sync CLI Architecture

## Overview
Bun/TypeScript CLI that syncs `careerProfile.json` (single source of truth) to LaTeX section files. Enables automated resume generation from structured data.

## Entry Point
- **File**: `cli/index.ts`
- **Command**: `bun run sync` (from cli/ directory)
- Uses Commander.js for CLI parsing

## Core Modules

### 1. Config (`cli/src/config.ts`)
- Defines file paths:
  - `CAREER_PROFILE_PATH`: Points to `resume/careerProfile.json`
  - `LATEX_SECTIONS_PATH`: Points to `resume/sections/`
- Paths are relative to import.meta.dir for flexibility

### 2. Sync LaTeX (`cli/src/sync-latex.ts`)
- **Function**: `syncLaTeXMain()`
- Orchestrates the sync process:
  1. Read careerProfile.json
  2. Parse career data using converters
  3. Generate LaTeX output using templates
  4. Write .tex files to resume/sections/

### 3. Type Definitions (`cli/src/sync.types.ts`)
- Defines TypeScript interfaces for careerProfile.json structure
- Ensures type safety throughout the pipeline

### 4. Utilities

#### File System (`cli/src/utils/file-system.ts`)
- Handles file I/O operations
- Likely contains: readFile(), writeFile(), ensureDir()

#### Converters (`cli/src/utils/converters.ts`)
- Transforms careerProfile.json data into LaTeX-friendly formats
- Handles escaping special LaTeX characters
- Formats dates, lists, and other data structures

### 5. Templates (`cli/src/templates/`)
Uses jslatex for dynamic LaTeX generation:
- `header.template.ets.tex` - Contact info, title
- `objective.template.ets.tex` - Professional summary
- `experience.template.ets.tex` - Work history
- `education.template.ets.tex` - Degrees
- `skills.template.ets.tex` - Skills by category
- `publications.template.ets.tex` - Academic publications

## Data Flow

```
careerProfile.json
       ↓
  [sync-latex.ts]
       ↓
  [converters.ts] ← Transforms data
       ↓
  [templates/*.ets.tex] ← Uses jslatex
       ↓
  resume/sections/*.tex
```

## Template System
- Uses `jslatex` for programmatic LaTeX generation
- `.ets.tex` files are EmbeddedTS templates (TypeScript + LaTeX)
- Allows dynamic content insertion while maintaining LaTeX syntax

## File Names
All filenames are strictly typed using enums in `cli/src/file-names.ts`:
- `InputFileNames` - Input files (e.g., careerProfile.json)
- `OutputFileNames` - Generated LaTeX section files (e.g., experience.tex)
- `TemplateFileNames` - Template files (e.g., experience.template.ets.tex)

This provides compile-time type safety for all file operations.

**Benefit**: TypeScript catches filename typos at compile time, not runtime. If a filename changes, you must update the enum, and all references are automatically type-checked.

## Output
Generated files in `resume/sections/`:
- `_header.tex`
- `objective.tex`
- `experience.tex`
- `education.tex`
- `skills.tex`
- `publications.tex`

These are imported in `resume/resume.tex` via LaTeX `\import{sections/}{filename}`

## Build Integration
- Runs during GitHub Actions workflow before LaTeX compilation
- Output (sections/) is gitignored (generated files)
- CLI must succeed before LaTeX compilation via `xu-cheng/latex-action`

## Error Handling
- Exit code 0 on success
- Exit code 1 on failure with error message logged to stderr
