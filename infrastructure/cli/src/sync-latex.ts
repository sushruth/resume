import {
  compileTemplate,
  compileArrayEntriesToLaTeX,
  compileTemplateHTML,
  compileArrayEntriesToHTML,
  compileGroupedWorkEntriesToLaTeX,
  compileGroupedWorkEntriesToHTML,
} from "./utils/converters";
import {
  readCareerProfile,
  writeLaTeXSections,
  ensureSectionsDirectory,
} from "./utils/file-system";
import { writeFileSync, readFileSync } from "fs";
import { join, resolve } from "path";
import { TemplateFileNames, OutputFileNames } from "./file-names";
import { loadResumeConfig } from "./config-loader";
import { getTemplateMode } from "./env";
import { ThemeLoaderImpl } from "./theme-loader";

/**
 * Enum for LaTeX section names
 */
export const enum LaTeXSection {
  HEADER = "header",
  EXPERIENCE = "experience",
  EDUCATION = "education",
  SKILLS = "skills",
  OBJECTIVE = "objective",
  PUBLICATIONS = "publications",
}

/**
 * Enum for HTML section names
 */
export const enum HTMLSection {
  HEADER = "header",
  EXPERIENCE = "experience",
  EDUCATION = "education",
  SKILLS = "skills",
  OBJECTIVE = "objective",
  PUBLICATIONS = "publications",
}

/**
 * Main CLI entry point for syncing careerProfile.json to LaTeX sections
 */
const main = async () => {
  const templateMode = getTemplateMode();
  console.log(`Template mode: ${templateMode}`);
  const loader = templateMode === "theme" ? new ThemeLoaderImpl() : null;
  const getTemplatePath = (section: string, format: "tex" | "html"): string => {
    if (templateMode === "legacy") {
      const extension = format === "tex" ? "tex" : "html";
      return join(
        __dirname,
        "templates",
        format,
        `${section}.template.ets.${extension}`,
      );
    } else {
      return loader!.getTemplatePath(section, format);
    }
  };
  console.log("Syncing career profile to LaTeX files...");

  // 1. Load config
  const config = loadResumeConfig();
  console.log(
    config
      ? "Using config from resume.config.json"
      : "No config found, using legacy behavior",
  );

  // 2. Ensure environment is ready
  ensureSectionsDirectory();

  // 3. Load data
  const resume = readCareerProfile();

  // 4. Determine section order
  const defaultOrder = [
    "header",
    "objective",
    "experience",
    "education",
    "skills",
    "publications",
  ];
  const sectionOrder = config
    ? config.sections.order.map((s) => (s === "summary" ? "objective" : s))
    : defaultOrder;

  // 5. Define LaTeX compilers
  const latexCompilers: Record<string, () => Promise<string>> = {
    header: () =>
      compileTemplate(getTemplatePath("header", "tex"), resume.basics || {}),
    objective: () =>
      compileTemplate(getTemplatePath("objective", "tex"), {
        summary: resume.basics?.summary || "",
      }),
    experience: () =>
      compileGroupedWorkEntriesToLaTeX(
        getTemplatePath("experience", "tex"),
        resume.work || [],
      ),
    education: () =>
      compileArrayEntriesToLaTeX(
        getTemplatePath("education", "tex"),
        resume.education || [],
      ),
    skills: () =>
      compileTemplate(getTemplatePath("skills", "tex"), {
        skills: resume.skills || [],
      }),
    publications: () =>
      compileArrayEntriesToLaTeX(
        getTemplatePath("publications", "tex"),
        resume.publications || [],
      ),
  };

  // 6. Convert data to LaTeX strings
  const sectionPromises = sectionOrder
    .filter((section) => latexCompilers[section])
    .map((section) =>
      latexCompilers[section]().then((content) => [
        section as LaTeXSection,
        content,
      ]),
    );

  const sections = await Promise.all(sectionPromises);
  const latexSections = Object.fromEntries(sections) as Record<
    LaTeXSection,
    string
  >;

  // 7. Write LaTeX files
  writeLaTeXSections(latexSections);

  // 8. Define HTML compilers
  const htmlCompilers: Record<string, () => string> = {
    header: () =>
      compileTemplateHTML(
        getTemplatePath("header", "html"),
        resume.basics || {},
      ),
    objective: () =>
      compileTemplateHTML(getTemplatePath("objective", "html"), {
        summary: resume.basics?.summary || "",
      }),
    experience: () =>
      compileGroupedWorkEntriesToHTML(
        getTemplatePath("experience", "html"),
        resume.work || [],
      ),
    education: () =>
      compileArrayEntriesToHTML(
        getTemplatePath("education", "html"),
        resume.education || [],
      ),
    skills: () =>
      compileTemplateHTML(getTemplatePath("skills", "html"), {
        skills: resume.skills || [],
      }),
    publications: () =>
      compileArrayEntriesToHTML(
        getTemplatePath("publications", "html"),
        resume.publications || [],
      ),
  };

  // 9. Generate HTML sections
  const htmlSectionsMap: Record<HTMLSection, string> = {};
  for (const section of sectionOrder) {
    if (htmlCompilers[section]) {
      htmlSectionsMap[section as HTMLSection] = htmlCompilers[section]();
    }
  }

  // 10. Generate full HTML
  const fullHTML = generateFullHTML(htmlSectionsMap, resume.basics || {});

  // 11. Write HTML file
  writeHTMLIndex(fullHTML);

  console.log("LaTeX and HTML sync completed successfully!");
};

/**
 * Generates the full HTML document from sections
 */
const generateFullHTML = (
  sections: Record<HTMLSection, string>,
  basics: Record<string, unknown>,
): string => {
  // Read the HTML template file
  const templatePath = resolve(process.cwd(), "../resume.html.ejs");
  const template = readFileSync(templatePath, "utf8");

  // Use EJS to render the template with sections
  const ejs = require("ejs");
  const html = ejs.render(template, {
    basics,
    header: sections[HTMLSection.HEADER],
    objective: sections[HTMLSection.OBJECTIVE],
    skills: sections[HTMLSection.SKILLS],
    experience: sections[HTMLSection.EXPERIENCE],
    education: sections[HTMLSection.EDUCATION],
    publications: sections[HTMLSection.PUBLICATIONS],
  });

  return html;
};

/**
 * Writes the HTML index file
 */
const writeHTMLIndex = (content: string) => {
  const outputPath = join(process.cwd(), "..", OutputFileNames.HTML_INDEX);
  writeFileSync(outputPath, content.trim(), "utf8");
};

export { main };
