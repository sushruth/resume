# cli

This CLI utility reads data from `career_profile.json` and generates corresponding LaTeX files for the resume sections.

## Installation

To install dependencies:

```bash
bun install
```

## Usage

To sync the JSON data to LaTeX files:

```bash
bun run index.ts sync
```

## Data Schema

The `career_profile.json` file has the following structure:

-   `personal_info`: An object containing personal details like name, email, phone, etc.
-   `summary`: A string containing the professional summary/objective.
-   `experience`: An array of experience objects, each detailing a job position.
-   `education`: An array of education objects.
-   `publications`: An array of publication objects.
-   `skills`: An array of skill category objects. This was refactored from a key-value map to a more robust structure. Each object in the array should have the following properties:
    -   `category` (string): The name of the skill category (e.g., "Architecture & Infrastructure").
    -   `items` (string[]): A list of skills within that category.

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

This project was created using `bun init` in bun v1.3.4. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
