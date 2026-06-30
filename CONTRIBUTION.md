# Contributing to Scaffonity

Thanks for considering a contribution - every PR, issue, and blueprint helps.

## Ways to Contribute

- **Add a community blueprint** - share a JSON structure for a stack you use (Next.js, NestJS, FastAPI, etc.) in `/examples`
- **Report a bug** - open an issue with steps to reproduce
- **Suggest a feature** - open an issue with the `enhancement` label
- **Submit a PR** - fixes, new commands, improvements

## Development Setup

```bash
git clone https://github.com/devi5040/scaffonity
cd scaffonity
npm install
npm run dev -- generate examples/express-ts-api.json --dry --verbose
```

## Adding a Blueprint

1. Create a new JSON file in `/examples` (e.g. `nestjs-api.json`)
2. Test it: `npm run dev -- generate examples/your-file.json -o /tmp/test --verbose`
3. Add a row to the table in `README.md` under "Community Blueprints"
4. Open a PR

## Pull Request Process

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Run `npm run build` to confirm it compiles
4. Commit using clear messages (e.g. `feat: add nestjs blueprint`)
5. Open a PR with a short description of what changed and why

## Code Style

- TypeScript strict mode - no `any` unless unavoidable
- Keep commands in `src/commands/` - one file per command
- Follow existing patterns for CLI output (chalk colors, ora spinners)

## Code of Conduct

Be respectful. No harassment, discrimination, or hostility toward other contributors. Disagreements are fine - be constructive.

## Questions

Open a discussion or reach out at dpraidola@gmail.com
