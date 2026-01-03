import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { CLI_CONFIG } from "../config";
import type { CareerProfile } from "../sync.types";

/**
 * Ensures the output directory for LaTeX sections exists
 */
export const ensureSectionsDirectory = (): void => {
	if (!existsSync(CLI_CONFIG.LATEX_SECTIONS_PATH)) {
		mkdirSync(CLI_CONFIG.LATEX_SECTIONS_PATH, { recursive: true });
	}
};

/**
 * Reads and parses the career_profile.json file
 */
export const readCareerProfile = (): CareerProfile => {
	try {
		const rawData = readFileSync(CLI_CONFIG.CAREER_PROFILE_PATH, "utf8");
		return JSON.parse(rawData) as CareerProfile;
	} catch (error) {
		console.error(`Failed to read career profile: ${(error as Error).message}`);
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
		console.error(`Failed to write file ${path}: ${(error as Error).message}`);
	}
};

/**
 * Orchestrates writing all generated LaTeX content to their respective files
 */
export const writeLaTeXSections = (
	headerContent: string,
	experienceContent: string,
	educationContent: string,
	skillsContent: string,
	objectiveContent: string,
): void => {
	writeFile(join(CLI_CONFIG.LATEX_SECTIONS_PATH, "_header.tex"), headerContent);
	writeFile(
		join(CLI_CONFIG.LATEX_SECTIONS_PATH, "experience.tex"),
		experienceContent,
	);
	writeFile(
		join(CLI_CONFIG.LATEX_SECTIONS_PATH, "education.tex"),
		educationContent,
	);
	writeFile(join(CLI_CONFIG.LATEX_SECTIONS_PATH, "skills.tex"), skillsContent);
	writeFile(
		join(CLI_CONFIG.LATEX_SECTIONS_PATH, "objective.tex"),
		objectiveContent,
	);
};
