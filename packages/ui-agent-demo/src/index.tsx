import process from 'node:process';
import { render } from 'ink';
import { UiAgentApp } from './app.js';
import { formatCliHelp, parseCliArgs } from './cli.js';
import { ensureDemoEnv } from './server/env.js';

try {
  const options = parseCliArgs(process.argv.slice(2));

  if (options.help) {
    process.stdout.write(`${formatCliHelp()}\n`);
    process.exit(0);
  }

  ensureDemoEnv();
  render(<UiAgentApp {...options} />);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);

  process.stderr.write(`${message}\n`);
  process.exit(1);
}
