// theme-loader.ts - Theme loader with fallback logic

import { existsSync } from "fs";
import { join } from "path";
import { ThemeLoader, TemplateFormat } from "./theme.types";
import { getTemplateMode } from "./env";
import { loadResumeConfig } from "./config-loader";

/**
 * Implementation of ThemeLoader with fallback chain
 */
export class ThemeLoaderImpl implements ThemeLoader {
  private mode: "legacy" | "theme";
  private userPath?: string;
  private defaultPath: string;
  private legacyPath: string;

  constructor() {
    this.mode = getTemplateMode();
    const config = loadResumeConfig();
    const root = join(__dirname, "../../.."); // Root of the repo

    this.userPath = config?.template.customPath
      ? join(root, config.template.customPath)
      : undefined;
    this.defaultPath = join(root, "infrastructure/templates/default");
    this.legacyPath = join(__dirname, "templates");
  }

  getTemplatePath(section: string, format: TemplateFormat): string {
    const extension = format === "tex" ? "tex" : "html";
    const filename = `${section}.template.ets.${extension}`;

    if (this.mode === "legacy") {
      return join(this.legacyPath, format, filename);
    }

    // Theme mode: user -> default -> legacy
    const candidatePaths = [
      this.userPath ? join(this.userPath, format, filename) : null,
      join(this.defaultPath, format, filename),
      join(this.legacyPath, format, filename),
    ].filter(Boolean) as string[];

    for (const path of candidatePaths) {
      if (existsSync(path)) {
        return path;
      }
    }

    throw new Error(
      `Template not found for section "${section}" in format "${format}". Searched paths: ${candidatePaths.join(", ")}`
    );
  }
}
