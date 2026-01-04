# Sushruth Sastry 
_Senior/Lead Frontend Engineer, Gearing Toward Principal_

This repository contains the source for my resume in a structured, automated format. (No Word documents here.) The latest PDF is available on the [**Releases**](https://github.com/Sushruth-Sastry/Sushruth-Sastry---Resume-2025/releases) page.

---

### Architecture

The resume is managed as structured data (`careerProfile.json`) rather than static documents. A CLI tool generates LaTeX sections from this single source of truth, which are compiled into the final PDF. This approach enables version control, automation, and consistency.

### Components

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Data** | `careerProfile.json` | Single source of truth. |
| **Generation** | **Bun + TypeScript CLI** (`/cli`) | Transforms JSON → LaTeX. |
| **Output** | **LaTeX** (`resume.tex`, `/sections`) | Renders to PDF. |
| **Templating** | `jslatex` | Programmatic LaTeX generation. |

### Workflow

1. **Update data:** Edit `careerProfile.json` with new career information.
2. **Generate:** Run `bun run sync` from the `/cli` directory to regenerate LaTeX sections.
3. **Compile:** Compile `resume.tex` to PDF using a LaTeX editor. (The pain is worth it.)
4. **Release:** Push to `main` to trigger automatic PDF release via CI/CD.
5. **Profit!**

---

**Sushruth Sastry**  
[linkedin.com/in/sushruth-sastry](https://linkedin.com/in/sushruth-sastry) | [github.com/sushruth](https://github.com/sushruth)
