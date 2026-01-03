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
 * Sanitizes a single string for LaTeX compatibility
 */
export const sanitizeStringForLaTeX = (str: string): string => {
	if (typeof str !== "string") {
		return str;
	}
	return str
		.replace(/\\/g, "\\textbackslash{}")
		.replace(/&/g, "\\&")
		.replace(/%/g, "\\%")
		.replace(/\$/g, "\\$")
		.replace(/#/g, "\\#")
		.replace(/_/g, "\\_")
		.replace(/{/g, "\\{")
		.replace(/}/g, "\\}")
		.replace(/~/g, "\\textasciitilde{}")
		.replace(/\^/g, "\\textasciicircum{}");
};

/**
 * Recursively sanitizes an object's string properties for LaTeX compatibility
 */
export const sanitizeObjectForLaTeX = (obj: any): any => {
	if (typeof obj === "string") {
		return sanitizeStringForLaTeX(obj);
	}
	if (Array.isArray(obj)) {
		return obj.map(sanitizeObjectForLaTeX);
	}
	if (typeof obj === "object" && obj !== null) {
		return Object.fromEntries(
			Object.entries(obj).map(([key, value]) => [
				key,
				sanitizeObjectForLaTeX(value),
			]),
		);
	}
	return obj;
};

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
