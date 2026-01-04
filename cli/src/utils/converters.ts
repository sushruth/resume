import { compileJsLatexFile } from "jslatex";
import ejs from 'ejs';
import { readFileSync } from 'fs';
import { validateTemplatePath } from "./file-system";
import { TemplateFileNames } from "../file-names";
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
 * Reusable template compiler for single data objects (LaTeX with sanitization)
 */
export const compileTemplate = async (
	templateName: TemplateFileNames,
	data: Record<string, unknown>,
): Promise<string> => {
	const templatePath = validateTemplatePath(templateName);
	const sanitizedData = sanitizeObjectForLaTeX(data);
	return await compileJsLatexFile({
		filePath: templatePath,
		etsOptions: { data: sanitizedData },
		projectBaseUrl: import.meta.url,
	});
};

/**
 * Reusable template compiler for HTML (no sanitization)
 */
export const compileTemplateHTML = async (
	templateName: TemplateFileNames,
	data: Record<string, unknown>,
): string => {
	const templatePath = validateTemplatePath(templateName);
	const templateContent = readFileSync(templatePath, 'utf8');
	console.log(`Compiling ${templateName}`, data);
	try {
		const result = ejs.render(templateContent, data);
		console.log('result preview:', result.substring(0, 100));
		return result;
	} catch (e) {
		console.log('error:', e);
		return `Error: ${(e as Error).message}`;
	}
};

/**
 * Reusable template compiler for array entries (maps each entry to template)
 */
export const compileArrayEntriesToLaTeX = async <T>(
	templateName: TemplateFileNames,
	entries: T[],
): Promise<string> => {
	const results = await Promise.all(
		entries.map(async (entry) => {
			return await compileTemplate(templateName, { entry });
		}),
	);
	return results.join("\n");
};

/**
 * Reusable template compiler for array entries (HTML)
 */
export const compileArrayEntriesToHTML = <T>(
	templateName: TemplateFileNames,
	entries: T[],
): string => {
	const results = entries.map((entry) => {
		return compileTemplateHTML(templateName, { entry });
	});
	return results.join("\n");
};
