import { compileJsLatexFile } from "jslatex";
import ejs from "ejs";
import { readFileSync } from "fs";
import { validateTemplatePath } from "./file-system";
import { TemplateFileNames } from "../file-names";
import type {
  ExperienceEntry,
  EducationEntry,
  Skills,
  PersonalInfo,
  PublicationEntry,
  WorkEntry,
} from "../sync.types";

/**
 * Represents a role within a grouped employer entry
 */
export type GroupedRole = {
  position?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
};

/**
 * Represents a grouped employer with multiple roles, or a single ungrouped entry
 */
export type GroupedWorkEntry =
  | {
      name?: string;
      location?: string;
      dateRange?: string;
      roles?: GroupedRole[];
    }
  | WorkEntry;

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
export const compileTemplateHTML = (
  templateName: TemplateFileNames,
  data: Record<string, unknown>,
): string => {
  const templatePath = validateTemplatePath(templateName);
  const templateContent = readFileSync(templatePath, "utf8");
  try {
    const result = ejs.render(templateContent, data);
    return result;
  } catch (e) {
    console.log("error:", e);
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

/**
 * Groups work entries by employer name.
 * Entries with the same `name` field are grouped together with multiple roles.
 * Entries with unique names remain ungrouped (passed through as-is).
 */
export const groupWorkEntriesByEmployer = (
  entries: WorkEntry[],
): GroupedWorkEntry[] => {
  const employerMap = new Map<string, WorkEntry[]>();
  const insertionOrder: string[] = [];

  // Group entries by employer name, preserving first-seen order
  for (const entry of entries) {
    const key = entry.name || "";
    if (!employerMap.has(key)) {
      employerMap.set(key, []);
      insertionOrder.push(key);
    }
    employerMap.get(key)!.push(entry);
  }

  // Convert to grouped format
  const result: GroupedWorkEntry[] = [];

  for (const employerName of insertionOrder) {
    const employerEntries = employerMap.get(employerName)!;

    if (employerEntries.length === 1) {
      // Single entry - pass through as-is (ungrouped)
      result.push(employerEntries[0]);
    } else {
      // Multiple entries - group them
      const roles: GroupedRole[] = employerEntries.map((entry) => ({
        position: entry.position,
        startDate: entry.startDate,
        endDate: entry.endDate,
        summary: entry.summary,
        highlights: entry.highlights,
      }));

      // Calculate overall date range (earliest start to latest end)
      const startDates = employerEntries
        .map((e) => e.startDate)
        .filter(Boolean)
        .sort();
      const endDates = employerEntries
        .map((e) => e.endDate)
        .filter(Boolean)
        .sort();

      const earliestStart = startDates[0] || "";
      const latestEnd = endDates[endDates.length - 1] || "";
      const dateRange = `${earliestStart} - ${latestEnd}`;

      // Use location from the first entry (assuming same location for same employer)
      const location = employerEntries[0].location;

      result.push({
        name: employerName,
        location,
        dateRange,
        roles,
      });
    }
  }

  return result;
};

/**
 * Compiles grouped work entries to LaTeX
 */
export const compileGroupedWorkEntriesToLaTeX = async (
  templateName: TemplateFileNames,
  entries: WorkEntry[],
): Promise<string> => {
  const groupedEntries = groupWorkEntriesByEmployer(entries);
  const results = await Promise.all(
    groupedEntries.map(async (group) => {
      return await compileTemplate(templateName, { group });
    }),
  );
  return results.join("\n");
};

/**
 * Compiles grouped work entries to HTML
 */
export const compileGroupedWorkEntriesToHTML = (
  templateName: TemplateFileNames,
  entries: WorkEntry[],
): string => {
  const groupedEntries = groupWorkEntriesByEmployer(entries);
  const results = groupedEntries.map((group) => {
    return compileTemplateHTML(templateName, { group });
  });
  return results.join("\n");
};
