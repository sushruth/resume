import { join } from "path";

export const CLI_CONFIG = {
	CAREER_PROFILE_PATH: join(import.meta.dir, "../../resume/careerProfile.json"),
	LATEX_SECTIONS_PATH: join(import.meta.dir, "../../resume/sections"),
} as const;
