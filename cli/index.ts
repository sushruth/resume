import { main as syncLaTeXMain } from "./src/sync-latex";
import { program } from "commander";
import { exit } from "process";

/**
 * Bun CLI Entry Point for Resume LaTeX Sync
 * Commands:
 * - sync: Updates LaTeX files from career_profile.json
 * - help: Shows this help message
 */

program
	.name("Resume LaTeX Sync CLI")
	.description(
		"Bun/TypeScript CLI to sync career_profile.json to LaTeX sections",
	)
	.usage("[command]");

program
	.command("sync")
	.description(
		"Updates sections/experience.tex, sections/education.tex, sections/skills.tex from career_profile.json",
	)
	.action(async () => {
		try {
			console.log("=== Starting LaTeX Sync from career_profile.json ===");
			await syncLaTeXMain();
			console.log("=== LaTeX Sync Completed Successfully ===");
			exit(0);
		} catch (error) {
			console.error("=== LaTeX Sync Failed (E001) ===");
			console.error((error as Error).message);
			exit(1);
		}
	});

// Execute CLI when run via Bun
if (import.meta.main) {
	program.parse(process.argv);
}
