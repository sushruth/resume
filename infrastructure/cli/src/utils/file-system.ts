import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname, resolve } from "path";
import { CLI_CONFIG } from "../config";
import type { CareerProfile } from "../sync.types";
import { sanitizeObjectForLaTeX } from "./converters";
import { LaTeXSection } from "../sync-latex";
import { OutputFileNames, TemplateFileNames } from "../file-names";

/**
 * Ensures the output directory for LaTeX sections exists
 */
export const ensureSectionsDirectory = (): void => {
	if (!existsSync(CLI_CONFIG.LATEX_SECTIONS_PATH)) {
		mkdirSync(CLI_CONFIG.LATEX_SECTIONS_PATH, { recursive: true });
	}
};

/**
 * Reads and parses the careerProfile.json file (returns raw, unsanitized data)
 */
export const readCareerProfile = (): CareerProfile => {
	try {
		const rawData = readFileSync(CLI_CONFIG.CAREER_PROFILE_PATH, "utf8");
		const parsedData = JSON.parse(rawData) as CareerProfile;
		return parsedData;
	} catch (error) {
		console.error(
			`[E002] Failed to read career profile: ${(error as Error).message}`,
		);
		process.exit(1);
	}
};

/**
 * Helper to write content to a file, ensuring directory exists
 */
const writeFile = (path: string, content: string): void => {
	try {
		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(path, content.trim(), "utf8");
		console.log(`Updated LaTeX file: ${path}`);
	} catch (error) {
		console.error(
			`[E003] Failed to write file ${path}: ${(error as Error).message}`,
		);
	}
};

/**
 * Validates that a template file exists
 */
export const validateTemplatePath = (
	templateFileName: TemplateFileNames,
): string => {
	const templatePath = resolve(__dirname, "../templates", templateFileName);
	if (!existsSync(templatePath)) {
		throw new Error(
			`[E004] Template ${templateFileName} not found at ${templatePath} (validation failed)`,
		);
	}
	return templatePath;
};

export const writeLaTeXSections = (
	sections: Record<LaTeXSection, string>,
): void => {
	const fileMap: Record<LaTeXSection, OutputFileNames> = {
		[LaTeXSection.HEADER]: OutputFileNames.HEADER,
		[LaTeXSection.EXPERIENCE]: OutputFileNames.EXPERIENCE,
		[LaTeXSection.EDUCATION]: OutputFileNames.EDUCATION,
		[LaTeXSection.SKILLS]: OutputFileNames.SKILLS,
		[LaTeXSection.OBJECTIVE]: OutputFileNames.OBJECTIVE,
		[LaTeXSection.PUBLICATIONS]: OutputFileNames.PUBLICATIONS,
	};

	Object.entries(fileMap).forEach(([section, fileName]) => {
		writeFile(
			join(CLI_CONFIG.LATEX_SECTIONS_PATH, fileName),
			sections[section as LaTeXSection],
		);
	});
};
