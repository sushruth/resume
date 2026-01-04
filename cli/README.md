# Resume Sync CLI

This CLI is the automation engine for the [Resume-as-Code](https://github.com/Sushruth-Sastry/Sushruth-Sastry---Resume-2025) project. It functions as the logic layer, reading structured career data from a central JSON file and generating the modular LaTeX files required for the final PDF compilation and a complete HTML resume for web hosting.

---

### Core Functionality

The CLI orchestrates data synchronization to both LaTeX (PDF) and HTML (web) presentation layers:

1.  **Data Ingestion:** Reads and parses the `careerProfile.json` file from the repository root.
2.  **LaTeX Path:**
    - Sanitizes data for LaTeX compatibility (escapes special characters).
    - Uses `jslatex` to render `.ets.tex` templates into LaTeX section files.
    - Outputs to `resume/sections/` for PDF compilation.
3.  **HTML Path:**
    - Uses unsanitized data for HTML.
    - Uses `jslatex` to render `.ets.html` templates into HTML sections.
    - Combines into complete `resume/index.html` for web hosting.

### Usage

The CLI is designed to be run from its directory.

1.  **Prerequisites:** Ensure [Bun](https://bun.sh/) is installed.
2.  **Install Dependencies:**
    ```bash
    bun install
    ```
3.  **Run the Sync Process:**
    ```bash
    bun run sync
    ```
    This command executes the `index.ts sync` script, which runs the end-to-end data synchronization process.

### Data Schema

The CLI expects `careerProfile.json` to adhere to a specific structure. Below is an overview of the primary keys.

-   **`personal_info`**: An object containing contact details (name, email, phone, etc.).
-   **`summary`**: A string containing the top-level professional summary.
-   **`experience`**: An array of objects, each detailing a professional role.
-   **`education`**: An array of objects detailing academic history.
-   **`publications`**: An array of objects for any published works or articles.
-   **`skills`**: An array of skill category objects. Each object has a `category` (string) and an `items` (string[]) list.

    **Example `skills` structure:**
    ```json
    "skills": [
        {
            "category": "Architecture & Infrastructure",
            "items": [
                "Micro-Frontends (Module Federation)",
                "Monorepo Architecture (NX)"
            ]
        },
        {
            "category": "Frontend Core",
            "items": [
                "TypeScript (Advanced Patterns)",
                "React (Hooks, Context, Suspense)"
            ]
        }
    ]
    ```

---

This project was created using `bun init`. [Bun](https://bun.com) is a fast, all-in-one JavaScript runtime.
