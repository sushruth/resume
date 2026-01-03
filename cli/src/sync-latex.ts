import {
	compileTemplate,
	compileArrayEntriesToLaTeX,
} from "./utils/converters";
import {
	readCareerProfile,
	writeLaTeXSections,
	ensureSectionsDirectory,
} from "./utils/file-system";

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
 * Main CLI entry point for syncing career_profile.json to LaTeX sections
 */
const main = async () => {
	console.log("Syncing career profile to LaTeX files...");

	// 1. Ensure environment is ready
	ensureSectionsDirectory();

	// 2. Load data
	const careerProfile = readCareerProfile();

	// 3. Convert data to LaTeX strings
	const sectionPromises: Promise<[LaTeXSection, string]>[] = [
		compileTemplate(LaTeXSection.HEADER, careerProfile.personal_info).then(
			(content) => [LaTeXSection.HEADER, content],
		),
		compileArrayEntriesToLaTeX(
			LaTeXSection.EXPERIENCE,
			careerProfile.experience,
		).then((content) => [LaTeXSection.EXPERIENCE, content]),
		compileArrayEntriesToLaTeX(
			LaTeXSection.EDUCATION,
			careerProfile.education,
		).then((content) => [LaTeXSection.EDUCATION, content]),
		compileTemplate(LaTeXSection.SKILLS, {
			skills: careerProfile.skills,
		}).then((content) => [LaTeXSection.SKILLS, content]),
		compileTemplate(LaTeXSection.OBJECTIVE, {
			summary: careerProfile.summary,
		}).then((content) => [LaTeXSection.OBJECTIVE, content]),
		compileArrayEntriesToLaTeX(
			LaTeXSection.PUBLICATIONS,
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

	console.log("LaTeX sync completed successfully!");
};

export { main };
