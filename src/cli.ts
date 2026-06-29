#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";
import { generateCommand } from "./commands/generate";

const program = new Command();

console.log(
  chalk.bold.cyan("\n ScaffoldX") +
    chalk.dim(" - Project structure generator\n"),
);

program
  .name("scaffoldx")
  .description(
    "Generate, export, and share project structures as portable JSON blueprints",
  )
  .version("1.0.0");

// GENERATE
program
  .command("generate <blueprint>")
  .alias("g")
  .description("Generate project structure from a JSON blueprint file")
  .option(
    "-o, --output <dir>",
    "Output directory (default: current repository)",
  )
  .option("-d, --dry", "Dry run - preview without creating files")
  .option("-v, --verbose", "Show each file/folder being created")
  .action(
    async (
      blueprint: string,
      options: { output?: string; dry?: boolean; verbose?: boolean },
    ) => {
      await generateCommand(blueprint, {
        output: options.output,
        dry: options.dry ?? false,
        verbose: options.verbose ?? false,
      });
    },
  );
