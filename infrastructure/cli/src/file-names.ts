/**
 * Strictly typed file names and paths used throughout the CLI.
 * This module serves as a single source of truth for all hardcoded filenames.
 */

export enum InputFileNames {
  CAREER_PROFILE = "careerProfile.json",
}

export enum OutputFileNames {
  HEADER = "_header.tex",
  EXPERIENCE = "experience.tex",
  EDUCATION = "education.tex",
  SKILLS = "skills.tex",
  OBJECTIVE = "objective.tex",
  PUBLICATIONS = "publications.tex",
  HTML_INDEX = "index.html",
}

export enum TemplateFileNames {
  // LaTeX templates (in tex/ subdirectory)
  HEADER = "tex/header.template.ets.tex",
  EXPERIENCE = "tex/experience.template.ets.tex",
  EDUCATION = "tex/education.template.ets.tex",
  SKILLS = "tex/skills.template.ets.tex",
  OBJECTIVE = "tex/objective.template.ets.tex",
  PUBLICATIONS = "tex/publications.template.ets.tex",
  // HTML templates (in html/ subdirectory)
  HEADER_HTML = "html/header.template.ets.html",
  EXPERIENCE_HTML = "html/experience.template.ets.html",
  EDUCATION_HTML = "html/education.template.ets.html",
  SKILLS_HTML = "html/skills.template.ets.html",
  OBJECTIVE_HTML = "html/objective.template.ets.html",
  PUBLICATIONS_HTML = "html/publications.template.ets.html",
}

/**
 * Maps LaTeX sections to their output filenames
 */
export const SECTION_FILE_MAP: Record<string, OutputFileNames> = {
  HEADER: OutputFileNames.HEADER,
  EXPERIENCE: OutputFileNames.EXPERIENCE,
  EDUCATION: OutputFileNames.EDUCATION,
  SKILLS: OutputFileNames.SKILLS,
  OBJECTIVE: OutputFileNames.OBJECTIVE,
  PUBLICATIONS: OutputFileNames.PUBLICATIONS,
} as const;
