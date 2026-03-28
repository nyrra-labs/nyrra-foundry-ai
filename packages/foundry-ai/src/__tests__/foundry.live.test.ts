import { createGoogleGenerativeAI } from '@ai-sdk/google';
import type { OpenAILanguageModelResponsesOptions } from '@ai-sdk/openai';
import { createOpenAI } from '@ai-sdk/openai';
import {
  createProviderRegistry,
  embed,
  generateText,
  Output,
  stepCountIs,
  streamText,
  ToolLoopAgent,
  tool,
} from 'ai';
import { afterAll, describe, expect, it } from 'vitest';
import { z } from 'zod';
import { createFoundryAnthropic } from '../providers/anthropic.js';
import { createFoundryGoogle } from '../providers/google.js';
import { createFoundryOpenAI } from '../providers/openai.js';
import {
  assertModelClaimsVision,
  CapabilitySkippedError,
  CapabilityUnsupportedError,
  createVisionMessages,
  getEmbeddingProbeModelIds,
  getLiveCapabilityModels,
  getLiveCapabilityRid,
  getVisionProbeModelIds,
  LiveCapabilityRecorder,
  type LiveProvider,
} from './helpers/live-capabilities.js';
import { loadLiveFoundryConfig } from './helpers/live-foundry.js';

const config = loadLiveFoundryConfig();
const models = getLiveCapabilityModels();
const openai = createFoundryOpenAI(config);
const anthropic = createFoundryAnthropic(config);
const google = createFoundryGoogle(config);
const registry = createProviderRegistry({
  anthropic,
  google,
  openai,
});
const recorder = new LiveCapabilityRecorder();
const embeddingModels = getEmbeddingProbeModelIds();
const visionModels = getVisionProbeModelIds();
const VISION_PROBE_IMAGE_URL = 'https://www.nyrra.ai/opengraph.jpg';

const directOpenAI = createOpenAI({
  apiKey: config.token,
  baseURL: `${config.foundryUrl}/api/v2/llm/proxy/openai/v1`,
  headers: config.attributionRid ? { attribution: config.attributionRid } : undefined,
  name: 'foundry-openai-embedding-probe',
});
const directGoogle = createGoogleGenerativeAI({
  apiKey: config.token,
  baseURL: `${config.foundryUrl}/api/v2/llm/proxy/google/v1`,
  fetch: createGoogleProxyFetch(config.token),
  headers: config.attributionRid ? { attribution: config.attributionRid } : undefined,
  name: 'foundry-google-embedding-probe',
});

const OPENAI_PROVIDER_OPTIONS = {
  openai: {
    forceReasoning: true,
    reasoningEffort: 'low',
    textVerbosity: 'low',
  } satisfies OpenAILanguageModelResponsesOptions,
};

const OPENAI_MINIMAL_PROVIDER_OPTIONS = {
  openai: {
    reasoningEffort: 'minimal',
    textVerbosity: 'low',
  } satisfies OpenAILanguageModelResponsesOptions,
};

const signalSchema = z.object({
  indication: z.string().min(1),
  mechanismOfAction: z.string().min(1),
  riskLevel: z.enum(['low', 'medium', 'high']),
  rationale: z.string().min(1),
});

const structuredToolSchema = z.object({
  status: z.string().min(1),
  summary: z.string().min(1),
});

const regulatorySignalTool = tool({
  description: 'Returns a deterministic regulatory status for testing tool loops.',
  inputSchema: z.object({
    topic: z.string().min(1),
  }),
  execute: async ({ topic }) => ({
    status: 'verified',
    topic,
  }),
});

afterAll(async () => {
  await recorder.flush();
});

