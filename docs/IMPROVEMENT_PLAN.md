# Improvement Plan: Streamlined Resume Management

This plan aims to simplify the usage of this repository and enhance template customizability, addressing the "cumbersome" setup and update process.

## 1. Configurable "Theme" System

We will move away from hardcoded template paths in TypeScript code.

- **Concept:** A "Theme" is a collection of templates.
- **Structure:**
  - Default templates moved to `infrastructure/templates/default/`.
  - User overrides supported in `user-content/templates/`.
- **Logic:** The build system will check `user-content/templates/{section}.tex.ejs` first. If missing, it falls back to the system default. This allows you to customize _just_ the "Education" section without forking the entire codebase.

## 2. Dynamic Section Loading

Currently, adding a new section (e.g., "Projects" or "Volunteering") requires modifying TypeScript code (`sync-latex.ts`).

- **Change:** Refactor the generator to iterate through a configured "Section Order".
- **Configuration:** Add a `resume.config.json` (or use `meta` in `careerProfile.json`) to define:
  ```json
  {
    "sectionOrder": ["header", "summary", "experience", "education", "skills"]
  }
  ```
- **Result:** To add a section, you simply add data to JSON, add the template file, and update the order list. No code changes required.

## 3. Automated "Hardcoded" Fixes

The `SETUP.md` asks users to manually `grep` and replace strings. We will automate this.

- **Action:** The `./resume init` command will:
  1.  Read `basics.name` from `careerProfile.json`.
  2.  Automatically update `resume.xmpdata` (Metadata).
  3.  Update `infrastructure/resume/resume.tex` headers.
  4.  Sanitize filenames (e.g., `John_Doe_Resume.pdf`).

## 4. Reusable Workflow Optimization

Focus on making the GitHub Actions reusable workflow the sole build mechanism.

- **Workflow:** The `release.yml` with `workflow_call` allows any repo to build resumes by calling this workflow.
- **Template Usage:** Minimal repos with just workflow file, data, and optional templates.
- **Implementation:** Ensure workflow fetches CLI via sparse checkout and handles all build steps.

---

## Execution Roadmap

1.  **Refactor Templates:** Move templates out of `src` and implement the "User Override" lookup logic.
2.  **Dynamic Logic:** Update `sync-latex.ts` to use a loop based on config/schema rather than hardcoded function calls.
3.  **Optimize Workflow:** Enhance reusable workflow for seamless external usage.
4.  **Dockerize:** Add container support.
