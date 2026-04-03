import path from 'node:path';
import type { LanguageModelUsage } from 'ai';
import { Box, Text, useApp, useInput, useStdin, useStdout } from 'ink';
import Spinner from 'ink-spinner';
import TextInput from 'ink-text-input';
import {
  type ReactNode,
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { CliOptions } from './cli.js';
import { SUGGESTED_PROMPTS } from './cli.js';
import { getUiAgentDevToolsInfo } from './devtools.js';
import { applyKnowledgeGraphPass, createLandscapeUiAgent } from './server/agent.js';
import {
  compactText,
  createSeedKnowledgeGraph,
  type EvidenceItem,
  type GraphComposerResult,
  type GraphMutationEvent,
  type KnowledgeGraph,
  type ResearchDiscoveries,
  type ResearchSnapshot,
} from './shared/knowledge-graph.js';
import {
  clampPreviewOffset,
  type GraphPreviewFrame,
  getAutoPreviewOffset,
  getVisiblePreviewLines,
  renderKnowledgeGraphPreview,
} from './terminal/graph-preview.js';

type Props = Pick<CliOptions, 'exitOnComplete' | 'prompt' | 'showReasoning'>;
type Phase = 'idle' | 'researching' | 'composing' | 'ready' | 'error';
type GraphAgentState = {
  basedOnStep?: number;
  eventCount: number;
  lastAppliedVersion: number;
  message: string;
  phase: 'idle' | 'drafting' | 'ready' | 'error';
  trigger?: GraphMutationEvent['trigger'];
};
type ToolSummary = {
  input: string;
  outputPreview?: string;
  toolName: string;
};
type UsageSummary = {
  cachedInputTokens: number | undefined;
  inputTokens: number | undefined;
  outputTokens: number | undefined;
  reasoningTokens: number | undefined;
  totalTokens: number | undefined;
};
type StepSummary = {
  finishReason: string;
  reasoningPreview?: string;
  sourceCount: number;
  stepNumber: number;
  textPreview?: string;
  toolCalls: ToolSummary[];
  toolResults: ToolSummary[];
  usage: UsageSummary;
};
type FinishSummary = {
  finishReason: string;
  reasoningPreview?: string;
  stepCount: number;
  toolCalls: ToolSummary[];
  toolResults: ToolSummary[];
  totalUsage: UsageSummary;
};
type ToolEvent = {
  inputPreview: string;
  outputPreview?: string;
  state: 'completed' | 'error' | 'running';
  toolCallId: string;
  toolName: string;
};
type GraphRefreshRequest = {
  basedOnStep?: number;
  evidenceCount?: number;
  message: string;
  resolve?: (result: GraphComposerResult | undefined) => void;
  trigger: GraphMutationEvent['trigger'];
};

const EMPTY_PREVIEW: GraphPreviewFrame = {
  contentHeight: 1,
  lines: ['Graph workspace is warming up.'],
  mode: 'text-fallback',
};

export function UiAgentApp({ exitOnComplete, prompt, showReasoning }: Props) {
  const { exit } = useApp();
  const { isRawModeSupported, setRawMode, stdin } = useStdin();
  const { stdout } = useStdout();
  const autoStartedRef = useRef(false);
  const exitCodeRef = useRef(0);
  const exitRequestedRef = useRef(false);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const graphInFlightRef = useRef(false);
  const graphAbortControllerRef = useRef<AbortController | undefined>(undefined);
  const graphPendingRequestRef = useRef<GraphRefreshRequest | undefined>(undefined);
  const previewPendingRequestRef = useRef<
    | {
        artifactDir?: string;
        devTools: ReturnType<typeof getUiAgentDevToolsInfo>;
        graph: KnowledgeGraph;
        height: number;
        persistPng: boolean;
        renderId: number;
        width: number;
      }
    | undefined
  >(undefined);
  const previewRenderInFlightRef = useRef(false);
  const graphRenderRunIdRef = useRef(0);
  const researchAbortControllerRef = useRef<AbortController | undefined>(undefined);
  const runIdRef = useRef(0);
  const graphVersionRef = useRef(1);
  const analysisRef = useRef('');
  const evidenceRef = useRef<EvidenceItem[]>([]);
  const finishSummaryRef = useRef<FinishSummary | undefined>(undefined);
  const graphRef = useRef<KnowledgeGraph>(createSeedKnowledgeGraph(prompt ?? SUGGESTED_PROMPTS[0]));
  const promptRef = useRef(prompt ?? SUGGESTED_PROMPTS[0]);
  const researchCompleteRef = useRef(false);
  const discoveriesRef = useRef<ResearchDiscoveries | undefined>(undefined);
  const stepSummariesRef = useRef<StepSummary[]>([]);
  const toolEventsRef = useRef<ToolEvent[]>([]);
  const [input, setInput] = useState(prompt ?? SUGGESTED_PROMPTS[0]);
  const [analysis, setAnalysis] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([]);
  const [finishSummary, setFinishSummary] = useState<FinishSummary | undefined>();
  const [graph, setGraph] = useState<KnowledgeGraph>(graphRef.current);
  const [graphAgentState, setGraphAgentState] = useState<GraphAgentState>({
    eventCount: 0,
    lastAppliedVersion: 1,
    message: 'Graph agent is waiting for a prompt.',
    phase: 'idle',
    trigger: 'initial',
  });
  const [graphPreview, setGraphPreview] = useState<GraphPreviewFrame>(EMPTY_PREVIEW);
  const [graphScrollMode, setGraphScrollMode] = useState<'auto' | 'manual'>('auto');
  const [graphScrollOffset, setGraphScrollOffset] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [promptLabel, setPromptLabel] = useState<string | undefined>();
  const [reasoning, setReasoning] = useState('');
  const [statusMessage, setStatusMessage] = useState(
    'Enter a prompt and press Enter to run the research agent and graph agent.',
  );
  const [stepSummaries, setStepSummaries] = useState<StepSummary[]>([]);
  const [terminalSize, setTerminalSize] = useState({
    columns: stdout.columns ?? 140,
    rows: stdout.rows ?? 40,
  });
  const [toolEvents, setToolEvents] = useState<ToolEvent[]>([]);
  const deferredAnalysis = useDeferredValue(analysis);
  const deferredReasoning = useDeferredValue(reasoning);
  const devToolsInfo = useMemo(() => getUiAgentDevToolsInfo(), []);
  const isBusy = phase === 'researching' || phase === 'composing';

  useEffect(() => {
    const updateTerminalSize = () => {
      setTerminalSize({
        columns: stdout.columns ?? 140,
        rows: stdout.rows ?? 40,
      });
    };

    updateTerminalSize();
    stdout.on('resize', updateTerminalSize);

    return () => {
      stdout.off('resize', updateTerminalSize);
    };
  }, [stdout]);

  const clearExitTimeout = useEffectEvent(() => {
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = undefined;
    }
  });

  const finishRun = useEffectEvent((code = 0) => {
    clearExitTimeout();
    process.exitCode = code;
    setTimeout(() => {
      exit();
    }, 80);
  });

  const requestExit = useEffectEvent((code = 0) => {
    if (exitRequestedRef.current) {
      return;
    }

    exitRequestedRef.current = true;
    exitCodeRef.current = code;
    graphPendingRequestRef.current?.resolve?.(undefined);
    graphPendingRequestRef.current = undefined;
    researchAbortControllerRef.current?.abort();
    graphAbortControllerRef.current?.abort();
    setStatusMessage(
      isBusy
        ? 'Stopping research and graph agents cleanly before exit.'
        : 'Exiting knowledge graph demo.',
    );

    if (!isBusy) {
      finishRun(code);
      return;
    }

    clearExitTimeout();
    exitTimeoutRef.current = setTimeout(() => {
      finishRun(code);
    }, 4000);
  });

  useEffect(
    () => () => {
      clearExitTimeout();
    },
    [],
  );

  useEffect(() => {
    if (!isBusy || !isRawModeSupported) {
      return;
    }

    setRawMode(true);

    const handleData = (chunk: Buffer | string) => {
      const input = typeof chunk === 'string' ? chunk : chunk.toString('utf8');

      if (input.includes('\u0003')) {
        requestExit(130);
        return;
      }

      if (input.includes('\u001b')) {
        requestExit(0);
        return;
      }

      if (input === 'q' || input === 'Q') {
        requestExit(0);
      }
    };

    stdin.on('data', handleData);

    return () => {
      stdin.off('data', handleData);
      setRawMode(false);
    };
  }, [isBusy, isRawModeSupported, setRawMode, stdin]);

  const buildSnapshot = useEffectEvent(
    (): ResearchSnapshot => ({
      analysis: compactText(analysisRef.current, 2200) ?? '',
      completed: researchCompleteRef.current,
      discoveries: discoveriesRef.current,
      evidence: evidenceRef.current.slice(-14).map((item) => ({
        ...item,
        query: compactText(item.query, 110) ?? item.query,
        snippet: compactText(item.snippet, 120),
        title: compactText(item.title, 96) ?? item.title,
        url: item.url,
      })),
      finalReasoning: finishSummaryRef.current?.reasoningPreview,
      prompt: promptRef.current,
      stepCount: stepSummariesRef.current.length,
      stepSummaries: stepSummariesRef.current.map((step) => ({
        finishReason: step.finishReason,
        stepNumber: step.stepNumber,
        textPreview: step.textPreview,
        toolCalls: step.toolCalls.length,
        toolResults: step.toolResults.length,
      })),
      toolEvents: toolEventsRef.current.slice(-8).map((event) => ({
        inputPreview: event.inputPreview,
        outputPreview: event.outputPreview,
        state: event.state,
        toolName: event.toolName,
      })),
    }),
  );

  const flushGraphRefreshQueue = useEffectEvent(async (expectedRunId: number) => {
    if (graphInFlightRef.current) {
      return;
    }

    graphInFlightRef.current = true;

    try {
      while (expectedRunId === runIdRef.current && !exitRequestedRef.current) {
        const request = graphPendingRequestRef.current;

        if (!request) {
          break;
        }

        graphPendingRequestRef.current = undefined;
        const version = graphVersionRef.current + 1;

        setGraphAgentState({
          basedOnStep: request.basedOnStep,
          eventCount: 0,
          lastAppliedVersion: graphVersionRef.current,
          message: request.message,
          phase: 'drafting',
          trigger: request.trigger,
        });

        const controller = new AbortController();

        graphAbortControllerRef.current = controller;

        let result: GraphComposerResult;

        try {
          result = await applyKnowledgeGraphPass({
            abortSignal: controller.signal,
            graph: graphRef.current,
            snapshot: buildSnapshot(),
            trigger: request.trigger,
          });
        } catch (error) {
          if (graphAbortControllerRef.current === controller) {
            graphAbortControllerRef.current = undefined;
          }

          request.resolve?.(undefined);

          if (exitRequestedRef.current || isAbortError(error)) {
            return;
          }

          throw error;
        }

        if (graphAbortControllerRef.current === controller) {
          graphAbortControllerRef.current = undefined;
        }

        if (expectedRunId !== runIdRef.current) {
          request.resolve?.(undefined);
          return;
        }

        graphVersionRef.current = version;
        graphRef.current = result.graph;
        setGraph(result.graph);
        setGraphAgentState({
          basedOnStep: request.basedOnStep,
          eventCount: result.eventCount,
          lastAppliedVersion: version,
          message: describeGraphPass(version, request, result),
          phase: 'ready',
          trigger: request.trigger,
        });
        request.resolve?.(result);
      }
    } finally {
      graphInFlightRef.current = false;

      if (
        graphPendingRequestRef.current &&
        expectedRunId === runIdRef.current &&
        !exitRequestedRef.current
      ) {
        void flushGraphRefreshQueue(expectedRunId);
      }
    }
  });

  const requestGraphRefresh = useEffectEvent(
    ({ awaitResult = false, ...request }: GraphRefreshRequest & { awaitResult?: boolean }) =>
      new Promise<GraphComposerResult | undefined>((resolve) => {
        if (exitRequestedRef.current) {
          resolve(undefined);
          return;
        }

        const pendingRequest = graphPendingRequestRef.current;

        pendingRequest?.resolve?.(undefined);
        graphPendingRequestRef.current = {
          ...request,
          resolve: awaitResult ? resolve : undefined,
        };
        setGraphAgentState({
          basedOnStep: request.basedOnStep,
          eventCount: 0,
          lastAppliedVersion: graphVersionRef.current,
          message: request.message,
          phase: 'drafting',
          trigger: request.trigger,
        });

        if (!awaitResult) {
          resolve(undefined);
        }

        void flushGraphRefreshQueue(runIdRef.current);
      }),
  );

  const flushPreviewRenderQueue = useEffectEvent(async () => {
    if (previewRenderInFlightRef.current) {
      return;
    }

    previewRenderInFlightRef.current = true;

    try {
      while (true) {
        const request = previewPendingRequestRef.current;

        if (!request) {
          break;
        }

        previewPendingRequestRef.current = undefined;
        const nextFrame = await renderKnowledgeGraphPreview(request.graph, {
          artifactDir: request.artifactDir,
          devTools: request.devTools,
          height: request.height,
          persistPng: request.persistPng,
          width: request.width,
        });

        if (request.renderId !== graphRenderRunIdRef.current) {
          continue;
        }

        setGraphPreview(nextFrame);
      }
    } finally {
      previewRenderInFlightRef.current = false;

      if (previewPendingRequestRef.current) {
        void flushPreviewRenderQueue();
      }
    }
  });

  const runPrompt = useEffectEvent(async (nextPrompt: string) => {
    const trimmedPrompt = nextPrompt.trim();

    if (trimmedPrompt.length === 0 || isBusy) {
      return;
    }

    clearExitTimeout();
    exitCodeRef.current = 0;
    exitRequestedRef.current = false;
    graphAbortControllerRef.current = undefined;
    researchAbortControllerRef.current = undefined;

    const runId = runIdRef.current + 1;
    const seedGraph = createSeedKnowledgeGraph(trimmedPrompt);

    runIdRef.current = runId;
    graphRef.current = seedGraph;
    graphInFlightRef.current = false;
    graphPendingRequestRef.current = undefined;
    graphVersionRef.current = 1;
    analysisRef.current = '';
    evidenceRef.current = [];
    finishSummaryRef.current = undefined;
    promptRef.current = trimmedPrompt;
    researchCompleteRef.current = false;
    discoveriesRef.current = undefined;
    stepSummariesRef.current = [];
    toolEventsRef.current = [];
    setInput(trimmedPrompt);
    setPromptLabel(trimmedPrompt);
    setAnalysis('');
    setErrorMessage(undefined);
    setEvidenceItems([]);
    setFinishSummary(undefined);
    setGraph(seedGraph);
    setGraphPreview(EMPTY_PREVIEW);
    setGraphScrollMode('auto');
    setGraphScrollOffset(0);
    setGraphAgentState({
      eventCount: 0,
      lastAppliedVersion: 1,
      message: 'Graph agent is seeding the first graph frame.',
      phase: 'drafting',
      trigger: 'initial',
    });
    setPhase('researching');
    setReasoning('');
    setStatusMessage(
      'Research agent is gathering evidence. Graph agent is mutating the knowledge graph.',
    );
    setStepSummaries([]);
    setToolEvents([]);

    void requestGraphRefresh({
      awaitResult: false,
      basedOnStep: 0,
      trigger: 'initial',
      message: 'Graph agent is seeding the first graph frame.',
    });

    let analysisBuffer = '';
    const researchAbortController = new AbortController();

    researchAbortControllerRef.current = researchAbortController;

    try {
      const agent = createLandscapeUiAgent({
        onFinish(event) {
          if (runId !== runIdRef.current) {
            return;
          }

          const nextFinishSummary = {
            finishReason: event.finishReason,
            reasoningPreview: compactText(
              getLastNonEmptyText(event.steps.map((step) => step.reasoningText)),
            ),
            stepCount: event.steps.length,
            toolCalls: event.steps.flatMap((step) =>
              step.toolCalls.map((toolCall) => summarizeTool(toolCall.toolName, toolCall.input)),
            ),
            toolResults: event.steps.flatMap((step) =>
              step.toolResults.map((toolResult) =>
                summarizeTool(toolResult.toolName, toolResult.input, toolResult.output),
              ),
            ),
            totalUsage: summarizeUsage(event.totalUsage),
          } satisfies FinishSummary;

          finishSummaryRef.current = nextFinishSummary;
          discoveriesRef.current = event.discoveries;
          setFinishSummary(nextFinishSummary);
        },
        onStepFinish(step) {
          if (runId !== runIdRef.current) {
            return;
          }

          const nextSummary = {
            finishReason: step.finishReason,
            reasoningPreview: compactText(step.reasoningText),
            sourceCount: step.sources.length,
            stepNumber: step.stepNumber,
            textPreview: compactText(step.text),
            toolCalls: step.toolCalls.map((toolCall) =>
              summarizeTool(toolCall.toolName, toolCall.input),
            ),
            toolResults: step.toolResults.map((toolResult) =>
              summarizeTool(toolResult.toolName, toolResult.input, toolResult.output),
            ),
            usage: summarizeUsage(step.usage),
          } satisfies StepSummary;

          stepSummariesRef.current = [...stepSummariesRef.current, nextSummary];
          discoveriesRef.current = step.discoveries;
          setStepSummaries(stepSummariesRef.current);
          setStatusMessage(
            `Research step ${step.stepNumber + 1} finished. Graph agent is expanding the knowledge graph.`,
          );
          void requestGraphRefresh({
            awaitResult: false,
            basedOnStep: step.stepNumber + 1,
            trigger: 'step',
            message: `Graph agent is redrawing from research step ${step.stepNumber + 1}.`,
          });
        },
      });
      const result = await agent.stream({
        abortSignal: researchAbortController.signal,
        prompt: trimmedPrompt,
      });

      for await (const part of result.fullStream) {
        if (runId !== runIdRef.current) {
          return;
        }

        switch (part.type) {
          case 'reasoning-delta':
            startTransition(() => {
              setReasoning((currentReasoning) => `${currentReasoning}${part.text}`);
            });
            break;
          case 'text-delta':
            analysisBuffer += part.text;
            analysisRef.current = analysisBuffer;
            startTransition(() => {
              setAnalysis((currentAnalysis) => `${currentAnalysis}${part.text}`);
            });
            break;
          case 'tool-call': {
            const nextEvents = upsertToolEvent(toolEventsRef.current, {
              inputPreview: describeToolInput(part.input),
              state: 'running',
              toolCallId: part.toolCallId,
              toolName: part.toolName,
            });

            toolEventsRef.current = nextEvents;
            setToolEvents(nextEvents);
            setStatusMessage(`Research agent is running ${part.toolName}.`);
            break;
          }
          case 'tool-error': {
            const nextEvents = upsertToolEvent(toolEventsRef.current, {
              inputPreview: describeToolInput(part.input),
              outputPreview: describeError(part.error),
              state: 'error',
              toolCallId: part.toolCallId,
              toolName: part.toolName,
            });

            toolEventsRef.current = nextEvents;
            setToolEvents(nextEvents);
            break;
          }
          case 'tool-result': {
            const nextEvents = upsertToolEvent(toolEventsRef.current, {
              inputPreview: describeToolInput(part.input),
              outputPreview: describeToolOutput(part.output),
              state: 'completed',
              toolCallId: part.toolCallId,
              toolName: part.toolName,
            });
            const nextEvidence = mergeEvidenceItems(
              evidenceRef.current,
              extractEvidenceItems(part.input, part.output),
            );

            toolEventsRef.current = nextEvents;
            evidenceRef.current = nextEvidence;
            setToolEvents(nextEvents);
            setEvidenceItems(nextEvidence);
            void requestGraphRefresh({
              awaitResult: false,
              basedOnStep: stepSummariesRef.current.length,
              evidenceCount: nextEvidence.length,
              trigger: 'evidence',
              message: `Graph agent is charting ${nextEvidence.length} evidence cards into the graph.`,
            });
            break;
          }
          case 'finish':
            setStatusMessage(
              `Research finished with ${part.finishReason}. Graph agent is assembling the final graph.`,
            );
            break;
          default:
            break;
        }
      }

      if (runId !== runIdRef.current) {
        return;
      }

      const finalAnalysis = analysisBuffer.trim();

      if (finalAnalysis.length === 0) {
        throw new Error('The research agent completed without producing a usable analysis.');
      }

      analysisRef.current = finalAnalysis;
      researchCompleteRef.current = true;
      setPhase('composing');
      setStatusMessage('Research complete. Graph agent is assembling the final graph.');

      const finalGraph = await requestGraphRefresh({
        awaitResult: true,
        basedOnStep: stepSummariesRef.current.length,
        trigger: 'final',
        message: 'Graph agent is assembling the final graph.',
      });

      if (runId !== runIdRef.current || exitRequestedRef.current) {
        finishRun(exitCodeRef.current);
        return;
      }

      setPhase('ready');
      setStatusMessage(
        finalGraph == null ? 'Graph ready.' : finalGraph.mutationSummary || 'Graph ready.',
      );
      setErrorMessage(undefined);

      if (exitOnComplete) {
        finishRun(0);
      }
    } catch (error) {
      if (runId !== runIdRef.current) {
        return;
      }

      if (exitRequestedRef.current || isAbortError(error)) {
        finishRun(exitCodeRef.current);
        return;
      }

      const message = describeError(error);

      setErrorMessage(message);
      setPhase('error');
      setStatusMessage(message);
      setGraphAgentState({
        eventCount: 0,
        lastAppliedVersion: graphVersionRef.current,
        message,
        phase: 'error',
        trigger: 'final',
      });

      if (exitOnComplete) {
        finishRun(1);
      }
    } finally {
      if (researchAbortControllerRef.current === researchAbortController) {
        researchAbortControllerRef.current = undefined;
      }

      if (exitRequestedRef.current) {
        finishRun(exitCodeRef.current);
      }
    }
  });

  useEffect(() => {
    if (!prompt || autoStartedRef.current) {
      return;
    }

    autoStartedRef.current = true;
    void runPrompt(prompt);
  }, [prompt]);

  const wideLayout = terminalSize.columns >= 132;
  const previewWidth = wideLayout
    ? Math.max(82, Math.floor(terminalSize.columns * 0.68))
    : terminalSize.columns;
  const sidebarWidth = wideLayout
    ? Math.max(42, terminalSize.columns - previewWidth - 1)
    : terminalSize.columns;
  const previewInnerWidth = previewWidth - 4;
  const sidebarInnerWidth = sidebarWidth - 4;
  const previewLineBudget = wideLayout
    ? Math.max(22, terminalSize.rows - 8)
    : Math.max(18, Math.floor(terminalSize.rows * 0.5));
  const researchLineBudget = wideLayout
    ? Math.max(12, terminalSize.rows - (showReasoning ? 26 : 22))
    : 14;
  const reasoningLineBudget = showReasoning ? Math.max(8, Math.floor(terminalSize.rows * 0.2)) : 0;
  const analysisLines = useMemo(
    () =>
      formatTextPreview(
        deferredAnalysis,
        sidebarInnerWidth,
        researchLineBudget,
        'The research brief will stream here after the agent starts.',
      ),
    [deferredAnalysis, researchLineBudget, sidebarInnerWidth],
  );
  const reasoningLines = useMemo(
    () =>
      showReasoning
        ? formatTextPreview(
            deferredReasoning,
            sidebarInnerWidth,
            reasoningLineBudget,
            'Reasoning traces are enabled, but the model has not emitted any yet.',
          )
        : [],
    [deferredReasoning, reasoningLineBudget, showReasoning, sidebarInnerWidth],
  );
  const graphAgentLines = useMemo(
    () =>
      buildGraphAgentLines(
        graphAgentState,
        graph,
        graphPreview,
        devToolsInfo.generationsPath,
        sidebarInnerWidth,
      ),
    [devToolsInfo.generationsPath, graph, graphAgentState, graphPreview, sidebarInnerWidth],
  );
  const evidenceLines = useMemo(
    () => buildEvidenceLines(evidenceItems, sidebarInnerWidth),
    [evidenceItems, sidebarInnerWidth],
  );
  const mutationLines = useMemo(
    () => buildMutationLines(graph, sidebarInnerWidth),
    [graph, sidebarInnerWidth],
  );
  const traceLines = useMemo(
    () =>
      buildTraceLines(stepSummaries, toolEvents, finishSummary, sidebarInnerWidth, showReasoning),
    [finishSummary, showReasoning, sidebarInnerWidth, stepSummaries, toolEvents],
  );
  const signalRailLines = useMemo(
    () =>
      buildStackedPanelLines(
        [
          {
            budget: 5,
            lines: graphAgentLines,
            title: 'Graph agent',
          },
          {
            budget: 4,
            lines: mutationLines,
            title: 'Mutations',
          },
          {
            budget: 4,
            lines: evidenceLines,
            title: 'Evidence',
          },
        ],
        wideLayout ? 13 : 11,
      ),
    [evidenceLines, graphAgentLines, mutationLines, wideLayout],
  );
  const researchRailLines = useMemo(
    () =>
      buildStackedPanelLines(
        [
          {
            budget: showReasoning ? 4 : 5,
            lines: analysisLines,
            preferTail: true,
            title: 'Brief',
          },
          {
            budget: showReasoning ? 3 : 4,
            lines: traceLines,
            preferTail: true,
            title: 'Trace',
          },
          ...(showReasoning
            ? [
                {
                  budget: 3,
                  lines: reasoningLines,
                  preferTail: true,
                  title: 'Reasoning',
                },
              ]
            : []),
        ],
        wideLayout ? 10 : 9,
      ),
    [analysisLines, reasoningLines, showReasoning, traceLines, wideLayout],
  );
  const previewOffset = useMemo(
    () =>
      graphScrollMode === 'auto'
        ? getAutoPreviewOffset(graphPreview.contentHeight, previewLineBudget)
        : clampPreviewOffset(graphPreview.contentHeight, previewLineBudget, graphScrollOffset),
    [graphPreview.contentHeight, graphScrollMode, graphScrollOffset, previewLineBudget],
  );
  const previewLines = useMemo(
    () => getVisiblePreviewLines(graphPreview.lines, previewLineBudget, previewOffset, 'top'),
    [graphPreview.lines, previewLineBudget, previewOffset],
  );
  const previewRangeLabel = useMemo(
    () => formatPreviewRange(graphPreview.contentHeight, previewLineBudget, previewOffset),
    [graphPreview.contentHeight, previewLineBudget, previewOffset],
  );

  useInput((inputKey, key) => {
    if (inputKey === '\u0003' || (key.ctrl && inputKey === 'c')) {
      requestExit(130);
      return;
    }

    if (key.escape && isBusy) {
      requestExit(0);
      return;
    }

    if ((inputKey === 'q' || inputKey === 'Q') && isBusy) {
      requestExit(0);
      return;
    }

    const maxOffset = Math.max(0, graphPreview.contentHeight - previewLineBudget);

    if (maxOffset === 0) {
      return;
    }

    const lineJump = 3;
    const pageJump = Math.max(6, Math.floor(previewLineBudget * 0.75));
    let nextOffset: number | undefined;

    if (key.pageDown || (key.ctrl && inputKey === 'd')) {
      nextOffset = previewOffset + pageJump;
    } else if (key.pageUp || (key.ctrl && inputKey === 'u')) {
      nextOffset = previewOffset - pageJump;
    } else if ((key.downArrow || inputKey === 'j') && isBusy) {
      nextOffset = previewOffset + lineJump;
    } else if ((key.upArrow || inputKey === 'k') && isBusy) {
      nextOffset = previewOffset - lineJump;
    } else if (key.home) {
      nextOffset = 0;
    } else if (key.end) {
      nextOffset = maxOffset;
    } else if (inputKey === 'a' || inputKey === 'A') {
      setGraphScrollMode('auto');
      setGraphScrollOffset(0);
      return;
    } else {
      return;
    }

    setGraphScrollMode('manual');
    setGraphScrollOffset(
      clampPreviewOffset(graphPreview.contentHeight, previewLineBudget, nextOffset),
    );
  });

  useEffect(() => {
    if (graphScrollMode !== 'manual') {
      return;
    }

    setGraphScrollOffset((currentOffset) =>
      clampPreviewOffset(graphPreview.contentHeight, previewLineBudget, currentOffset),
    );
  }, [graphPreview.contentHeight, graphScrollMode, previewLineBudget]);

  useEffect(() => {
    const currentRenderId = graphRenderRunIdRef.current + 1;
    const artifactDir = resolveArtifactDir();

    graphRenderRunIdRef.current = currentRenderId;
    previewPendingRequestRef.current = {
      artifactDir,
      devTools: devToolsInfo,
      graph,
      height: previewLineBudget,
      persistPng: phase === 'ready' || graphAgentState.trigger === 'final',
      renderId: currentRenderId,
      width: previewInnerWidth,
    };
    void flushPreviewRenderQueue();
  }, [devToolsInfo, graph, graphAgentState.trigger, phase, previewInnerWidth, previewLineBudget]);

  return (
    <Box flexDirection="column">
      <ShellPanel title="Knowledge Graph Agent Demo" width={terminalSize.columns}>
        <Box flexDirection="column">
          <Box columnGap={1}>
            <StatusBadge phase={phase} />
            <Text dimColor>{statusMessage}</Text>
          </Box>
          <Text dimColor>
            Two-agent flow: the research agent gathers evidence while the graph agent mutates a live
            knowledge graph, writes SVG and PNG artifacts, and streams the graph workspace into the
            primary pane.
          </Text>
        </Box>
      </ShellPanel>

      <Box flexDirection={wideLayout ? 'row' : 'column'}>
        <Box flexDirection="column" marginRight={wideLayout ? 1 : 0} width={previewWidth}>
          <ShellPanel
            title="Live Knowledge Graph"
            subtitle={buildPreviewSubtitle(
              graph.nodes.length,
              graph.edges.length,
              previewRangeLabel,
            )}
            width={previewWidth}
          >
            <LineBlock lines={previewLines} />
          </ShellPanel>
        </Box>

        <Box flexDirection="column" width={sidebarWidth}>
          <ShellPanel
            title="Prompt"
            subtitle={promptLabel ? 'Current run prompt' : 'Edit and press Enter to start'}
            width={sidebarWidth}
          >
            <Box flexDirection="column">
              <TextInput
                focus={!isBusy}
                onChange={setInput}
                onSubmit={(value) => {
                  void runPrompt(value);
                }}
                placeholder="Map a therapeutic area into categories, manufacturers, and drugs."
                value={input}
              />
              {phase === 'idle' ? (
                <Box marginTop={1} flexDirection="column">
                  <Text dimColor>Suggested prompts:</Text>
                  {SUGGESTED_PROMPTS.map((suggestedPrompt, index) => (
                    <Text dimColor key={suggestedPrompt}>
                      {index + 1}. {suggestedPrompt}
                    </Text>
                  ))}
                </Box>
              ) : (
                <Text dimColor>Press Enter after editing the prompt to run another pass.</Text>
              )}
            </Box>
          </ShellPanel>

          <ShellPanel
            title="Signal Rail"
            subtitle="Graph mutations and evidence"
            width={sidebarWidth}
          >
            <LineBlock lines={signalRailLines} />
          </ShellPanel>

          <ShellPanel title="Research Rail" subtitle="Brief and trace" width={sidebarWidth}>
            <LineBlock lines={researchRailLines} />
          </ShellPanel>

          {errorMessage ? (
            <ShellPanel title="Error" subtitle="Latest failure" width={sidebarWidth}>
              <Text color="redBright">{errorMessage}</Text>
            </ShellPanel>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

function ShellPanel({
  children,
  subtitle,
  title,
  width,
}: {
  children: ReactNode;
  subtitle?: string;
  title: string;
  width: number;
}) {
  return (
    <Box borderStyle="round" flexDirection="column" marginBottom={1} paddingX={1} width={width}>
      <Text color="cyanBright">
        {title}
        {subtitle ? <Text color="gray">{`  ${subtitle}`}</Text> : null}
      </Text>
      <Box flexDirection="column">{children}</Box>
    </Box>
  );
}

function StatusBadge({ phase }: { phase: Phase }) {
  const color = getPhaseColor(phase);

  return (
    <Box>
      <Text color={color}>
        {phase === 'researching' || phase === 'composing' ? <Spinner type="dots" /> : null}
        {phase === 'researching' || phase === 'composing' ? ' ' : ''}[{phase}]
      </Text>
    </Box>
  );
}

function LineBlock({ lines }: { lines: string[] }) {
  const keyedLines = useMemo(() => getKeyedLines(lines), [lines]);

  return (
    <Box flexDirection="column">
      {keyedLines.map(({ key, line }) => (
        <Text key={key}>{line.length > 0 ? line : ' '}</Text>
      ))}
    </Box>
  );
}

function buildPreviewSubtitle(nodeCount: number, edgeCount: number, rangeLabel: string) {
  return `artifact workspace • ${nodeCount} nodes • ${edgeCount} edges • ${rangeLabel} • PgUp/PgDn scroll • a auto • Esc/q quit`;
}

function formatPreviewRange(contentHeight: number, viewportHeight: number, offset: number) {
  if (contentHeight <= viewportHeight) {
    return `full graph (${contentHeight} rows)`;
  }

  const start = offset + 1;
  const end = Math.min(contentHeight, offset + viewportHeight);

  return `${start}-${end} of ${contentHeight}`;
}

function buildEvidenceLines(evidenceItems: EvidenceItem[], width: number) {
  if (evidenceItems.length === 0) {
    return ['No evidence cards yet.'];
  }

  const lines = ['Recent evidence'];

  for (const item of evidenceItems.slice(-5)) {
    lines.push(...formatTextPreview(`• ${item.title}`, width, 2, ''));

    if (item.snippet) {
      lines.push(...formatTextPreview(item.snippet, width - 2, 2, '').map((line) => `  ${line}`));
    } else {
      lines.push(...formatTextPreview(item.query, width - 2, 2, '').map((line) => `  ${line}`));
    }
  }

  return lines;
}

function buildGraphAgentLines(
  graphAgentState: GraphAgentState,
  graph: KnowledgeGraph,
  graphPreview: GraphPreviewFrame,
  devToolsPath: string,
  width: number,
) {
  const lines = [
    `status: ${graphAgentState.phase}`,
    `trigger/version: ${graphAgentState.trigger ?? 'initial'} / ${graphAgentState.lastAppliedVersion}`,
    `graph: ${graph.nodes.length} nodes • ${graph.edges.length} edges • ${graph.evidence.length} evidence`,
    `message: ${compactText(graphAgentState.message, 96) ?? graphAgentState.message}`,
    `summary: ${compactText(graph.summary, 96) ?? graph.summary}`,
  ];

  if (graphAgentState.basedOnStep != null) {
    lines.splice(2, 0, `research step: ${graphAgentState.basedOnStep}`);
  }

  if (graphAgentState.eventCount > 0) {
    lines.splice(3, 0, `mutations: ${graphAgentState.eventCount} in last pass`);
  }

  if (
    graph.lastAgentNote &&
    compactText(graph.lastAgentNote, 96) !== compactText(graph.summary, 96)
  ) {
    lines.push(`agent note: ${compactText(graph.lastAgentNote, 96) ?? graph.lastAgentNote}`);
  }

  if (graphPreview.artifactPaths?.svg) {
    lines.push(`live svg: ${formatArtifactPath(graphPreview.artifactPaths.svg)}`);
  }

  if (graphPreview.artifactPaths?.png) {
    lines.push(`png snapshot: ${formatArtifactPath(graphPreview.artifactPaths.png)}`);
  }

  lines.push(`devtools: ${formatArtifactPath(devToolsPath)}`);

  return lines.flatMap((line) => formatTextPreview(line, width, 2, ''));
}

function buildMutationLines(graph: KnowledgeGraph, width: number) {
  if (graph.events.length === 0) {
    return ['No graph mutations yet.'];
  }

  const lines = ['Recent mutations'];

  for (const event of graph.events.slice(-6)) {
    lines.push(
      ...formatTextPreview(`• ${event.type} | ${event.trigger} | ${event.summary}`, width, 3, ''),
    );
  }

  return lines;
}

function buildTraceLines(
  stepSummaries: StepSummary[],
  toolEvents: ToolEvent[],
  finishSummary: FinishSummary | undefined,
  width: number,
  showReasoning: boolean,
) {
  const lines: string[] = [];

  if (toolEvents.length > 0) {
    lines.push('Recent tool activity');

    for (const event of toolEvents.slice(-5)) {
      const suffix = event.outputPreview ? ` -> ${event.outputPreview}` : '';

      lines.push(
        ...formatTextPreview(
          `${event.state.toUpperCase()} ${event.toolName}: ${event.inputPreview}${suffix}`,
          width,
          3,
          '',
        ).map((line) => `  ${line}`),
      );
    }
  } else {
    lines.push('No tool activity yet.');
  }

  if (stepSummaries.length > 0) {
    lines.push('', 'Step summaries');

    for (const step of stepSummaries.slice(-4)) {
      lines.push(
        ...formatTextPreview(
          `Step ${step.stepNumber + 1} | ${step.finishReason} | src ${step.sourceCount} | calls ${step.toolCalls.length} | results ${step.toolResults.length} | tok ${formatTokenSummary(step.usage)}`,
          width,
          2,
          '',
        ),
      );

      if (step.textPreview) {
        lines.push(
          ...formatTextPreview(`text: ${step.textPreview}`, width, 3, '').map(
            (line) => `  ${line}`,
          ),
        );
      }

      if (showReasoning && step.reasoningPreview) {
        lines.push(
          ...formatTextPreview(`reasoning: ${step.reasoningPreview}`, width, 3, '').map(
            (line) => `  ${line}`,
          ),
        );
      }
    }
  }

  if (finishSummary) {
    lines.push('', 'Run totals');
    lines.push(
      ...formatTextPreview(
        `finish ${finishSummary.finishReason} | steps ${finishSummary.stepCount} | total tokens ${formatTokenSummary(finishSummary.totalUsage)}`,
        width,
        2,
        '',
      ),
    );

    if (finishSummary.reasoningPreview) {
      lines.push(
        ...formatTextPreview(
          `final reasoning: ${finishSummary.reasoningPreview}`,
          width,
          3,
          '',
        ).map((line) => `  ${line}`),
      );
    }
  }

  return lines;
}

function buildStackedPanelLines(
  sections: Array<{
    budget: number;
    lines: string[];
    preferTail?: boolean;
    title: string;
  }>,
  totalMaxLines: number,
) {
  const lines: string[] = [];

  for (const section of sections) {
    const nextLines = clampSectionLines(
      section.lines,
      Math.max(1, section.budget - 1),
      section.preferTail ?? false,
    );

    if (nextLines.length === 0) {
      continue;
    }

    lines.push(section.title);
    lines.push(...nextLines.map((line) => `  ${line}`));
  }

  return clampSectionLines(lines, totalMaxLines, false);
}

function clampSectionLines(lines: string[], maxLines: number, preferTail: boolean) {
  if (maxLines <= 0) {
    return [];
  }

  if (lines.length <= maxLines) {
    return lines;
  }

  if (maxLines === 1) {
    return ['...'];
  }

  if (preferTail) {
    return ['... earlier lines omitted ...', ...lines.slice(-(maxLines - 1))];
  }

  return [...lines.slice(0, maxLines - 1), '...'];
}

function formatArtifactPath(artifactPath: string) {
  const separator = pathSeparator();
  const normalizedPath = artifactPath.split(separator).join('/');
  const relativePath = path.relative(process.cwd(), artifactPath);

  if (relativePath.length > 0) {
    return relativePath.split(path.sep).join('/');
  }

  const marker = `${separator}.memory${separator}`;
  const markerIndex = artifactPath.indexOf(marker);

  if (markerIndex >= 0) {
    return `.memory/${artifactPath
      .slice(markerIndex + marker.length)
      .split(separator)
      .join('/')}`;
  }

  return normalizedPath;
}

function pathSeparator() {
  return process.platform === 'win32' ? '\\' : '/';
}

function describeGraphPass(
  version: number,
  request: GraphRefreshRequest,
  result: GraphComposerResult,
) {
  const segments = [`Graph pass ${version}`];

  switch (request.trigger) {
    case 'evidence':
      segments.push(
        request.evidenceCount != null
          ? `charted ${request.evidenceCount} evidence cards`
          : 'charted fresh evidence',
      );
      break;
    case 'final':
      segments.push('assembled the final graph');
      break;
    case 'initial':
      segments.push('seeded the initial graph');
      break;
    case 'step':
      segments.push(
        request.basedOnStep != null
          ? `expanded from research step ${request.basedOnStep}`
          : 'expanded from a completed research step',
      );
      break;
    default:
      break;
  }

  segments.push(`with ${result.eventCount} mutation events.`);
  segments.push(result.mutationSummary);

  return segments.join(' ');
}

function summarizeTool(toolName: string, input: unknown, output?: unknown): ToolSummary {
  return {
    input: describeToolInput(input),
    outputPreview: output == null ? undefined : describeToolOutput(output),
    toolName,
  };
}

function summarizeUsage(usage: LanguageModelUsage): UsageSummary {
  return {
    cachedInputTokens: usage.inputTokenDetails.cacheReadTokens ?? usage.cachedInputTokens,
    inputTokens: usage.inputTokens,
    outputTokens: usage.outputTokens,
    reasoningTokens: usage.outputTokenDetails.reasoningTokens ?? usage.reasoningTokens,
    totalTokens: usage.totalTokens,
  };
}

function formatTextPreview(
  text: string | undefined,
  width: number,
  maxLines: number,
  fallback: string,
) {
  const normalized = text?.trim();
  const lines = wrapText(normalized?.length ? normalized : fallback, width);

  if (lines.length <= maxLines) {
    return lines;
  }

  return ['... earlier lines omitted ...', ...lines.slice(-(maxLines - 1))];
}

function formatTokenSummary(usage: UsageSummary) {
  return usage.totalTokens ?? usage.inputTokens ?? usage.outputTokens ?? 0;
}

function getKeyedLines(lines: string[]) {
  const counts = new Map<string, number>();

  return lines.map((line) => {
    const occurrence = (counts.get(line) ?? 0) + 1;

    counts.set(line, occurrence);

    return {
      key: `${line}-${occurrence}`,
      line,
    };
  });
}

function upsertToolEvent(currentEvents: ToolEvent[], nextEvent: ToolEvent) {
  const nextEvents = [...currentEvents];
  const existingIndex = nextEvents.findIndex((event) => event.toolCallId === nextEvent.toolCallId);

  if (existingIndex === -1) {
    nextEvents.push(nextEvent);
  } else {
    nextEvents[existingIndex] = {
      ...nextEvents[existingIndex],
      ...nextEvent,
    };
  }

  return nextEvents.slice(-8);
}

function describeToolInput(input: unknown) {
  if (typeof input === 'object' && input != null) {
    if ('query' in input && typeof input.query === 'string') {
      return input.query;
    }

    if ('company' in input && typeof input.company === 'string') {
      return input.company;
    }
  }

  return compactText(previewValue(input), 120) ?? 'tool input';
}

function describeToolOutput(output: unknown) {
  if (
    typeof output === 'object' &&
    output != null &&
    'results' in output &&
    Array.isArray(output.results)
  ) {
    return `${output.results.length} results`;
  }

  return compactText(previewValue(output), 120);
}

function previewValue(value: unknown) {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function describeError(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function isAbortError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();

  return error.name === 'AbortError' || message.includes('abort');
}

function getLastNonEmptyText(values: Array<string | undefined>) {
  for (let index = values.length - 1; index >= 0; index -= 1) {
    const value = values[index];

    if (value != null && value.trim().length > 0) {
      return value;
    }
  }

  return undefined;
}

function getPhaseColor(phase: Phase) {
  switch (phase) {
    case 'composing':
      return 'magentaBright';
    case 'error':
      return 'redBright';
    case 'idle':
      return 'yellowBright';
    case 'ready':
      return 'greenBright';
    case 'researching':
      return 'cyanBright';
  }
}

function extractEvidenceItems(input: unknown, output: unknown): EvidenceItem[] {
  const query = describeToolInput(input);

  if (
    typeof output !== 'object' ||
    output == null ||
    !('results' in output) ||
    !Array.isArray(output.results)
  ) {
    return [];
  }

  return output.results
    .flatMap((result) => {
      if (typeof result !== 'object' || result == null) {
        return [];
      }

      const title =
        ('title' in result && typeof result.title === 'string' && result.title.trim()) ||
        ('url' in result && typeof result.url === 'string' && result.url.trim()) ||
        query;
      const snippet =
        ('text' in result && typeof result.text === 'string' && compactText(result.text, 160)) ||
        ('snippet' in result &&
          typeof result.snippet === 'string' &&
          compactText(result.snippet, 160)) ||
        ('summary' in result &&
          typeof result.summary === 'string' &&
          compactText(result.summary, 160)) ||
        undefined;
      const url = 'url' in result && typeof result.url === 'string' ? result.url : undefined;

      return [{ query, snippet, title, url }];
    })
    .slice(0, 4);
}

function mergeEvidenceItems(currentItems: EvidenceItem[], nextItems: EvidenceItem[]) {
  const merged = [...currentItems];

  for (const item of nextItems) {
    const existingIndex = merged.findIndex((existingItem) => {
      if (item.url && existingItem.url) {
        return existingItem.url === item.url;
      }

      return existingItem.title === item.title && existingItem.query === item.query;
    });

    if (existingIndex === -1) {
      merged.push(item);
    } else {
      merged[existingIndex] = {
        ...merged[existingIndex],
        ...item,
      };
    }
  }

  return merged.slice(-14);
}

function resolveArtifactDir() {
  const cwd = process.cwd();

  if (cwd.endsWith('packages/ui-agent-demo')) {
    return `${cwd}/artifacts/live`;
  }

  return `${cwd}/packages/ui-agent-demo/artifacts/live`;
}

function wrapText(text: string, width: number) {
  if (text.length <= width) {
    return [text];
  }

  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const candidate = currentLine.length === 0 ? word : `${currentLine} ${word}`;

    if (candidate.length <= width) {
      currentLine = candidate;
      continue;
    }

    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    if (word.length > width) {
      lines.push(word.slice(0, width));
      currentLine = word.slice(width);
      continue;
    }

    currentLine = word;
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines;
}
