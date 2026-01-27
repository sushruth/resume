// config-loader.ts - Load and validate resume configuration with Typia

import { readFileSync } from "fs";
import { join } from "path";
import {
  assertResumeConfig,
  parseResumeConfig,
  DEFAULT_CONFIG,
} from "./config.types";

/**
 * Configuration loading options
 */
interface LoadOptions {
  configPath?: string;
  /**
   * Path to config file (default: '../../../resume.config.json')
   */
  configPath?: string;
  /**
   * Whether to throw errors on validation failure (default: true)
   */
  strict?: boolean;
}

/**
 * Load and validate resume configuration
 */
export function loadResumeConfig(
  options: LoadOptions = {},
): typeof DEFAULT_CONFIG | null {
  const {
    configPath = join(__dirname, "../../../resume.config.json"),
    strict = true,
  } = options;

  try {
    // Read raw config file
    const rawConfig = readFileSync(configPath, "utf-8");

    // Parse and validate
    const config = parseResumeConfig(rawConfig);

    // Merge with defaults for optional fields
    return {
      ...DEFAULT_CONFIG,
      ...config,
      template: {
        ...DEFAULT_CONFIG.template,
        ...config.template,
      },
      sections: {
        ...DEFAULT_CONFIG.sections,
        ...config.sections,
        overrides: {
          ...DEFAULT_CONFIG.sections.overrides,
          ...config.sections.overrides,
        },
      },
      output: {
        ...DEFAULT_CONFIG.output,
        ...config.output,
      },
    };
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      // File not found - return null for legacy fallback
      return null;
    }

    if (strict) {
      throw new Error(
        `Invalid resume config: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    return null;
  }
}

/**
 * Runtime validation of loaded config
 */
export function validateResumeConfig(
  config: unknown,
): asserts config is typeof DEFAULT_CONFIG {
  assertResumeConfig(config);
}
