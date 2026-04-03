import { describe, expect, it } from 'vitest';
import { formatCliHelp, parseCliArgs } from './cli.js';

describe('parseCliArgs', () => {
  it('parses the one-shot flags', () => {
    expect(
      parseCliArgs([
        '--prompt',
        'Compare OpenAI and Anthropic.',
        '--exit-on-complete',
        '--show-reasoning',
      ]),
    ).toEqual({
      exitOnComplete: true,
      help: false,
      prompt: 'Compare OpenAI and Anthropic.',
      showReasoning: true,
    });
  });

  it('accepts equals-style prompt flags', () => {
    expect(parseCliArgs(['--prompt=Map the browser agent market.'])).toEqual({
      exitOnComplete: false,
      help: false,
      prompt: 'Map the browser agent market.',
      showReasoning: false,
    });
  });

  it('throws on unknown options', () => {
    expect(() => parseCliArgs(['--wat'])).toThrow('Unknown option: --wat');
  });
});

describe('formatCliHelp', () => {
  it('includes the key flags', () => {
    const help = formatCliHelp('ui-agent-demo');

    expect(help).toContain('--prompt "<text>"');
    expect(help).toContain('--exit-on-complete');
    expect(help).toContain('--show-reasoning');
    expect(help).toContain('.devtools/generations.json');
    expect(help).toContain('artifacts/live/');
  });
});
