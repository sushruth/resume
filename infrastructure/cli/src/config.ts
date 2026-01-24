import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { InputFileNames } from "./file-names";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CLI_CONFIG = {
	CAREER_PROFILE_PATH: join(
		__dirname,
		`../../../user-content/${InputFileNames.CAREER_PROFILE}`,
	),
	LATEX_SECTIONS_PATH: join(__dirname, "../../resume/sections"),
} as const;
