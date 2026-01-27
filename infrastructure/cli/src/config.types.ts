// config.types.ts - Type definitions for resume configuration system

/**
 * Template configuration
 */
interface TemplateConfig {
  /** Theme name (default: 'default') */
  theme: string;
  /** Path to custom templates (default: './templates') */
  customPath?: string;
}

/**
 * Section configuration
 */
interface SectionConfig {
  /** Whether to include this section (default: true) */
  enabled?: boolean;
  /** Custom template path for this section */
  template?: string;
}

/**
 * Sections configuration
 */
interface SectionsConfig {
  /** Ordered list of section IDs */
  order: string[];
  /** Section-specific overrides */
  overrides?: Record<string, SectionConfig>;
}

/**
 * Output configuration
 */
interface OutputConfig {
  /** Directory for generated files (default: '../sections') */
  directory: string;
  /** Whether to clean output directory before generation (default: true) */
  cleanBeforeGenerate: boolean;
}

/**
 * Complete resume configuration
 */
export interface ResumeConfig {
  template: TemplateConfig;
  sections: SectionsConfig;
  output: OutputConfig;
}

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: ResumeConfig = {
  template: {
    theme: "default",
    customPath: "./templates",
  },
  sections: {
    order: ["header", "summary", "experience", "education", "skills"],
  },
  output: {
    directory: "../sections",
    cleanBeforeGenerate: true,
  },
};

/**
 * Type guard for ResumeConfig
 */
export function isResumeConfig(obj: unknown): obj is ResumeConfig {
  if (typeof obj !== "object" || obj === null) return false;
  const config = obj as Record<string, unknown>;

  // Check template
  if (typeof config.template !== "object" || config.template === null)
    return false;
  const template = config.template as Record<string, unknown>;
  if (typeof template.theme !== "string") return false;
  if (
    template.customPath !== undefined &&
    typeof template.customPath !== "string"
  )
    return false;

  // Check sections
  if (typeof config.sections !== "object" || config.sections === null)
    return false;
  const sections = config.sections as Record<string, unknown>;
  if (!Array.isArray(sections.order)) return false;
  if (
    sections.overrides !== undefined &&
    typeof sections.overrides !== "object"
  )
    return false;

  // Check output
  if (typeof config.output !== "object" || config.output === null) return false;
  const output = config.output as Record<string, unknown>;
  if (typeof output.directory !== "string") return false;
  if (typeof output.cleanBeforeGenerate !== "boolean") return false;

  return true;
}

/**
 * Assertion function for ResumeConfig
 */
export function assertResumeConfig(obj: unknown): asserts obj is ResumeConfig {
  if (!isResumeConfig(obj)) {
    throw new Error("Invalid ResumeConfig structure");
  }
}

/**
 * Parse function with type checking
 */
export function parseResumeConfig(jsonString: string): ResumeConfig {
  const parsed = JSON.parse(jsonString);
  assertResumeConfig(parsed);
  return parsed;
}
