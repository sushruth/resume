/**
 * Strictly typed file names and paths used throughout the CLI.
 * This module serves as a single source of truth for all hardcoded filenames.
 */

export enum InputFileNames {
	CAREER_PROFILE = "careerProfile.json",
}

export enum OutputFileNames {
	HEADER = "_header.tex",
	EXPERIENCE = "experience.tex",
	EDUCATION = "education.tex",
	SKILLS = "skills.tex",
	OBJECTIVE = "objective.tex",
	PUBLICATIONS = "publications.tex",
}

export enum TemplateFileNames {
	HEADER = "header.template.ets.tex",
	EXPERIENCE = "experience.template.ets.tex",
	EDUCATION = "education.template.ets.tex",
	SKILLS = "skills.template.ets.tex",
	OBJECTIVE = "objective.template.ets.tex",
	PUBLICATIONS = "publications.template.ets.tex",
}

/**
 * Maps LaTeX sections to their output filenames
 */
export const SECTION_FILE_MAP: Record<string, OutputFileNames> = {
	HEADER: OutputFileNames.HEADER,
	EXPERIENCE: OutputFileNames.EXPERIENCE,
	EDUCATION: OutputFileNames.EDUCATION,
	SKILLS: OutputFileNames.SKILLS,
	OBJECTIVE: OutputFileNames.OBJECTIVE,
	PUBLICATIONS: OutputFileNames.PUBLICATIONS,
} as const;
