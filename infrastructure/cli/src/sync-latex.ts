import {
	compileTemplate,
	compileArrayEntriesToLaTeX,
	compileTemplateHTML,
	compileArrayEntriesToHTML,
} from "./utils/converters";
import {
	readCareerProfile,
	writeLaTeXSections,
	ensureSectionsDirectory,
} from "./utils/file-system";
import { writeFileSync, readFileSync } from "fs";
import { join, resolve } from "path";
import { TemplateFileNames, OutputFileNames } from "./file-names";

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
	console.log("Syncing career profile to LaTeX files...");

	// 1. Ensure environment is ready
	ensureSectionsDirectory();

	// 2. Load data
	const resume = readCareerProfile();

	// 3. Convert data to LaTeX strings
	const sectionPromises: Promise<[LaTeXSection, string]>[] = [
		compileTemplate(TemplateFileNames.HEADER, resume.basics || {}).then(
			(content) => [LaTeXSection.HEADER, content],
		),
		compileArrayEntriesToLaTeX(
			TemplateFileNames.EXPERIENCE,
			resume.work || [],
		).then((content) => [LaTeXSection.EXPERIENCE, content]),
		compileArrayEntriesToLaTeX(
			TemplateFileNames.EDUCATION,
			resume.education || [],
		).then((content) => [LaTeXSection.EDUCATION, content]),
		compileTemplate(TemplateFileNames.SKILLS, {
			skills: resume.skills || [],
		}).then((content) => [LaTeXSection.SKILLS, content]),
		compileTemplate(TemplateFileNames.OBJECTIVE, {
			summary: resume.basics?.summary || "",
		}).then((content) => [LaTeXSection.OBJECTIVE, content]),
		compileArrayEntriesToLaTeX(
			TemplateFileNames.PUBLICATIONS,
			resume.publications || [],
		).then((content) => [LaTeXSection.PUBLICATIONS, content]),
	];

	const sections = await Promise.all(sectionPromises);
	const latexSections = Object.fromEntries(sections) as Record<
		LaTeXSection,
		string
	>;

	// 4. Write to files
	writeLaTeXSections(latexSections);

	// 5. Generate HTML
	const htmlSectionsMap: Record<HTMLSection, string> = {
		[HTMLSection.HEADER]: compileTemplateHTML(
			TemplateFileNames.HEADER_HTML,
			resume.basics || {},
		),
		[HTMLSection.EXPERIENCE]: compileArrayEntriesToHTML(
			TemplateFileNames.EXPERIENCE_HTML,
			resume.work || [],
		),
		[HTMLSection.EDUCATION]: compileArrayEntriesToHTML(
			TemplateFileNames.EDUCATION_HTML,
			resume.education || [],
		),
		[HTMLSection.SKILLS]: compileTemplateHTML(TemplateFileNames.SKILLS_HTML, {
			skills: resume.skills || [],
		}),
		[HTMLSection.OBJECTIVE]: compileTemplateHTML(
			TemplateFileNames.OBJECTIVE_HTML,
			{
				summary: resume.basics?.summary || "",
			},
		),
		[HTMLSection.PUBLICATIONS]: compileArrayEntriesToHTML(
			TemplateFileNames.PUBLICATIONS_HTML,
			resume.publications || [],
		),
	};

	// Generate full HTML
	const fullHTML = generateFullHTML(htmlSectionsMap);

	// Write HTML file
	writeHTMLIndex(fullHTML);

	console.log("LaTeX and HTML sync completed successfully!");
};

/**
 * Generates the full HTML document from sections
 */
const generateFullHTML = (sections: Record<HTMLSection, string>): string => {
	// Read the HTML template file
	const templatePath = resolve(process.cwd(), "../resume.html.ejs");
	const template = readFileSync(templatePath, "utf8");
	
	// Use EJS to render the template with sections
	const ejs = require("ejs");
	const html = ejs.render(template, {
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
	const outputPath = join(
		process.cwd(),
		"..",
		OutputFileNames.HTML_INDEX,
	);
	writeFileSync(outputPath, content.trim(), "utf8");
};

export { main };
