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

### How to Update the Resume

This project is designed for a straightforward, data-centric workflow. To update the resume, simply follow these steps:

1.  **Edit the Single Source of Truth:**  
    Open `career_profile.json`. This file contains all your career data—experience, skills, contact information, etc. Make any changes directly in this file.

2.  **Synchronize Your Data:**  
    Run the sync command from the `/cli` directory. The engine will read your updated JSON and regenerate the LaTeX section files.
    ```bash
    cd cli
    bun run sync
    ```

3.  **Compile the PDF:**  
    Open the root `resume.tex` file in a LaTeX editor (like VS Code with the LaTeX Workshop extension) and compile it to generate the updated `resume.pdf`.

4.  **Create a New Release (Optional):**  
    The CI/CD workflow will automatically create a new release with the updated PDF every time you push to the `main` branch.

---

**Sushruth Sastry**  
[linkedin.com/in/sushruth-sastry](https://linkedin.com/in/sushruth-sastry) | [github.com/sushruth](https://github.com/sushruth)