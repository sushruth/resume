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
import { writeFileSync } from "fs";
import { join } from "path";
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
	const careerProfile = readCareerProfile();

	// 3. Convert data to LaTeX strings
	const sectionPromises: Promise<[LaTeXSection, string]>[] = [
		compileTemplate(TemplateFileNames.HEADER, careerProfile.personal_info).then(
			(content) => [LaTeXSection.HEADER, content],
		),
		compileArrayEntriesToLaTeX(
			TemplateFileNames.EXPERIENCE,
			careerProfile.experience,
		).then((content) => [LaTeXSection.EXPERIENCE, content]),
		compileArrayEntriesToLaTeX(
			TemplateFileNames.EDUCATION,
			careerProfile.education,
		).then((content) => [LaTeXSection.EDUCATION, content]),
		compileTemplate(TemplateFileNames.SKILLS, {
			skills: careerProfile.skills,
		}).then((content) => [LaTeXSection.SKILLS, content]),
		compileTemplate(TemplateFileNames.OBJECTIVE, {
			summary: careerProfile.summary,
		}).then((content) => [LaTeXSection.OBJECTIVE, content]),
		compileArrayEntriesToLaTeX(
			TemplateFileNames.PUBLICATIONS,
			careerProfile.publications,
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
		[HTMLSection.HEADER]: compileTemplateHTML(TemplateFileNames.HEADER_HTML, careerProfile.personal_info),
		[HTMLSection.EXPERIENCE]: compileArrayEntriesToHTML(
			TemplateFileNames.EXPERIENCE_HTML,
			careerProfile.experience,
		),
		[HTMLSection.EDUCATION]: compileArrayEntriesToHTML(
			TemplateFileNames.EDUCATION_HTML,
			careerProfile.education,
		),
		[HTMLSection.SKILLS]: compileTemplateHTML(TemplateFileNames.SKILLS_HTML, {
			skills: careerProfile.skills,
		}),
		[HTMLSection.OBJECTIVE]: compileTemplateHTML(TemplateFileNames.OBJECTIVE_HTML, {
			summary: careerProfile.summary,
		}),
		[HTMLSection.PUBLICATIONS]: compileArrayEntriesToHTML(
			TemplateFileNames.PUBLICATIONS_HTML,
			careerProfile.publications,
		),
	};

	console.log('HTML sections:', htmlSectionsMap);

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
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            margin: 2em;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }
        h1 { font-size: 2em; }
        h2 { font-size: 1.5em; margin-top: 1em; }
        ul { margin: 0.5em 0; }
        table { width: 100%; }
        a { color: #007acc; }
    </style>
</head>
<body>
    ${sections[HTMLSection.OBJECTIVE]}
    ${sections[HTMLSection.HEADER]}
    <h2>Experience</h2>
    ${sections[HTMLSection.EXPERIENCE]}
    <h2>Education</h2>
    ${sections[HTMLSection.EDUCATION]}
    <h2>Skills</h2>
    ${sections[HTMLSection.SKILLS]}
    <h2>Publications</h2>
    ${sections[HTMLSection.PUBLICATIONS]}
</body>
</html>`;
};

/**
 * Writes the HTML index file
 */
const writeHTMLIndex = (content: string) => {
	const outputPath = join(process.cwd(), "../resume", OutputFileNames.HTML_INDEX);
	writeFileSync(outputPath, content.trim(), "utf8");
	console.log(`Updated HTML file: ${outputPath}`);
};

export { main };
