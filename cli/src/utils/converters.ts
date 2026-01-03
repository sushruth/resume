import { compileJsLatex } from "jslatex";
import type {
	ExperienceEntry,
	EducationEntry,
	Skills,
	PersonalInfo,
} from "../sync.types";

/**
 * Converts experience entries to LaTeX format using jslatex
 */
export const convertExperienceToLaTeX = async (
	entries: ExperienceEntry[],
): Promise<string> => {
	const results = await Promise.all(
		entries.map(async (entry) => {
			const dateRange = `${entry.start_date} - ${entry.end_date}`;
			const sectionContent = `
\\subsection{{${entry.role} \\hfill ${dateRange}}}
\\subtext{${entry.company} \\hfill ${entry.location}}
\\vspace*{3pt}
${entry.description ? `${entry.description}\n\\vspace*{3pt}` : ""}
\\begin{zitemize}
${entry.highlights.map((highlight) => `\\item ${highlight}`).join("\n")}
\\end{zitemize}
\\vspace*{6pt}
      `;
			return await compileJsLatex({ latex: sectionContent });
		}),
	);
	return results.join("\n");
};

/**
 * Converts education entries to LaTeX format using jslatex
 */
export const convertEducationToLaTeX = async (
	entries: EducationEntry[],
): Promise<string> => {
	const results = await Promise.all(
		entries.map(async (entry) => {
			const sectionContent = `
\\subsection{{${entry.degree} \\hfill ${entry.year}}}
\\subtext{${entry.institution} \\hfill ${entry.location}}
\\vspace*{6pt}
      `;
			return await compileJsLatex({ latex: sectionContent });
		}),
	);
	return results.join("\n");
};

/**
 * Converts skills object to LaTeX format using jslatex
 */
export const convertSkillsToLaTeX = async (skills: Skills): Promise<string> => {
	const results = await Promise.all(
		Object.entries(skills).map(async ([category, items]) => {
			const sectionContent = `
\\subsubsection{${category}}
\\begin{zitemize}
${items.map((item) => `\\item ${item}`).join("\n")}
\\end{zitemize}
\\vspace*{3pt}
      `;
			return await compileJsLatex({ latex: sectionContent });
		}),
	);
	return results.join("\n");
};

/**
 * Converts personal info to LaTeX header format using jslatex
 */
export const convertHeaderToLaTeX = async (
	info: PersonalInfo,
): Promise<string> => {
	const sectionContent = `
\\begin{center}
	\\begin{minipage}[b]{.2\\textwidth}
	\\raggedright
	{\\large ${info.phone}} \\\\
	{${info.location}} \\\\
	\\href{mailto:${info.email}}{${info.email}}
	\\end{minipage}%
	\\begin{minipage}[b]{.6\\textwidth}
	\\centering {\\huge ${info.name}} \\\\
    \\vspace{.7em}
    ${info.title}
	\\end{minipage}%
	\\begin{minipage}[b]{.2\\textwidth}
	\\raggedleft
	\\href{https://github.com/${info.github}}{GitHub: ${info.github}} \\\\
	\\href{https://www.linkedin.com/in/${info.linkedin}}{LinkedIn: ${info.linkedin}}
	\\end{minipage}
\\end{center}
      `;
	return await compileJsLatex({ latex: sectionContent });
};

/**
 * Converts the summary/objective to LaTeX format with structural comments
 */
export const convertObjectiveToLaTeX = async (
	summary: string,
): Promise<string> => {
	const sectionContent = `
%====================
% Objective Statement
%====================

${summary}
`;
	return await compileJsLatex({ latex: sectionContent });
};
