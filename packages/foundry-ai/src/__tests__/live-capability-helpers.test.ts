import { describe, expect, it } from 'vitest';
import { getProviderOptions } from './helpers/live-capability-helpers.js';

describe('live capability provider options', () => {
  it('omits anthropic effort from reasoning probes', () => {
    expect(getProviderOptions('anthropic', 'reasoning', 'claude-haiku-4.5')).toEqual({
      anthropic: {
        thinking: {
          type: 'enabled',
          budgetTokens: 1024,
        },
        sendReasoning: true,
      },
    });
  });

  it('keeps anthropic tool-loop options intact', () => {
    expect(getProviderOptions('anthropic', 'tools', 'claude-haiku-4.5')).toEqual({
      anthropic: {
        disableParallelToolUse: true,
        toolStreaming: true,
      },
    });
  });
});
