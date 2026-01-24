# Resume Sync CLI

This CLI is the automation engine for the [Resume-as-Code](https://github.com/Sushruth-Sastry/resume) project. It functions as the logic layer, reading structured career data from a central JSON file and generating the modular LaTeX files required for the final PDF compilation and a complete HTML resume for web hosting.

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
    - Uses `ejs` to render `.ets.html` templates into HTML sections.
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

The CLI expects `careerProfile.json` to adhere to the **[JSON Resume](https://jsonresume.org/)** standard schema. This is an open-source, community-driven standard for representing resume data in JSON format.

**Schema Reference:** https://jsonresume.org/schema/

#### Primary Sections

- **`basics`**: Personal information and contact details
  - `name`, `label`, `email`, `phone`, `url`, `summary`
  - `location`: Object with `city`, `region`, `countryCode`, etc.
  - `profiles`: Array of social profiles (LinkedIn, GitHub, etc.)
- **`work`**: Array of work experience entries
  - `name` (company), `position`, `location`, `startDate`, `endDate`
  - `summary`, `highlights` (array of accomplishments)
- **`education`**: Array of education entries
  - `institution`, `area` (field of study), `studyType` (degree)
  - `startDate`, `endDate`
- **`skills`**: Array of skill entries
  - `name` (skill category), `keywords` (array of skills)
- **`publications`**: Array of publication entries
  - `name`, `publisher`, `releaseDate`, `url`
- **`projects`**: Array of project entries (optional)
- **`awards`**: Array of awards (optional)
- **`certificates`**: Array of certificates (optional)
- **`languages`**: Array of language proficiencies (optional)
- **`interests`**: Array of interests (optional)
- **`references`**: Array of references (optional)

#### Custom Extensions

JSON Resume allows additional properties. This project includes:

- **`key_differentiators`**: Custom section for principal-level positioning
  - `summary`: Section header
  - `points`: Array of objects with `header` and `detail` fields

**Example structure:**

```json
{
  "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/master/schema.json",
  "basics": {
    "name": "John Doe",
    "label": "Senior Software Engineer",
    "email": "john@example.com",
    "location": {
      "city": "Seattle",
      "region": "WA",
      "countryCode": "US"
    },
    "profiles": [
      {
        "network": "LinkedIn",
        "username": "johndoe",
        "url": "https://linkedin.com/in/johndoe"
      }
    ]
  },
  "work": [
    {
      "name": "Company Inc.",
      "position": "Senior Engineer",
      "startDate": "2020-01",
      "endDate": "Present",
      "highlights": [
        "Led migration to microservices",
        "Reduced build time by 60%"
      ]
    }
  ],
  "skills": [
    {
      "name": "Frontend Engineering",
      "keywords": ["React", "TypeScript", "Webpack"]
    }
  ]
}
```

---

This project was created using `bun init`. [Bun](https://bun.com) is a fast, all-in-one JavaScript runtime.
