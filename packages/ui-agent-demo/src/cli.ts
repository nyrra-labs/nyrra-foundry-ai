export type CliOptions = {
  exitOnComplete: boolean;
  help: boolean;
  prompt?: string;
  showReasoning: boolean;
};

export const SUGGESTED_PROMPTS = [
  'Start with diabetes drugs as the seed area. Identify the major categories first, then the key manufacturers in each category. Whenever a manufacturer is discovered, reuse that manufacturer node and expand it into the drugs it makes. Link every drug back to at least one category.',
  'Map the GLP-1 and adjacent diabetes-drug landscape. Build only category, manufacturer, and drug nodes. Reuse manufacturer nodes across categories and keep the graph focused on linked expansions, not narrative summaries.',
  'Use diabetes therapies as the root. Spider category -> manufacturer -> drug -> category until the graph shows the main classes, the main manufacturers, and the marketed drugs each company makes.',
] as const;

export function parseCliArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    exitOnComplete: false,
    help: false,
    showReasoning: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    switch (arg) {
      case '--exit-on-complete':
        options.exitOnComplete = true;
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
      case '--prompt': {
        const value = argv[index + 1];

        if (value == null || value.startsWith('-')) {
          throw new Error('Expected a value after --prompt.');
        }

        options.prompt = value;
        index += 1;
        break;
      }
      case '--show-reasoning':
        options.showReasoning = true;
        break;
      default:
        if (arg.startsWith('--prompt=')) {
          const value = arg.slice('--prompt='.length).trim();

          if (value.length === 0) {
            throw new Error('Expected a non-empty value after --prompt=');
          }

          options.prompt = value;
          break;
        }

        throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

export function formatCliHelp(command = 'just ui-agent') {
  return `
UI agent demo

Runs a terminal-native Ink app that researches a landscape and mutates a live knowledge graph.

Usage:
  ${command} [options]

Options:
  --prompt "<text>"       Start immediately with the provided prompt.
  --exit-on-complete      Exit after the run reaches a final state.
  --show-reasoning        Show the streamed reasoning trace in the sidebar.
  --help, -h              Print this help text.

Behavior:
  - AI SDK DevTools capture is enabled by default and writes to the repo-root .devtools/generations.json.
  - Set UI_AGENT_USE_DEVTOOLS=0 to disable capture for a run.
  - Live graph artifacts are written to artifacts/live/.
  - The canned \`just ui-agent-graph-demo\` command runs the live-only diabetes graph crawl.

Interactive mode:
  - Edit the prompt inline and press Enter to run the agent.
  - Press Esc, q, or Ctrl+C to exit a running session.

Suggested prompts:
${SUGGESTED_PROMPTS.map((prompt, index) => `  ${index + 1}. ${prompt}`).join('\n')}
`.trim();
}
