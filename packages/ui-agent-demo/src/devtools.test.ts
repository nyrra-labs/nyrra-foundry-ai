import { describe, expect, it } from 'vitest';
import {
  getUiAgentDevToolsInfo,
  isUiAgentDevToolsEnabled,
  UI_AGENT_USE_DEVTOOLS_ENV,
} from './devtools.js';

describe('isUiAgentDevToolsEnabled', () => {
  it('defaults to enabled when the env var is missing', () => {
    expect(isUiAgentDevToolsEnabled({})).toBe(true);
  });

  it('supports explicit opt-out values', () => {
    expect(isUiAgentDevToolsEnabled({ [UI_AGENT_USE_DEVTOOLS_ENV]: '0' })).toBe(false);
    expect(isUiAgentDevToolsEnabled({ [UI_AGENT_USE_DEVTOOLS_ENV]: 'false' })).toBe(false);
    expect(isUiAgentDevToolsEnabled({ [UI_AGENT_USE_DEVTOOLS_ENV]: 'off' })).toBe(false);
  });
});

describe('getUiAgentDevToolsInfo', () => {
  it('builds a generations path under the workspace root when called from a package', () => {
    const info = getUiAgentDevToolsInfo(
      '/Users/anandpant/Development/nyrra-labs/nyrra-foundry-ai/packages/ui-agent-demo',
    );

    expect(info.enabled).toBeTypeOf('boolean');
    expect(info.generationsPath).toBe(
      '/Users/anandpant/Development/nyrra-labs/nyrra-foundry-ai/.devtools/generations.json',
    );
    expect(info.viewerUrl).toContain('http://localhost:');
  });
});
