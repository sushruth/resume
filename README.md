# Senior Software Engineer Resume Ecosystem (Principal-Level Impact)

This repository houses the source code, data, and automation engine for my professional resume. It is designed with a "Resume-as-Code" philosophy, separating career data from LaTeX presentation to ensure consistency, scalability, and technical rigor.

## 🎯 Strategic Focus
This project demonstrates the transition of a professional narrative from **Senior Software Engineer** to **Principal/Lead Frontend Engineer** by highlighting high-leverage impact and architectural leadership. It showcases expertise in:
- **Frontend Infrastructure & DX:** Architecting monorepos and CI/CD pipelines for 400+ developers.
- **Micro-Frontend (MFE) Architecture:** Scaling enterprise web ecosystems using Module Federation and custom platform tooling.
- **Developer Tooling:** Creating reusable component systems and automation that slash onboarding times from months to weeks.
- **Open Source:** Leading the initiative to open-source core platform components (1FE).

## 🛠 Tech Stack
- **Source of Truth:** `career_profile.json` (Structured career data)
- **Presentation:** LaTeX (Professional, ATS-optimized typesetting)
- **Automation Engine:** Bun + TypeScript (Custom CLI for data synchronization)
- **CLI Framework:** Commander.js
- **Templating:** `jslatex` (Dynamic LaTeX generation)

## 🏗 Architecture
The project follows a clean separation of concerns:
1.  **Data Layer (`career_profile.json`):** Contains all professional experience, metrics, and skills.
2.  **Logic Layer (`/cli`):** A TypeScript-based sync engine that parses the JSON data and generates LaTeX section files.
3.  **Presentation Layer (`/sections`):** Modular LaTeX files (`experience.tex`, `skills.tex`, etc.) that are compiled into the final PDF.

## 🚀 Usage

### Prerequisites
- [Bun](https://bun.sh/) runtime
- A LaTeX distribution (e.g., TeX Live, MiKTeX)

### Syncing Data
To update the LaTeX sections from the JSON source of truth:
```bash
cd cli
bun install
bun index.ts sync
```

### Compiling the Resume
Compile `resume.tex` using your preferred LaTeX compiler (e.g., `pdflatex` or via VS Code LaTeX Workshop).

## 📈 Impact Highlights
- **DocuSign:** Engineered platform enhancements serving **442 developers** across **222 projects**.
- **Microsoft:** Reduced developer onboarding time for the Teams Admin Center from **8 weeks to 1 week**.
- **Scale:** Managed the delivery of **29 component variants** from **16 high-traffic MFEs**, significantly reducing cross-project duplication.

---
**Sushruth Sastry**  
*Senior Software Engineer*  
[LinkedIn](https://linkedin.com/in/sushruth-sastry) | [GitHub](https://github.com/sushruth)