import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { devToolsMiddleware } from '@ai-sdk/devtools';
import { wrapLanguageModel } from 'ai';

export const UI_AGENT_USE_DEVTOOLS_ENV = 'UI_AGENT_USE_DEVTOOLS';

type WrappableModel = Parameters<typeof wrapLanguageModel>[0]['model'];

export type UiAgentDevToolsInfo = {
  enabled: boolean;
  generationsPath: string;
  port: string;
  viewerUrl: string;
};

export function isUiAgentDevToolsEnabled(env = process.env) {
  const value = env[UI_AGENT_USE_DEVTOOLS_ENV]?.trim().toLowerCase();

  if (!value) {
    return true;
  }

  return !['0', 'false', 'no', 'off'].includes(value);
}

export function getUiAgentDevToolsInfo(cwd = process.cwd()): UiAgentDevToolsInfo {
  const port = process.env.AI_SDK_DEVTOOLS_PORT ?? '4983';
  const repoRoot = findWorkspaceRoot(cwd);

  return {
    enabled: isUiAgentDevToolsEnabled(),
    generationsPath: path.join(repoRoot, '.devtools', 'generations.json'),
    port,
    viewerUrl: `http://localhost:${port}`,
  };
}

export function wrapUiAgentModelWithDevTools(options: {
  model: WrappableModel;
  modelId: string;
  providerId: string;
}): WrappableModel {
  if (!isUiAgentDevToolsEnabled()) {
    return options.model;
  }

  return wrapLanguageModel({
    middleware: devToolsMiddleware(),
    model: options.model,
    modelId: options.modelId,
    providerId: options.providerId,
  });
}

function findWorkspaceRoot(startDir: string) {
  let currentDir = path.resolve(startDir);
  const { root } = path.parse(currentDir);

  while (true) {
    if (
      existsSync(path.join(currentDir, 'pnpm-workspace.yaml')) &&
      existsSync(path.join(currentDir, 'nx.json'))
    ) {
      return currentDir;
    }

    if (currentDir === root) {
      return path.resolve(startDir);
    }

    currentDir = path.dirname(currentDir);
  }
}
