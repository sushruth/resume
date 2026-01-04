# Sushruth Sastry // Principal-Level Frontend Engineer

This repository is more than the source for my resume—it's a living artifact demonstrating the engineering principles I apply daily: **automation, architectural rigor, and data-driven impact.**

The PDF you're likely here to see is the "production build" of this ecosystem. You can always find the latest version on the [**Releases**](https://github.com/Sushruth-Sastry/Sushruth-Sastry---Resume-2025/releases) page.

---

### The Philosophy: Resume-as-Code

This project treats a professional narrative not as a static document, but as a system to be engineered. By separating structured data (`career_profile.json`) from presentation (`LaTeX`), the entire process is automated, version-controlled, and scalable. This is the same philosophy I apply to build robust, enterprise-wide development platforms.

### The Engine: How It Works

The repository is intentionally architected to demonstrate a clean separation of concerns, mirroring the large-scale systems I've designed.

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Data Layer** | `career_profile.json` | **Single Source of Truth.** All career history, skills, and metrics are managed as structured data. |
| **Logic Layer** | **Bun + TypeScript CLI** (`/cli`) | **Automation Engine.** Parses the JSON data and generates modular LaTeX files for each section. |
| **Presentation Layer** | **LaTeX** (`resume.tex`, `/sections`) | **Typesetting & Assembly.** Compiles the generated sections into a polished, ATS-friendly PDF. |
| **Templating** | `jslatex` | **Dynamic Content.** Enables programmatic generation of LaTeX from the data layer. |

### Core Principles in Practice

This repository is a direct reflection of my approach to engineering leadership.

1.  **Automation & Developer Experience**  
    The existence of the CLI is a testament to my belief in automating toil. The same impulse that led me to build CI/CD pipelines for **400+ developers** at DocuSign is at play here: if a process can be made more efficient and less error-prone through code, it should be.

2.  **Architectural Rigor**  
    The project's clean separation of data, logic, and presentation is a microcosm of a scalable software architecture. It demonstrates a commitment to maintainability and clear boundaries, whether designing an enterprise micro-frontend ecosystem or a personal project.

3.  **Impact as a First-Class Citizen**  
    By modeling my career as structured data, I treat professional achievements as a measurable, queryable dataset. This reflects the data-driven approach I take to leadership—defining success by the **onboarding time saved**, the **duplication reduced**, and the **developer velocity gained**.

### Running the Build

To generate the PDF from the source of truth yourself:

1.  **Prerequisites:** Ensure [Bun](https://bun.sh/) and a LaTeX distribution (e.g., TeX Live) are installed.
2.  **Install Dependencies:** `cd cli && bun install`
3.  **Sync Data:** `bun run sync`
4.  **Compile PDF:** Compile `resume.tex` using `pdflatex`.

---

**Sushruth Sastry**  
[linkedin.com/in/sushruth-sastry](https://linkedin.com/in/sushruth-sastry) | [github.com/sushruth](https://github.com/sushruth)