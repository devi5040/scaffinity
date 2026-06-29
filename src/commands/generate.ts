import path from "path";
import { GenerateOptions, ScaffoldResult, StructureNode } from "../types";
import chalk from "chalk";
import fs from "fs-extra";

function isFileContent(value: unknown): boolean {
  return (
    typeof value === "string" ||
    value === null ||
    (typeof value === "object" && value != null && "template" in value)
  );
}

function resolveContent(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (
    typeof value === "object" &&
    "template" in (value as Record<string, unknown>)
  ) {
    const v = value as { template: string; options?: Record<string, unknown> };
    return `//Generated from template: ${v.template}\n// Options: ${JSON.stringify(v.options ?? {}, null, 2)}\n`;
  }
  return "";
}

async function processNode(
  node: StructureNode,
  currentPath: string,
  result: ScaffoldResult,
  options: GenerateOptions,
): Promise<void> {
  for (const [key, value] of Object.entries(node)) {
    const fullPath = path.join(currentPath, key);

    if (isFileContent(value)) {
      // It's a file
      if (options.dry) {
        result.created.push(fullPath);
        if (options.verbose) {
          console.log(
            chalk.cyan("  [dry] create file:"),
            chalk.white(fullPath),
          );
        }
      } else {
        try {
          await fs.ensureDir(path.dirname(fullPath));
          if (await fs.pathExists(fullPath)) {
            result.skipped.push(fullPath);
            if (options.verbose)
              console.log(chalk.yellow(" skip:"), chalk.white(fullPath));
          } else {
            await fs.writeFile(fullPath, resolveContent(value), "utf-8");
            result.created.push(fullPath);
            if (options.verbose)
              console.log(chalk.green("  create:"), chalk.white(fullPath));
          }
        } catch (error) {
          result.errors.push(fullPath);
          console.log(chalk.red(" error:"), chalk.white(fullPath));
        }
      }
    } else if (typeof value === "object" && value !== null) {
      // It's a directory
      if (!options.dry) await fs.ensureDir(fullPath);
      if (options.verbose)
        console.log(chalk.blue(" makedir:"), chalk.white(fullPath));
      await processNode(value as StructureNode, fullPath, result, options);
    }
  }
}
