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
 * Main CLI entry point for syncing career_profile.json to LaTeX sections
 */
const main = async () => {
	console.log("Syncing career profile to LaTeX files...");

	// 1. Ensure environment is ready
	ensureSectionsDirectory();

	// 2. Load data
	const careerProfile = readCareerProfile();

	// 3. Convert data to LaTeX strings
	const [
		headerLaTeX,
		experienceLaTeX,
		educationLaTeX,
		skillsLaTeX,
		objectiveLaTeX,
		publicationsLaTeX,
	] = await Promise.all([
		compileTemplate("header", careerProfile.personal_info),
		compileArrayEntriesToLaTeX("experience", careerProfile.experience),
		compileArrayEntriesToLaTeX("education", careerProfile.education),
		compileTemplate("skills", { skills: careerProfile.skills }),
		compileTemplate("objective", { summary: careerProfile.summary }),
		compileTemplate("publications", {
			publications: careerProfile.publications,
		}),
	]);

	// 4. Write to files
	writeLaTeXSections(
		headerLaTeX,
		experienceLaTeX,
		educationLaTeX,
		skillsLaTeX,
		objectiveLaTeX,
		publicationsLaTeX,
	);

	console.log("LaTeX sync completed successfully!");
};

export { main };
