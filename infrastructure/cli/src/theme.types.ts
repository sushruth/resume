// theme.types.ts - Type definitions for theme loading system

export type TemplateFormat = "tex" | "html";

/**
 * Interface for loading template paths with fallback logic
 */
export interface ThemeLoader {
  /**
   * Get the path to a template file for a given section and format
   * @param section - The resume section (e.g., 'header', 'experience')
   * @param format - The template format ('tex' or 'html')
   * @returns The full path to the template file
   */
  getTemplatePath(section: string, format: TemplateFormat): string;
}
