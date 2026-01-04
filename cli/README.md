# Resume Sync CLI

This CLI is the automation engine for the [Resume-as-Code](https://github.com/Sushruth-Sastry/Sushruth-Sastry---Resume-2025) project. It functions as the logic layer, reading structured career data from a central JSON file and generating the modular LaTeX files required for the final PDF compilation.

---

### Core Functionality

The CLI orchestrates a four-step process to sync data to the presentation layer:

1.  **Data Ingestion:** Reads and parses the `career_profile.json` file from the repository root.
2.  **LaTeX Sanitization:** Recursively traverses the data object and sanitizes all string values to escape special LaTeX characters (e.g., `%`, `&`, `_`). This prevents compilation errors and ensures content is rendered correctly.
3.  **Templating:** Uses `jslatex` to dynamically render `.tex` files. For each section of the resume, it combines the corresponding data with a template from the `src/templates` directory.
4.  **File Output:** Writes the generated LaTeX content for each section to the top-level `/sections` directory, making them ready for inclusion in the main `resume.tex` file.

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

The CLI expects `career_profile.json` to adhere to a specific structure. Below is an overview of the primary keys.

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