describe.sequential('live Foundry capability matrix', () => {
  for (const provider of ['openai', 'anthropic', 'google'] as const) {
    const modelId = models[provider];
    const rid = getLiveCapabilityRid(provider);

    it(`${provider}: basic generateText`, async () => {
      await recorder.runCase(
        {
          capability: 'text.generate',
          expectation: 'must-pass',
          modelId,
          provider,
        },
        async (telemetry) => {
          const result = await generateText({
            model: getFoundryModel(provider, modelId),
            prompt: `Reply with exactly "${provider.toUpperCase()}: Foundry capability checks are running."`,
            maxOutputTokens: 420,
            providerOptions: getProviderOptions(provider, 'baseline'),
            experimental_telemetry: telemetry,
          });

          expect(result.text.toLowerCase()).toContain(provider);

          return {
            finishReason: result.finishReason,
            text: result.text,
            usage: result.usage,
            warnings: result.warnings,
          };
        },
      );
    });

    it(`${provider}: message history generateText`, async () => {
      await recorder.runCase(
        {
          capability: 'messages.generate',
          expectation: 'must-pass',
          modelId,
          provider,
        },
        async (telemetry) => {
          const result = await generateText({
            model: getFoundryModel(provider, modelId),
            messages: [
              {
                role: 'user',
                content: [{ type: 'text', text: 'The passphrase is blue signal.' }],
              },
              {
                role: 'assistant',
                content: [{ type: 'text', text: 'I will remember the passphrase.' }],
              },
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: 'Reply with exactly "MEMORY: blue signal" and nothing else.',
                  },
                ],
              },
            ],
            maxOutputTokens: 420,
            providerOptions: getProviderOptions(provider, 'baseline'),
            experimental_telemetry: telemetry,
          });

          expect(result.text.toLowerCase()).toContain('memory');
          expect(result.text.toLowerCase()).toContain('blue signal');

          return {
            finishReason: result.finishReason,
            text: result.text,
            usage: result.usage,
            warnings: result.warnings,
          };
        },
      );
    });

    it(`${provider}: raw RID passthrough`, async () => {
      await recorder.runCase(
        {
          capability: 'rid.passthrough',
          expectation: 'must-pass',
          modelId: rid,
          provider,
        },
        async (telemetry) => {
          const result = await generateText({
            model: getFoundryModel(provider, rid),
            prompt: 'Reply with exactly "READY: Foundry RID routing is active."',
            maxOutputTokens: 420,
            providerOptions: getProviderOptions(provider, 'baseline'),
            experimental_telemetry: telemetry,
          });

          expect(result.text).toMatch(/ready/i);

          return {
            finishReason: result.finishReason,
            text: result.text,
            usage: result.usage,
            warnings: result.warnings,
          };
        },
      );
    });

    it(`${provider}: streamText`, async () => {
      await recorder.runCase(
        {
          capability: 'text.stream',
          expectation: 'must-pass',
          modelId,
          provider,
        },
        async (telemetry) => {
          const result = streamText({
            model: getFoundryModel(provider, modelId),
            prompt: `Write exactly one short sentence that mentions ${provider} and Foundry proxy routing.`,
            maxOutputTokens: 420,
            providerOptions: getProviderOptions(provider, 'baseline'),
            experimental_telemetry: telemetry,
          });
          const summary = await collectStreamSummary(result);

          expect(summary.text.toLowerCase()).toContain('foundry');

          return summary;
        },
      );
    });

    it(`${provider}: structured output`, async () => {
      await recorder.runCase(
        {
          capability: 'structured.output.object',
          expectation: 'must-pass',
          modelId,
          provider,
        },
        async (telemetry) => {
          const result = await generateText({
            model: getFoundryModel(provider, modelId),
            output: Output.object({
              schema: signalSchema,
              name: 'clinical_signal',
              description: 'A concise clinical signal summary for regulated AI review workflows.',
            }),
            prompt:
              'Extract a concise clinical signal from the following statement: "The investigational therapy reduced relapse rates in a small phase 2 study, but liver enzyme elevations warrant close monitoring."',
            maxOutputTokens: 900,
            providerOptions: getProviderOptions(provider, 'structured'),
            experimental_telemetry: telemetry,
          });

          expect(result.output.indication.length).toBeGreaterThan(4);
          expect(result.output.rationale.length).toBeGreaterThan(20);

          return {
            finishReason: result.finishReason,
            output: result.output,
            text: result.text,
            usage: result.usage,
            warnings: result.warnings,
          };
        },
      );
    });

    it(`${provider}: deterministic tool loop`, async () => {
      await recorder.runCase(
        {
          capability: 'tool.loop.deterministic',
          expectation: 'must-pass',
          modelId,
          provider,
        },
        async (telemetry) => {
          const result = streamText({
            model: getFoundryModel(provider, modelId),
            prompt:
              'Call the regulatorySignal tool exactly once with topic "oncology", then answer with SIGNAL and the returned status in one short sentence.',
            maxOutputTokens: 420,
            providerOptions: getProviderOptions(provider, 'tools'),
            stopWhen: stepCountIs(3),
            tools: {
              regulatorySignal: regulatorySignalTool,
            },
            experimental_telemetry: telemetry,
          });
          const summary = await collectStreamSummary(result);

          expect(summary.text).toMatch(/signal/i);
          expect(summary.text).toMatch(/verified/i);
          expect(summary.eventCounts['tool-call']).toBeGreaterThan(0);
          expect(summary.eventCounts['tool-result']).toBeGreaterThan(0);

          return summary;
        },
      );
    });

    it(`${provider}: ToolLoopAgent`, async () => {
      await recorder.runCase(
        {
          capability: 'agent.tool_loop',
          expectation: 'must-pass',
          modelId,
          provider,
        },
        async (telemetry) => {
          const agent = new ToolLoopAgent({
            model: getFoundryModel(provider, modelId),
            tools: {
              regulatorySignal: regulatorySignalTool,
            },
            providerOptions: getProviderOptions(provider, 'tools'),
            stopWhen: stepCountIs(3),
            experimental_telemetry: telemetry,
          });
          const result = await agent.generate({
            prompt:
              'Call the regulatorySignal tool exactly once, then answer with AGENT and the returned status in one short sentence.',
          });

          expect(result.text).toMatch(/agent/i);
          expect(result.text).toMatch(/verified/i);

          return {
            finishReason: result.finishReason,
            steps: result.steps,
            text: result.text,
            usage: result.usage,
            warnings: result.warnings,
          };
        },
      );
    });

    it(`${provider}: structured output plus tools`, async () => {
      await recorder.runCase(
        {
          capability: 'structured.plus.tools',
          expectation: 'must-pass',
          modelId,
          provider,
        },
        async (telemetry) => {
          const result = await generateText({
            model: getFoundryModel(provider, modelId),
            output: Output.object({
              schema: structuredToolSchema,
              name: 'signal_summary',
              description: 'A structured regulatory signal summary after tool execution.',
            }),
            prompt:
              'Call the regulatorySignal tool exactly once with topic "oncology". Return a JSON object with status equal to the tool status and summary equal to one short sentence mentioning the topic.',
            maxOutputTokens: 520,
            providerOptions: getProviderOptions(provider, 'structured-tools'),
            stopWhen: stepCountIs(3),
            tools: {
              regulatorySignal: regulatorySignalTool,
            },
            experimental_telemetry: telemetry,
          });

          expect(result.output.status).toMatch(/verified/i);
          expect(result.output.summary.toLowerCase()).toContain('oncology');

          return {
            finishReason: result.finishReason,
            output: result.output,
            steps: result.steps,
            text: result.text,
            usage: result.usage,
            warnings: result.warnings,
          };
        },
      );
    });

    it(`${provider}: vision image input probe`, async () => {
      await recorder.runCase(
        {
          capability: 'vision.image_input',
          expectation: 'must-pass',
          modelId: visionModels[provider] ?? modelId,
          provider,
        },
        async (telemetry) => {
          const visionModelId = visionModels[provider] ?? modelId;

          assertModelClaimsVision(provider, visionModelId);

          const result = await generateText({
            model: getFoundryModel(provider, visionModelId),
            messages: createVisionMessages(
              'Describe what this image appears to show in one short sentence.',
              VISION_PROBE_IMAGE_URL,
            ),
            maxOutputTokens: 160,
            providerOptions: getProviderOptions(provider, 'baseline'),
            experimental_telemetry: telemetry,
          });

          expect(result.text.trim().length).toBeGreaterThan(10);

          return {
            finishReason: result.finishReason,
            text: result.text,
            usage: result.usage,
            warnings: result.warnings,
          };
        },
      );
    });

    for (const unsupportedCapability of [
      'modality.image_generation',
      'modality.speech',
      'modality.transcription',
      'modality.video',
      'modality.rerank',
    ] as const) {
      it(`${provider}: ${unsupportedCapability}`, async () => {
        await recorder.runCase(
          {
            capability: unsupportedCapability,
            expectation: 'investigate',
            modelId,
            provider,
          },
          async () => {
            throw new CapabilitySkippedError(
              `${provider}.${unsupportedCapability} is not supported by the package yet.`,
              {
                capability: unsupportedCapability,
                provider,
              },
            );
          },
        );
      });
    }
  }

  for (const provider of ['openai', 'anthropic', 'google'] as const) {
    const modelId = models[provider];

    it(`${provider}: reasoning visibility or options`, async () => {
      await recorder.runCase(
        {
          capability: 'reasoning.visibility',
          expectation: provider === 'google' ? 'investigate' : 'must-pass',
          modelId,
          provider,
        },
        async (telemetry) => {
          if (provider === 'google') {
            throw new CapabilitySkippedError(
              'Google reasoning visibility is not currently asserted in this matrix.',
              {
                provider,
              },
            );
          }

          const result = streamText({
            model: getFoundryModel(provider, modelId),
            prompt: 'Reply with READY and one short clause about reasoning visibility.',
            maxOutputTokens: 220,
            providerOptions: getProviderOptions(provider, 'reasoning'),
            experimental_telemetry: telemetry,
          });
          const summary = await collectStreamSummary(result);

          if (provider === 'anthropic') {
            expect(summary.reasoningText.trim().length).toBeGreaterThan(0);
          } else {
            expect(summary.eventCounts['reasoning-start']).toBeGreaterThan(0);
            expect(summary.eventCounts['reasoning-end']).toBeGreaterThan(0);
          }

          expect(summary.text).toMatch(/ready/i);

          return summary;
        },
      );
    });
  }

  it('registry routing across all configured providers', async () => {
    await recorder.runCase(
      {
        capability: 'registry.routing',
        expectation: 'must-pass',
        modelId: `${models.openai},${models.anthropic},${models.google}`,
        provider: 'openai',
      },
      async (telemetry) => {
        const openAiResult = await generateText({
          model: registry.languageModel(`openai:${models.openai}`),
          prompt: 'Reply with exactly "OPENAI: registry routing is active."',
          maxOutputTokens: 420,
          providerOptions: getProviderOptions('openai', 'baseline'),
          experimental_telemetry: telemetry,
        });
        const anthropicResult = await generateText({
          model: registry.languageModel(`anthropic:${models.anthropic}`),
          prompt: 'Reply with ANTHROPIC and one short clause.',
          maxOutputTokens: 120,
          experimental_telemetry: telemetry,
        });
        const googleResult = await generateText({
          model: registry.languageModel(`google:${models.google}`),
          prompt: 'Reply with GOOGLE and one short clause.',
          maxOutputTokens: 120,
          experimental_telemetry: telemetry,
        });

        expect(openAiResult.text).toMatch(/openai/i);
        expect(anthropicResult.text).toMatch(/anthropic/i);
        expect(googleResult.text).toMatch(/google/i);

        return {
          output: {
            anthropic: anthropicResult.text,
            google: googleResult.text,
            openai: openAiResult.text,
          },
        };
      },
    );
  });

  it('OpenAI embedding proxy probe', async () => {
    await recorder.runCase(
      {
        capability: 'embedding.proxy_probe',
        expectation: 'investigate',
        modelId: embeddingModels.openai ?? 'text-embedding-3-small',
        provider: 'openai',
      },
      async (telemetry) => {
        if (!embeddingModels.openai) {
          throw new CapabilityUnsupportedError('OpenAI embedding probe model is not configured.');
        }

        const result = await embed({
          model: directOpenAI.embeddingModel(embeddingModels.openai),
          value: 'Foundry capability matrix embedding probe',
          experimental_telemetry: telemetry,
        });

        expect(result.embedding.length).toBeGreaterThan(0);

        return {
          output: {
            dimension: result.embedding.length,
          },
          usage: result.usage,
          warnings: result.warnings,
        };
      },
    );
  });

  it('Anthropic embedding proxy probe', async () => {
    await recorder.runCase(
      {
        capability: 'embedding.proxy_probe',
        expectation: 'investigate',
        modelId: embeddingModels.anthropic ?? models.anthropic,
        provider: 'anthropic',
      },
      async () => {
        throw new CapabilitySkippedError(
          'Anthropic embeddings are not configured as a supported matrix target yet.',
          {
            provider: 'anthropic',
          },
        );
      },
    );
  });

  it('Google embedding proxy probe', async () => {
    await recorder.runCase(
      {
        capability: 'embedding.proxy_probe',
        expectation: 'investigate',
        modelId: embeddingModels.google ?? models.google,
        provider: 'google',
      },
      async (telemetry) => {
        if (!embeddingModels.google) {
          throw new CapabilitySkippedError(
            'Google embedding probe model is not configured for this stack.',
          );
        }

        const result = await embed({
          model: directGoogle.embeddingModel(embeddingModels.google),
          value: 'Foundry capability matrix embedding probe',
          experimental_telemetry: telemetry,
        });

        expect(result.embedding.length).toBeGreaterThan(0);

        return {
          output: {
            dimension: result.embedding.length,
          },
          usage: result.usage,
          warnings: result.warnings,
        };
      },
    );
  });
});

