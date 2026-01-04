import { join } from "path";
import { InputFileNames } from "./file-names";

export const CLI_CONFIG = {
	CAREER_PROFILE_PATH: join(
		import.meta.dir,
		`../../resume/${InputFileNames.CAREER_PROFILE}`,
	),
	LATEX_SECTIONS_PATH: join(import.meta.dir, "../../resume/sections"),
} as const;
