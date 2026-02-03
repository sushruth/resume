# Sushruth Sastry 
_Senior/Lead Frontend Engineer, Gearing Toward Principal_

This repository contains the source for my resume in a structured, automated format. (No Word documents here.) The latest PDF is available on the [**Releases**](https://github.com/sushruth/resume/releases) page.

---

[![Build Resume](https://github.com/sushruth/resume/actions/workflows/resume.yml/badge.svg)](https://github.com/sushruth/resume/actions/workflows/resume.yml)

### Architecture

The resume is managed as structured data following the **[JSON Resume](https://jsonresume.org/)** standard (`resume.json`) rather than static documents. The **[Pause](https://github.com/usually-frustrated/pause)** GitHub Action automatically generates PDF and HTML versions from this single source of truth.

### Components

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Data** | `resume.json` (JSON Resume) | Single source of truth. |
| **Build** | **Pause GitHub Action** | Renders JSON to PDF & HTML. |
| **Output** | **LaTeX** (PDF) + **HTML** | Artifacts & Release attachments. |

### Workflow

1. **Update:** Edit `resume.json` with new career information.
2. **Push:** Commit and push changes to `main`.
3. **Build:** GitHub Actions automatically builds the resume using the Pause action.
4. **Release:** A new release is created with the generated PDF and HTML.

---

**Sushruth Sastry**  
[linkedin.com/in/sushruth-sastry](https://linkedin.com/in/sushruth-sastry) | [github.com/sushruth](https://github.com/sushruth)

*On AI:* I use AI tools daily, but I have not done AI work I would put on a principal-level resume. [More context.](AI_AND_RESUME.md)