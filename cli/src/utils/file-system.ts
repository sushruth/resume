import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname, resolve } from "path";
import { CLI_CONFIG } from "../config";
import type { CareerProfile } from "../sync.types";
import { sanitizeObjectForLaTeX } from "./converters";
import { LaTeXSection } from "../sync-latex";

/**
 * Ensures the output directory for LaTeX sections exists
 */
export const ensureSectionsDirectory = (): void => {
	if (!existsSync(CLI_CONFIG.LATEX_SECTIONS_PATH)) {
		mkdirSync(CLI_CONFIG.LATEX_SECTIONS_PATH, { recursive: true });
	}
};

/**
 * Reads and parses the careerProfile.json file
 */
export const readCareerProfile = (): CareerProfile => {
	try {
		const rawData = readFileSync(CLI_CONFIG.CAREER_PROFILE_PATH, "utf8");
		const parsedData = JSON.parse(rawData) as CareerProfile;
		return sanitizeObjectForLaTeX(parsedData);
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
 * Orchestrates writing all generated LaTeX content to their respective files
 */
export const validateTemplatePath = (templateName: string) => {
	const templatePath = resolve(
		__dirname,
		"../templates",
		`${templateName}.template.ets.tex`,
	);
	if (!existsSync(templatePath)) {
		throw new Error(
			`[E004] Template ${templateName}.template.ets.tex not found at ${templatePath} (validation failed)`,
		);
	}
	return templatePath;
};

export const writeLaTeXSections = (
	sections: Record<LaTeXSection, string>,
): void => {
	writeFile(
		join(CLI_CONFIG.LATEX_SECTIONS_PATH, "_header.tex"),
		sections[LaTeXSection.HEADER],
	);
	writeFile(
		join(CLI_CONFIG.LATEX_SECTIONS_PATH, "experience.tex"),
		sections[LaTeXSection.EXPERIENCE],
	);
	writeFile(
		join(CLI_CONFIG.LATEX_SECTIONS_PATH, "education.tex"),
		sections[LaTeXSection.EDUCATION],
	);
	writeFile(
		join(CLI_CONFIG.LATEX_SECTIONS_PATH, "skills.tex"),
		sections[LaTeXSection.SKILLS],
	);
	writeFile(
		join(CLI_CONFIG.LATEX_SECTIONS_PATH, "objective.tex"),
		sections[LaTeXSection.OBJECTIVE],
	);
	writeFile(
		join(CLI_CONFIG.LATEX_SECTIONS_PATH, "publications.tex"),
		sections[LaTeXSection.PUBLICATIONS],
	);
};
