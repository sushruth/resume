import { compileJsLatexFile } from "jslatex";
import { validateTemplatePath } from "./file-system";
import type {
	ExperienceEntry,
	EducationEntry,
	Skills,
	PersonalInfo,
	PublicationEntry,
} from "../sync.types";

/**
 * Reusable template compiler for single data objects
 */
export const compileTemplate = async (
	templateName: string,
	data: Record<string, unknown>,
): Promise<string> => {
	const templatePath = validateTemplatePath(templateName);
	return await compileJsLatexFile({
		filePath: templatePath,
		etsOptions: { data },
		projectBaseUrl: import.meta.url,
	});
};

/**
 * Reusable template compiler for array entries (maps each entry to template)
 */
export const compileArrayEntriesToLaTeX = async <T>(
	templateName: string,
	entries: T[],
): Promise<string> => {
	const results = await Promise.all(
		entries.map(async (entry) => {
			return await compileTemplate(templateName, { entry });
		}),
	);
	return results.join("\n");
};
