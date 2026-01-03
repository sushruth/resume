import {
	convertHeaderToLaTeX,
	convertExperienceToLaTeX,
	convertEducationToLaTeX,
	convertSkillsToLaTeX,
	convertObjectiveToLaTeX,
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
	] = await Promise.all([
		convertHeaderToLaTeX(careerProfile.personal_info),
		convertExperienceToLaTeX(careerProfile.experience),
		convertEducationToLaTeX(careerProfile.education),
		convertSkillsToLaTeX(careerProfile.skills),
		convertObjectiveToLaTeX(careerProfile.summary),
	]);

	// 4. Write to files
	writeLaTeXSections(
		headerLaTeX,
		experienceLaTeX,
		educationLaTeX,
		skillsLaTeX,
		objectiveLaTeX,
	);

	console.log("LaTeX sync completed successfully!");
};

export { main };
