# Resume LaTeX Sync CLI Architecture

## Overview
Bun/TypeScript CLI that syncs `careerProfile.json` (single source of truth) to LaTeX section files and HTML index file. Enables automated resume generation from structured data in both PDF (via LaTeX) and web formats.

**Data Schema:** The CLI uses the **[JSON Resume](https://jsonresume.org/)** standard schema for structured resume data.

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
- **Function**: `main()`
- Orchestrates the sync process:
  1. Read careerProfile.json (JSON Resume format)
  2. Parse career data using converters
  3. Generate LaTeX output using templates
  4. Generate HTML output using templates
  5. Write .tex files to resume/sections/
  6. Write index.html to resume/

### 3. Type Definitions (`cli/src/sync.types.ts`)
- Defines TypeScript interfaces based on JSON Resume schema
- Main types:
  - `Resume`: Root type conforming to JSON Resume standard
  - `Basics`: Personal information (name, email, location, profiles)
  - `WorkEntry`: Work experience (renamed from `ExperienceEntry`)
  - `EducationEntry`: Education (institution, area, studyType, dates)
  - `SkillEntry`: Skills (name, keywords)
  - `PublicationEntry`: Publications (name, publisher, releaseDate)
  - Custom: `KeyDifferentiators` (extension for principal-level narrative)
- Legacy aliases for backwards compatibility during migration

### 4. Utilities

#### File System (`cli/src/utils/file-system.ts`)
- Handles file I/O operations
- Functions: readCareerProfile(), writeLaTeXSections(), ensureSectionsDirectory()

#### Converters (`cli/src/utils/converters.ts`)
- Transforms careerProfile.json data into presentation formats
- **LaTeX**: Sanitizes special characters (escaping &, %, $, #, etc.)
- **HTML**: No sanitization (EJS handles escaping)
- Template compilation functions:
  - `compileTemplate()`: Single object to LaTeX
  - `compileTemplateHTML()`: Single object to HTML (uses EJS)
  - `compileArrayEntriesToLaTeX()`: Array of entries to LaTeX
  - `compileArrayEntriesToHTML()`: Array of entries to HTML

### 5. Templates (`cli/src/templates/`)

#### LaTeX Templates (jslatex/EmbeddedTS):
- `header.template.ets.tex` - Contact info, extracts from `basics.profiles[]`
- `objective.template.ets.tex` - Uses `basics.summary`
- `experience.template.ets.tex` - Work history from `work[]` (position, name, startDate, endDate)
- `education.template.ets.tex` - Degrees from `education[]` (studyType, area, institution)
- `skills.template.ets.tex` - Skills from `skills[]` (name, keywords[])
- `publications.template.ets.tex` - Publications from `publications[]` (name, publisher, releaseDate)

#### HTML Templates (EJS):
- `header.template.ets.html` - Contact info with social profiles
- `objective.template.ets.html` - Professional summary
- `experience.template.ets.html` - Work history with highlights
- `education.template.ets.html` - Degrees
- `skills.template.ets.html` - Skills table
- `publications.template.ets.html` - Publications

## Data Schema (JSON Resume)

The `careerProfile.json` follows the JSON Resume standard with custom extensions:

**Standard Fields:**
- `$schema`: Link to JSON Resume schema
- `basics`: Personal info, location, profiles (GitHub, LinkedIn)
- `work`: Array of work entries (name, position, startDate, endDate, summary, highlights)
- `education`: Array of education entries (institution, area, studyType, startDate, endDate)
- `skills`: Array of skills (name, keywords[])
- `publications`: Array of publications (name, publisher, releaseDate, url)

**Custom Extensions:**
- `key_differentiators`: Principal-level positioning (summary, points[])

**Field Mapping (Old → New):**
- `personal_info` → `basics`
- `experience` → `work`
- `role` → `position`
- `company` → `name`
- `start_date` → `startDate`
- `end_date` → `endDate`
- `degree` → `studyType` + `area`
- `category` → `name` (in skills)
- `items` → `keywords` (in skills)
- `title` → `name` (in publications)
- `conference` → `publisher`
- `year` → `releaseDate`

## Data Flow

LaTeX Path:
```
careerProfile.json (JSON Resume format)
       ↓
  [sync-latex.ts] → reads resume.basics, resume.work, etc.
       ↓
  [converters.ts] ← Sanitizes for LaTeX
       ↓
  [templates/*.ets.tex] ← Uses jslatex
       ↓
   resume/sections/*.tex
       ↓
  [LaTeX compilation] → resume.pdf
```

HTML Path:
```
careerProfile.json (JSON Resume format)
       ↓
  [sync-latex.ts] → reads resume.basics, resume.work, etc.
       ↓
  [converters.ts] ← No sanitization (EJS handles it)
       ↓
  [templates/*.ets.html] ← Uses EJS
       ↓
  [generateFullHTML] → resume/index.html
```

## Template System
- **LaTeX**: Uses `jslatex` for programmatic generation
  - `.ets.tex` files are EmbeddedTS templates (TypeScript + LaTeX)
  - Allows dynamic content insertion while maintaining LaTeX syntax
- **HTML**: Uses `ejs` for templating
  - `.ets.html` files use EJS syntax (`<% %>` for logic, `<%= %>` for output)
  - Variables computed in scriptlet blocks

## File Names
All filenames are strictly typed using enums in `cli/src/file-names.ts`:
- `InputFileNames` - Input files (e.g., careerProfile.json)
- `OutputFileNames` - Generated LaTeX section files and HTML (e.g., experience.tex, index.html)
- `TemplateFileNames` - Template files (e.g., experience.template.ets.tex, header.template.ets.html)

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

Additionally generates `resume/index.html` - complete HTML resume for web hosting.

## Build Integration
- Runs during GitHub Actions workflow before LaTeX compilation
- Output (sections/) is gitignored (generated files)
- CLI must succeed before LaTeX compilation via `xu-cheng/latex-action`

## Error Handling
- Exit code 0 on success
- Exit code 1 on failure with error message logged to stderr