function createGoogleProxyFetch(token: string): typeof fetch {
  return async (input, init) => {
    const request = new Request(input, init);
    const headers = new Headers(request.headers);

    headers.delete('x-goog-api-key');
    headers.set('Authorization', `Bearer ${token}`);

    return fetch(new Request(request, { headers }));
  };
}

function getFoundryModel(provider: LiveProvider, modelId: string) {
  if (provider === 'openai') {
    return openai(modelId);
  }

  if (provider === 'anthropic') {
    return anthropic(modelId);
  }

  return google(modelId);
}

function getProviderOptions(
  provider: LiveProvider,
  mode: 'baseline' | 'reasoning' | 'structured' | 'tools' | 'structured-tools',
) {
  if (provider === 'openai') {
    if (mode === 'reasoning') {
      return OPENAI_PROVIDER_OPTIONS;
    }

    return OPENAI_MINIMAL_PROVIDER_OPTIONS;
  }

  if (provider === 'anthropic') {
    if (mode === 'reasoning') {
      return {
        anthropic: {
          effort: 'low',
          thinking: {
            type: 'enabled',
            budgetTokens: 1024,
          },
          sendReasoning: true,
        },
      };
    }

    if (mode === 'tools' || mode === 'structured-tools') {
      return {
        anthropic: {
          disableParallelToolUse: true,
          toolStreaming: true,
        },
      };
    }

    return undefined;
  }

  return undefined;
}

async function collectStreamSummary(result: {
  finishReason?: PromiseLike<string> | string;
  fullStream: AsyncIterable<Record<string, unknown>>;
  output?: PromiseLike<unknown>;
  usage?: PromiseLike<unknown>;
  warnings?: PromiseLike<unknown>;
}) {
  const eventCounts: Record<string, number> = {};
  let reasoningText = '';
  let text = '';

  for await (const part of result.fullStream) {
    const type = typeof part.type === 'string' ? part.type : 'unknown';
    eventCounts[type] = (eventCounts[type] ?? 0) + 1;

    if (type === 'text-delta' && typeof part.text === 'string') {
      text += part.text;
    }

    if (type === 'reasoning-delta' && typeof part.text === 'string') {
      reasoningText += part.text;
    }
  }

  return {
    eventCounts,
    finishReason: await result.finishReason,
    output: result.output ? await result.output : undefined,
    reasoningText,
    text,
    usage: result.usage ? await result.usage : undefined,
    warnings: result.warnings ? await result.warnings : undefined,
  };
}
