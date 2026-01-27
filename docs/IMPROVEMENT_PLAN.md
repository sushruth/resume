# Improvement Plan: Streamlined Resume Management

This plan aims to simplify the usage of this repository and enhance template customizability, addressing the "cumbersome" setup and update process.

## 1. Unified Root CLI (`./resume`)

Instead of navigating directories and running complex `bun` commands, we will introduce a single entry point script at the project root.

- **Location:** `./resume` (Executable Bash script)
- **Goal:** Abstract away underlying complexity (Bun, LaTeX, file paths).
- **Commands:**
  - `./resume init`: Interactively helps you set up `careerProfile.json` and config.
  - `./resume build`: Installs dependencies (if needed) and generates PDF/HTML.
  - `./resume doctor`: Checks for missing tools (Bun, LaTeX) and offers fixes (e.g., "Run via Docker?").
  - `./resume watch`: Rebuilds on file changes (Hot Module Replacement for your resume).

## 2. Configurable "Theme" System

We will move away from hardcoded template paths in TypeScript code.

- **Concept:** A "Theme" is a collection of templates.
- **Structure:**
  - Default templates moved to `infrastructure/templates/default/`.
  - User overrides supported in `user-content/templates/`.
- **Logic:** The build system will check `user-content/templates/{section}.tex.ejs` first. If missing, it falls back to the system default. This allows you to customize _just_ the "Education" section without forking the entire codebase.

## 3. Dynamic Section Loading

Currently, adding a new section (e.g., "Projects" or "Volunteering") requires modifying TypeScript code (`sync-latex.ts`).

- **Change:** Refactor the generator to iterate through a configured "Section Order".
- **Configuration:** Add a `resume.config.json` (or use `meta` in `careerProfile.json`) to define:
  ```json
  {
    "sectionOrder": ["header", "summary", "experience", "education", "skills"]
  }
  ```
- **Result:** To add a section, you simply add data to JSON, add the template file, and update the order list. No code changes required.

## 4. Automated "Hardcoded" Fixes

The `SETUP.md` asks users to manually `grep` and replace strings. We will automate this.

- **Action:** The `./resume init` command will:
  1.  Read `basics.name` from `careerProfile.json`.
  2.  Automatically update `resume.xmpdata` (Metadata).
  3.  Update `infrastructure/resume/resume.tex` headers.
  4.  Sanitize filenames (e.g., `John_Doe_Resume.pdf`).

## 5. Cloud & Online Services (Zero Local Dependency)

To avoid heavy local requirements (Docker/Bun/LaTeX), we will leverage cloud services.

### A. GitHub Actions (The "Edit in Browser" Flow)

This is the primary "no-install" method.

- **Workflow:**
  1.  Edit `careerProfile.json` directly on GitHub.com.
  2.  Commit changes.
  3.  GitHub Actions automatically compiles the PDF and attaches it as a build artifact or release.
- **Action:** We will optimize the existing `release.yml` to ensure it runs fast and makes the PDF easily accessible.

### B. GitHub Codespaces

For a full "development environment" in the browser:

- **Action:** Add a `.devcontainer` configuration.
- **Benefit:** Click "Code > Open in Codespaces" on GitHub, and you get a VS Code terminal in your browser with Bun and TeX Live **already installed**. You can run `./resume build` immediately.

### C. Overleaf Integration

_Note: Overleaf cannot run our automation (JSON -> LaTeX conversion), but it is excellent for manual styling._

- **Action:** Add a `./resume export` command.
- **Result:** Generates a `resume-export.zip` containing the compiled LaTeX, logic, and style files.
- **Usage:** You can upload this zip directly to Overleaf to see/edit your resume in their editor.

## 6. Standalone CLI Distribution

To enable the `./resume` binary to work in ANY repository without requiring users to clone or include infrastructure code, we will make the CLI self-contained and distributable.

- **Goal:** Users can copy `./resume` script and use it in any repo with just their data files.
- **Approach:**
  - Publish CLI as GitHub Release binaries (macOS, Linux, Windows).
  - Modify `./resume` to auto-download CLI if not present locally.
  - Update reusable workflow to fetch CLI from original repo via sparse checkout.
- **Template Usage:** Forked repos need only:
  - `.github/workflows/release.yml` (calls reusable workflow)
  - `user-content/careerProfile.json`
  - Optional: `user-content/templates/`
- **Implementation:**
  - Add build step to create binaries using `bun build --compile`.
  - Release binaries on GitHub Releases.
  - Script detects OS/arch and downloads appropriate binary.
  - Workflow uses `actions/checkout` with `sparse-checkout: infrastructure/` to fetch CLI.

---

## Execution Roadmap

1.  **Refactor Templates:** Move templates out of `src` and implement the "User Override" lookup logic.
2.  **Dynamic Logic:** Update `sync-latex.ts` to use a loop based on config/schema rather than hardcoded function calls.
3.  **Create CLI:** Write the `./resume` bash wrapper.
4.  **Standalone Distribution:** Publish CLI binaries and update script/workflow for auto-download.
5.  **Dockerize:** Add container support.
