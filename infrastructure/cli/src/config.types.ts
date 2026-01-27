// config.types.ts - Type definitions for resume configuration system with Typia validation

import typia from "typia";

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
export const DEFAULT_CONFIG: ResumeConfig = typia.createAssert<ResumeConfig>().({
    template: {
        theme: "default",
        customPath: "./templates"
    },
    sections: {
        order: ["header", "summary", "experience", "education", "skills"]
    },
    output: {
        directory: "../sections",
        cleanBeforeGenerate: true
    }
});

/**
 * Type guard for ResumeConfig using Typia
 */
export const isResumeConfig = typia.createIs<ResumeConfig>();

/**
 * Assertion function for ResumeConfig using Typia
 */
export const assertResumeConfig = typia.createAssert<ResumeConfig>();

/**
 * JSON schema for ResumeConfig
 */
export const ResumeConfigJsonSchema = typia.json.application<[ResumeConfig]>();

/**
 * Stringify function with type checking
 */
export const stringifyResumeConfig = typia.json.createStringify<ResumeConfig>();

/**
 * Parse function with type checking
 */
export const parseResumeConfig = typia.json.createAssertParse<ResumeConfig>();
