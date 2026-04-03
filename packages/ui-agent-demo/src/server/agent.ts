import { webSearch } from '@exalabs/ai-sdk';
import type { AnthropicModelId } from '@nyrra/foundry-ai';
import { loadFoundryConfig } from '@nyrra/foundry-ai';
import { createFoundryAnthropic } from '@nyrra/foundry-ai/anthropic';
import { generateText, type LanguageModelUsage, Output } from 'ai';
import { z } from 'zod';
import { wrapUiAgentModelWithDevTools } from '../devtools.js';
import {
  compactText,
  type GraphComposerResult,
  type GraphMutationEvent,
  type KnowledgeGraph,
  MutableKnowledgeGraph,
  type ResearchDiscoveries,
  type ResearchSnapshot,
} from '../shared/knowledge-graph.js';

const GRAPH_MODEL_ID: AnthropicModelId = 'claude-haiku-4.5';
const config = loadFoundryConfig();
const anthropic = createFoundryAnthropic(config);
const graphModel = wrapUiAgentModelWithDevTools({
  model: anthropic(GRAPH_MODEL_ID),
  modelId: GRAPH_MODEL_ID,
  providerId: 'anthropic',
});
export const UI_AGENT_USE_DETERMINISTIC_DRUG_DATA_ENV = 'UI_AGENT_USE_DETERMINISTIC_DRUG_DATA';

type LandscapeUiAgentOptions = {
  onFinish?: (event: ResearchFinishEvent) => void;
  onStepFinish?: (event: ResearchStepEvent) => void;
};
type GraphPassOptions = {
  abortSignal?: AbortSignal;
  graph: KnowledgeGraph;
  snapshot: ResearchSnapshot;
  trigger: GraphMutationEvent['trigger'];
};
type ResearchToolCall = {
  input: unknown;
  toolName: string;
};
type ResearchToolResult = ResearchToolCall & {
  output: unknown;
};
type ResearchSource = {
  title?: string;
  url?: string;
};
type ResearchStepEvent = {
  discoveries: ResearchDiscoveries;
  finishReason: string;
  reasoningText?: string;
  sources: ResearchSource[];
  stepNumber: number;
  text: string;
  toolCalls: ResearchToolCall[];
  toolResults: ResearchToolResult[];
  usage: LanguageModelUsage;
};
type ResearchFinishEvent = {
  discoveries: ResearchDiscoveries;
  finishReason: string;
  steps: ResearchStepEvent[];
  totalUsage: LanguageModelUsage;
};
type ResearchStreamPart =
  | {
      input: unknown;
      toolCallId: string;
      toolName: string;
      type: 'tool-call';
    }
  | {
      error: unknown;
      input: unknown;
      toolCallId: string;
      toolName: string;
      type: 'tool-error';
    }
  | {
      input: unknown;
      output: unknown;
      toolCallId: string;
      toolName: string;
      type: 'tool-result';
    }
  | {
      text: string;
      type: 'reasoning-delta' | 'text-delta';
    }
  | {
      finishReason: string;
      type: 'finish';
    };
type SearchTool = {
  execute: (input: { query: string }) => Promise<SearchOutput>;
};
type SearchToolName =
  | 'categoriesForDrug'
  | 'drugsForManufacturer'
  | 'manufacturersForCategory'
  | 'webSearch';
type SearchOutput = {
  results?: SearchResult[];
};
type SearchResult = {
  summary?: string;
  text?: string;
  title?: string;
  url?: string;
};
type DiscoveredCategory = {
  label: string;
  summary?: string;
};
type DiscoveredManufacturer = {
  categories: Set<string>;
  drugs: Set<string>;
  label: string;
  summary?: string;
};
type DiscoveredDrug = {
  categories: Set<string>;
  label: string;
  manufacturers: Set<string>;
  summary?: string;
};
type DiscoveryState = {
  categories: Map<string, DiscoveredCategory>;
  drugs: Map<string, DiscoveredDrug>;
  manufacturers: Map<string, DiscoveredManufacturer>;
};
type ExtractCategoriesResult = {
  categories: Array<{
    label: string;
    summary?: string;
  }>;
};
type ExtractManufacturersResult = {
  manufacturers: Array<{
    exampleDrugs: string[];
    label: string;
    summary?: string;
  }>;
};
type ExtractDrugsResult = {
  drugs: Array<{
    categoryLabels: string[];
    label: string;
    summary?: string;
  }>;
};
type ExtractDrugClassificationResult = {
  categoryLabels: string[];
  manufacturerLabels: string[];
  summary?: string;
};
type OpenFdaLabelResult = {
  openfda?: {
    brand_name?: string[];
    generic_name?: string[];
    manufacturer_name?: string[];
    pharm_class_epc?: string[];
  };
  id?: string;
  indications_and_usage?: string[];
};

const DIABETES_CATEGORY_FALLBACKS = [
  'GLP-1 receptor agonists',
  'SGLT2 inhibitors',
  'DPP-4 inhibitors',
  'Biguanides',
  'Sulfonylureas',
  'Thiazolidinediones',
  'Insulins',
];
const DIABETES_CLASS_QUERY_MAP: Record<string, string> = {
  biguanides: 'Biguanide [EPC]',
  'dpp-4 inhibitors': 'Dipeptidyl Peptidase 4 Inhibitor [EPC]',
  'glp-1 receptor agonists': 'GLP-1 Receptor Agonist [EPC]',
  insulins: 'Insulin Analog [EPC]',
  'sglt2 inhibitors': 'Sodium-Glucose Transporter 2 Inhibitor [EPC]',
  sulfonylureas: 'Sulfonylurea [EPC]',
  thiazolidinediones: 'Thiazolidinedione [EPC]',
};
const categoryExtractionSchema = z.object({
  categories: z
    .array(
      z.object({
        label: z.string().min(1).max(72),
        summary: z.string().max(180).optional(),
      }),
    )
    .max(6)
    .default([]),
});
const manufacturerExtractionSchema = z.object({
  manufacturers: z
    .array(
      z.object({
        exampleDrugs: z.array(z.string().min(1).max(72)).max(5).default([]),
        label: z.string().min(1).max(72),
        summary: z.string().max(180).optional(),
      }),
    )
    .max(6)
    .default([]),
});
const drugExtractionSchema = z.object({
  drugs: z
    .array(
      z.object({
        categoryLabels: z.array(z.string().min(1).max(72)).max(4).default([]),
        label: z.string().min(1).max(72),
        summary: z.string().max(180).optional(),
      }),
    )
    .max(8)
    .default([]),
});
const drugClassificationSchema = z.object({
  categoryLabels: z.array(z.string().min(1).max(72)).max(4).default([]),
  manufacturerLabels: z.array(z.string().min(1).max(72)).max(3).default([]),
  summary: z.string().max(180).optional(),
});
const DRUG_TAXONOMY_NODE_IDS = {
  categories: 'category-classes',
  drugs: 'category-drugs',
  manufacturers: 'category-manufacturers',
} as const;

export const demoTools = {
  categoriesForDrug: webSearch({
    contents: {
      summary: {
        query:
          'Identify the therapeutic category, drug class, or subclass for the named drug and mention the manufacturer when the result states it clearly.',
      },
      text: { maxCharacters: 1000 },
    },
    numResults: 5,
    type: 'fast',
  }),
  drugsForManufacturer: webSearch({
    contents: {
      summary: {
        query:
          'Identify the marketed or flagship drugs made by the named manufacturer, with emphasis on diabetes and adjacent metabolic disease categories when relevant.',
      },
      text: { maxCharacters: 1200 },
    },
    numResults: 5,
    type: 'fast',
  }),
  manufacturersForCategory: webSearch({
    contents: {
      summary: {
        query:
          'Identify the key manufacturers or companies making drugs in the named category or class, and include example drugs when the result states them clearly.',
      },
      text: { maxCharacters: 1200 },
    },
    numResults: 6,
    type: 'fast',
  }),
  webSearch: webSearch({
    contents: {
      summary: {
        query:
          'Focus on drug class, manufacturer, and marketed drug relationships only. Exclude efficacy, dosage, side effects, and pricing unless needed to disambiguate a link.',
      },
      text: { maxCharacters: 1200 },
    },
    numResults: 6,
    type: 'fast',
  }),
};

export function createLandscapeUiAgent(options: LandscapeUiAgentOptions = {}) {
  return {
    async stream(input: { abortSignal?: AbortSignal; prompt: string }) {
      return {
        fullStream: createResearchStream({
          abortSignal: input.abortSignal,
          onFinish: options.onFinish,
          onStepFinish: options.onStepFinish,
          prompt: input.prompt,
        }),
      };
    },
  };
}

async function* createResearchStream(input: {
  abortSignal?: AbortSignal;
  onFinish?: (event: ResearchFinishEvent) => void;
  onStepFinish?: (event: ResearchStepEvent) => void;
  prompt: string;
}): AsyncGenerator<ResearchStreamPart> {
  const steps: ResearchStepEvent[] = [];
  const discoveries = createDiscoveryState();
  let totalUsage = createEmptyUsage();
  let toolSequence = 0;

  const runSearch = async (
    toolName: SearchToolName,
    query: string,
  ): Promise<{ output?: SearchOutput; parts: ResearchStreamPart[]; sources: ResearchSource[] }> => {
    throwIfAborted(input.abortSignal);

    const toolCallId = `search-${toolName}-${toolSequence + 1}`;
    const toolInput = { query };

    toolSequence += 1;

    const parts: ResearchStreamPart[] = [
      {
        input: toolInput,
        toolCallId,
        toolName,
        type: 'tool-call',
      },
    ];

    try {
      const deterministicOutput = await maybeExecuteDeterministicDrugSearch({
        prompt: input.prompt,
        query,
        toolName,
      });

      if (deterministicOutput) {
        parts.push({
          input: toolInput,
          output: deterministicOutput,
          toolCallId,
          toolName,
          type: 'tool-result',
        });

        return {
          output: deterministicOutput,
          parts,
          sources: summarizeSearchSources(deterministicOutput),
        };
      }
    } catch {
      // Fall through to the network search path if the deterministic drug-data route fails.
    }

    try {
      const output = await getSearchExecutor(toolName).execute(toolInput);

      parts.push({
        input: toolInput,
        output,
        toolCallId,
        toolName,
        type: 'tool-result',
      });

      return {
        output,
        parts,
        sources: summarizeSearchSources(output),
      };
    } catch (error) {
      const fallbackOutput = await maybeExecuteDrugSearchFallback(toolName, query, error);

      if (fallbackOutput) {
        parts.push({
          input: toolInput,
          output: fallbackOutput,
          toolCallId,
          toolName,
          type: 'tool-result',
        });

        return {
          output: fallbackOutput,
          parts,
          sources: summarizeSearchSources(fallbackOutput),
        };
      }

      parts.push({
        error,
        input: toolInput,
        toolCallId,
        toolName,
        type: 'tool-error',
      });

      return {
        parts,
        sources: [],
      };
    }
  };

  const recordStep = (step: ResearchStepEvent) => {
    steps.push(step);
    input.onStepFinish?.(step);
  };

  const rootQuery = buildCategorySeedQuery(input.prompt);
  const rootSearch = await runSearch('webSearch', rootQuery);

  for (const part of rootSearch.parts) {
    yield part;
  }

  let rootCategories: ExtractCategoriesResult['categories'] = [];
  let rootUsage = createEmptyUsage();

  if (rootSearch.output?.results?.length) {
    const extracted = await extractCategoriesFromSearch({
      abortSignal: input.abortSignal,
      prompt: input.prompt,
      searchOutput: rootSearch.output,
    });

    rootCategories = extracted.object.categories;
    rootUsage = extracted.usage;
    totalUsage = addUsage(totalUsage, extracted.usage);
  }

  addCategories(discoveries, rootCategories);

  const categoryStepText = formatCategoryStep(rootCategories);

  yield {
    text: `${categoryStepText}\n\n`,
    type: 'text-delta',
  };

  recordStep({
    discoveries: buildDiscoverySnapshot(discoveries),
    finishReason: 'tool-calls',
    reasoningText: 'Seeded the crawl from therapeutic categories.',
    sources: rootSearch.sources,
    stepNumber: 0,
    text: categoryStepText,
    toolCalls: [{ input: { query: rootQuery }, toolName: 'webSearch' }],
    toolResults: rootSearch.output
      ? [{ input: { query: rootQuery }, output: rootSearch.output, toolName: 'webSearch' }]
      : [],
    usage: rootUsage,
  });

  const categoryLabels = [...discoveries.categories.values()]
    .slice(0, 6)
    .map((category) => category.label);
  const manufacturerToolCalls: ResearchToolCall[] = [];
  const manufacturerToolResults: ResearchToolResult[] = [];
  const manufacturerSources: ResearchSource[] = [];
  let manufacturerUsage = createEmptyUsage();

  for (const categoryLabel of categoryLabels) {
    const query = buildManufacturersQuery(categoryLabel, input.prompt);
    const search = await runSearch('manufacturersForCategory', query);

    for (const part of search.parts) {
      yield part;
    }

    manufacturerToolCalls.push({
      input: { query },
      toolName: 'manufacturersForCategory',
    });
    manufacturerSources.push(...search.sources);

    if (!search.output?.results?.length) {
      continue;
    }

    manufacturerToolResults.push({
      input: { query },
      output: search.output,
      toolName: 'manufacturersForCategory',
    });

    const extracted = await extractManufacturersFromSearch({
      abortSignal: input.abortSignal,
      categoryLabel,
      prompt: input.prompt,
      searchOutput: search.output,
    });

    manufacturerUsage = addUsage(manufacturerUsage, extracted.usage);
    totalUsage = addUsage(totalUsage, extracted.usage);
    addManufacturers(discoveries, categoryLabel, extracted.object.manufacturers);
  }

  const manufacturerStepText = formatManufacturerStep(discoveries);

  yield {
    text: `${manufacturerStepText}\n\n`,
    type: 'text-delta',
  };

  recordStep({
    discoveries: buildDiscoverySnapshot(discoveries),
    finishReason: 'tool-calls',
    reasoningText: 'Expanded seed categories into manufacturers and example drugs.',
    sources: manufacturerSources,
    stepNumber: 1,
    text: manufacturerStepText,
    toolCalls: manufacturerToolCalls,
    toolResults: manufacturerToolResults,
    usage: manufacturerUsage,
  });

  const manufacturerTargets = [...discoveries.manufacturers.values()]
    .flatMap((manufacturer) => {
      const categories =
        manufacturer.categories.size > 0 ? [...manufacturer.categories] : [undefined];

      return categories.map((categoryLabel) => ({
        categoryLabel,
        manufacturerLabel: manufacturer.label,
      }));
    })
    .slice(0, 14);
  const drugToolCalls: ResearchToolCall[] = [];
  const drugToolResults: ResearchToolResult[] = [];
  const drugSources: ResearchSource[] = [];
  let drugUsage = createEmptyUsage();

  for (const target of manufacturerTargets) {
    const query = buildDrugsQuery(target.manufacturerLabel, input.prompt, target.categoryLabel);
    const search = await runSearch('drugsForManufacturer', query);

    for (const part of search.parts) {
      yield part;
    }

    drugToolCalls.push({
      input: { query },
      toolName: 'drugsForManufacturer',
    });
    drugSources.push(...search.sources);

    if (!search.output?.results?.length) {
      continue;
    }

    drugToolResults.push({
      input: { query },
      output: search.output,
      toolName: 'drugsForManufacturer',
    });

    const extracted = await extractDrugsFromSearch({
      abortSignal: input.abortSignal,
      categoryLabel: target.categoryLabel,
      manufacturerLabel: target.manufacturerLabel,
      prompt: input.prompt,
      searchOutput: search.output,
    });

    drugUsage = addUsage(drugUsage, extracted.usage);
    totalUsage = addUsage(totalUsage, extracted.usage);
    addDrugs(discoveries, target.manufacturerLabel, extracted.object.drugs);
  }

  const drugStepText = formatDrugStep(discoveries);

  yield {
    text: `${drugStepText}\n\n`,
    type: 'text-delta',
  };

  recordStep({
    discoveries: buildDiscoverySnapshot(discoveries),
    finishReason: 'tool-calls',
    reasoningText: 'Expanded manufacturers into linked drugs.',
    sources: drugSources,
    stepNumber: 2,
    text: drugStepText,
    toolCalls: drugToolCalls,
    toolResults: drugToolResults,
    usage: drugUsage,
  });

  const backlinkDrugLabels = [...discoveries.drugs.values()]
    .filter((drug) => drug.categories.size === 0 || drug.manufacturers.size === 0)
    .slice(0, 8)
    .map((drug) => drug.label);
  const backlinkToolCalls: ResearchToolCall[] = [];
  const backlinkToolResults: ResearchToolResult[] = [];
  const backlinkSources: ResearchSource[] = [];
  let backlinkUsage = createEmptyUsage();

  for (const drugLabel of backlinkDrugLabels) {
    const query = buildDrugCategoryQuery(drugLabel, input.prompt);
    const search = await runSearch('categoriesForDrug', query);

    for (const part of search.parts) {
      yield part;
    }

    backlinkToolCalls.push({
      input: { query },
      toolName: 'categoriesForDrug',
    });
    backlinkSources.push(...search.sources);

    if (!search.output?.results?.length) {
      continue;
    }

    backlinkToolResults.push({
      input: { query },
      output: search.output,
      toolName: 'categoriesForDrug',
    });

    const extracted = await extractDrugClassificationFromSearch({
      abortSignal: input.abortSignal,
      drugLabel,
      prompt: input.prompt,
      searchOutput: search.output,
    });

    backlinkUsage = addUsage(backlinkUsage, extracted.usage);
    totalUsage = addUsage(totalUsage, extracted.usage);
    applyDrugClassification(discoveries, drugLabel, extracted.object);
  }

  const backlinkStepText = formatBacklinkStep(discoveries);

  yield {
    text: `${backlinkStepText}\n\n`,
    type: 'text-delta',
  };

  recordStep({
    discoveries: buildDiscoverySnapshot(discoveries),
    finishReason: 'tool-calls',
    reasoningText: 'Back-linked drugs to categories and manufacturers where gaps remained.',
    sources: backlinkSources,
    stepNumber: 3,
    text: backlinkStepText,
    toolCalls: backlinkToolCalls,
    toolResults: backlinkToolResults,
    usage: backlinkUsage,
  });

  const finalSummary = buildFinalResearchSummary(discoveries);

  yield {
    text: finalSummary,
    type: 'text-delta',
  };

  const finishEvent: ResearchFinishEvent = {
    discoveries: buildDiscoverySnapshot(discoveries),
    finishReason: 'stop',
    steps,
    totalUsage,
  };

  input.onFinish?.(finishEvent);

  yield {
    finishReason: 'stop',
    type: 'finish',
  };
}

function getSearchExecutor(toolName: SearchToolName): SearchTool {
  switch (toolName) {
    case 'categoriesForDrug':
      return demoTools.categoriesForDrug as unknown as SearchTool;
    case 'drugsForManufacturer':
      return demoTools.drugsForManufacturer as unknown as SearchTool;
    case 'manufacturersForCategory':
      return demoTools.manufacturersForCategory as unknown as SearchTool;
    case 'webSearch':
      return demoTools.webSearch as unknown as SearchTool;
  }
}

function createDiscoveryState(): DiscoveryState {
  return {
    categories: new Map(),
    drugs: new Map(),
    manufacturers: new Map(),
  };
}

function buildDiscoverySnapshot(discoveries: DiscoveryState): ResearchDiscoveries {
  return {
    categories: [...discoveries.categories.values()]
      .map((category) => ({
        label: category.label,
        summary: category.summary,
      }))
      .sort((left, right) => left.label.localeCompare(right.label)),
    drugs: [...discoveries.drugs.values()]
      .map((drug) => ({
        categories: [...drug.categories].sort((left, right) => left.localeCompare(right)),
        label: drug.label,
        manufacturers: [...drug.manufacturers].sort((left, right) => left.localeCompare(right)),
        summary: drug.summary,
      }))
      .sort((left, right) => left.label.localeCompare(right.label)),
    manufacturers: [...discoveries.manufacturers.values()]
      .map((manufacturer) => ({
        categories: [...manufacturer.categories].sort((left, right) => left.localeCompare(right)),
        drugs: [...manufacturer.drugs].sort((left, right) => left.localeCompare(right)),
        label: manufacturer.label,
        summary: manufacturer.summary,
      }))
      .sort((left, right) => left.label.localeCompare(right.label)),
  };
}

function addCategories(
  discoveries: DiscoveryState,
  categories: ExtractCategoriesResult['categories'],
) {
  for (const category of categories) {
    const label = cleanLabel(category.label);

    if (!label) {
      continue;
    }

    const key = discoveryKey(label);
    const existing = discoveries.categories.get(key);

    discoveries.categories.set(key, {
      label,
      summary: category.summary ?? existing?.summary,
    });
  }
}

function addManufacturers(
  discoveries: DiscoveryState,
  categoryLabel: string,
  manufacturers: ExtractManufacturersResult['manufacturers'],
) {
  const normalizedCategory = cleanLabel(categoryLabel);

  if (normalizedCategory) {
    addCategories(discoveries, [{ label: normalizedCategory }]);
  }

  for (const manufacturer of manufacturers) {
    const manufacturerLabel = cleanLabel(manufacturer.label);

    if (!manufacturerLabel) {
      continue;
    }

    const manufacturerKey = discoveryKey(manufacturerLabel);
    const existingManufacturer = discoveries.manufacturers.get(manufacturerKey);
    const categorySet = existingManufacturer?.categories ?? new Set<string>();
    const drugSet = existingManufacturer?.drugs ?? new Set<string>();

    if (normalizedCategory) {
      categorySet.add(normalizedCategory);
    }

    discoveries.manufacturers.set(manufacturerKey, {
      categories: categorySet,
      drugs: drugSet,
      label: manufacturerLabel,
      summary: manufacturer.summary ?? existingManufacturer?.summary,
    });

    for (const drugLabelCandidate of manufacturer.exampleDrugs) {
      const drugLabel = cleanLabel(drugLabelCandidate);

      if (!drugLabel) {
        continue;
      }

      const drugKey = discoveryKey(drugLabel);
      const existingDrug = discoveries.drugs.get(drugKey);
      const drugCategories = existingDrug?.categories ?? new Set<string>();
      const drugManufacturers = existingDrug?.manufacturers ?? new Set<string>();

      if (normalizedCategory) {
        drugCategories.add(normalizedCategory);
      }

      drugManufacturers.add(manufacturerLabel);
      drugSet.add(drugLabel);
      discoveries.drugs.set(drugKey, {
        categories: drugCategories,
        label: drugLabel,
        manufacturers: drugManufacturers,
        summary: existingDrug?.summary,
      });
    }
  }
}

function addDrugs(
  discoveries: DiscoveryState,
  manufacturerLabel: string,
  drugs: ExtractDrugsResult['drugs'],
) {
  const normalizedManufacturer = cleanLabel(manufacturerLabel);

  if (!normalizedManufacturer) {
    return;
  }

  const manufacturerKey = discoveryKey(normalizedManufacturer);
  const manufacturer =
    discoveries.manufacturers.get(manufacturerKey) ??
    ({
      categories: new Set<string>(),
      drugs: new Set<string>(),
      label: normalizedManufacturer,
    } satisfies DiscoveredManufacturer);

  for (const drug of drugs) {
    const drugLabel = cleanLabel(drug.label);

    if (!drugLabel) {
      continue;
    }

    manufacturer.drugs.add(drugLabel);

    const drugKey = discoveryKey(drugLabel);
    const existingDrug = discoveries.drugs.get(drugKey);
    const categories = existingDrug?.categories ?? new Set<string>();
    const manufacturers = existingDrug?.manufacturers ?? new Set<string>();

    manufacturers.add(normalizedManufacturer);

    for (const categoryLabel of drug.categoryLabels) {
      const cleanedCategory = cleanLabel(categoryLabel);

      if (!cleanedCategory) {
        continue;
      }

      categories.add(cleanedCategory);
      manufacturer.categories.add(cleanedCategory);
      addCategories(discoveries, [{ label: cleanedCategory }]);
    }

    discoveries.drugs.set(drugKey, {
      categories,
      label: drugLabel,
      manufacturers,
      summary: drug.summary ?? existingDrug?.summary,
    });
  }

  discoveries.manufacturers.set(manufacturerKey, manufacturer);
}

function applyDrugClassification(
  discoveries: DiscoveryState,
  drugLabel: string,
  classification: ExtractDrugClassificationResult,
) {
  const normalizedDrug = cleanLabel(drugLabel);

  if (!normalizedDrug) {
    return;
  }

  const drugKey = discoveryKey(normalizedDrug);
  const existingDrug =
    discoveries.drugs.get(drugKey) ??
    ({
      categories: new Set<string>(),
      label: normalizedDrug,
      manufacturers: new Set<string>(),
    } satisfies DiscoveredDrug);

  for (const categoryLabel of classification.categoryLabels) {
    const cleanedCategory = cleanLabel(categoryLabel);

    if (!cleanedCategory) {
      continue;
    }

    existingDrug.categories.add(cleanedCategory);
    addCategories(discoveries, [{ label: cleanedCategory }]);
  }

  for (const manufacturerLabel of classification.manufacturerLabels) {
    const cleanedManufacturer = cleanLabel(manufacturerLabel);

    if (!cleanedManufacturer) {
      continue;
    }

    existingDrug.manufacturers.add(cleanedManufacturer);
    const manufacturerKey = discoveryKey(cleanedManufacturer);
    const manufacturer =
      discoveries.manufacturers.get(manufacturerKey) ??
      ({
        categories: new Set<string>(),
        drugs: new Set<string>(),
        label: cleanedManufacturer,
      } satisfies DiscoveredManufacturer);

    manufacturer.drugs.add(normalizedDrug);

    for (const category of existingDrug.categories) {
      manufacturer.categories.add(category);
    }

    discoveries.manufacturers.set(manufacturerKey, manufacturer);
  }

  discoveries.drugs.set(drugKey, {
    ...existingDrug,
    summary: classification.summary ?? existingDrug.summary,
  });
}

function buildCategorySeedQuery(prompt: string) {
  return `Identify the major named drug classes, therapeutic categories, or subclasses within this scope: ${prompt}. Focus on category names only, not efficacy, dosage, or side effects.`;
}

function buildManufacturersQuery(categoryLabel: string, prompt: string) {
  return `Within the scope "${prompt}", which companies manufacture or market ${categoryLabel} drugs? Include example drug names only when they are explicitly associated with the manufacturer.`;
}

function buildDrugsQuery(manufacturerLabel: string, prompt: string, categoryLabel?: string) {
  if (categoryLabel) {
    return `Within the scope "${prompt}", what named ${categoryLabel} drugs does ${manufacturerLabel} manufacture or market? Include category names only when the source states them clearly.`;
  }

  return `Within the scope "${prompt}", what named drugs does ${manufacturerLabel} manufacture or market? Include category names only when the source states them clearly.`;
}

function buildDrugCategoryQuery(drugLabel: string, prompt: string) {
  return `Within the scope "${prompt}", what drug class or therapeutic category does ${drugLabel} belong to, and which company manufactures or markets it?`;
}

function formatCategoryStep(categories: ExtractCategoriesResult['categories']) {
  if (categories.length === 0) {
    return 'Seed categories\n- No grounded drug categories were extracted from the initial search yet.';
  }

  return [
    'Seed categories',
    ...categories.map(
      (category) => `- ${category.label}${category.summary ? ` — ${category.summary}` : ''}`,
    ),
  ].join('\n');
}

function formatManufacturerStep(discoveries: DiscoveryState) {
  const manufacturers = [...discoveries.manufacturers.values()].slice(0, 8);

  if (manufacturers.length === 0) {
    return 'Manufacturer expansion\n- No manufacturers were grounded yet.';
  }

  return [
    'Manufacturer expansion',
    ...manufacturers.map((manufacturer) => {
      const categories =
        manufacturer.categories.size > 0
          ? ` | categories: ${[...manufacturer.categories].slice(0, 3).join('; ')}`
          : '';
      const drugs =
        manufacturer.drugs.size > 0
          ? ` | example drugs: ${[...manufacturer.drugs].slice(0, 4).join('; ')}`
          : '';

      return `- ${manufacturer.label}${categories}${drugs}`;
    }),
  ].join('\n');
}

function formatDrugStep(discoveries: DiscoveryState) {
  const drugs = [...discoveries.drugs.values()].slice(0, 10);

  if (drugs.length === 0) {
    return 'Drug expansion\n- No manufacturer-linked drugs were grounded yet.';
  }

  return [
    'Drug expansion',
    ...drugs.map((drug) => {
      const manufacturers =
        drug.manufacturers.size > 0
          ? ` | manufacturers: ${[...drug.manufacturers].slice(0, 3).join('; ')}`
          : '';
      const categories =
        drug.categories.size > 0
          ? ` | categories: ${[...drug.categories].slice(0, 3).join('; ')}`
          : '';

      return `- ${drug.label}${manufacturers}${categories}`;
    }),
  ].join('\n');
}

function formatBacklinkStep(discoveries: DiscoveryState) {
  const incompleteDrugs = [...discoveries.drugs.values()].filter(
    (drug) => drug.categories.size === 0 || drug.manufacturers.size === 0,
  );

  if (incompleteDrugs.length === 0) {
    return 'Back-links\n- All discovered drugs now have at least one manufacturer and one category.';
  }

  return [
    'Back-links',
    ...incompleteDrugs.slice(0, 8).map((drug) => {
      const missing: string[] = [];

      if (drug.manufacturers.size === 0) {
        missing.push('manufacturer');
      }

      if (drug.categories.size === 0) {
        missing.push('category');
      }

      return `- ${drug.label} still needs: ${missing.join(' + ')}`;
    }),
  ].join('\n');
}

function buildFinalResearchSummary(discoveries: DiscoveryState) {
  const categories = [...discoveries.categories.values()].slice(0, 6);
  const manufacturers = [...discoveries.manufacturers.values()].slice(0, 8);
  const drugs = [...discoveries.drugs.values()].slice(0, 12);

  return [
    'Research brief',
    `- categories grounded: ${categories.map((category) => category.label).join(', ') || 'none yet'}`,
    `- manufacturers grounded: ${manufacturers.map((manufacturer) => manufacturer.label).join(', ') || 'none yet'}`,
    `- drugs grounded: ${drugs.map((drug) => drug.label).join(', ') || 'none yet'}`,
    '- graph objective: link every drug to at least one manufacturer and one category before expanding farther.',
  ].join('\n');
}

function cleanLabel(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function createEmptyUsage(): LanguageModelUsage {
  return {
    cachedInputTokens: undefined,
    inputTokenDetails: {
      cacheReadTokens: undefined,
      cacheWriteTokens: undefined,
      noCacheTokens: undefined,
    },
    inputTokens: undefined,
    outputTokenDetails: {
      reasoningTokens: undefined,
      textTokens: undefined,
    },
    outputTokens: undefined,
    raw: undefined,
    reasoningTokens: undefined,
    totalTokens: undefined,
  };
}

function addUsage(left: LanguageModelUsage, right: LanguageModelUsage) {
  return {
    cachedInputTokens: addTokenCount(left.cachedInputTokens, right.cachedInputTokens),
    inputTokenDetails: {
      cacheReadTokens: addTokenCount(
        left.inputTokenDetails.cacheReadTokens,
        right.inputTokenDetails.cacheReadTokens,
      ),
      cacheWriteTokens: addTokenCount(
        left.inputTokenDetails.cacheWriteTokens,
        right.inputTokenDetails.cacheWriteTokens,
      ),
      noCacheTokens: addTokenCount(
        left.inputTokenDetails.noCacheTokens,
        right.inputTokenDetails.noCacheTokens,
      ),
    },
    inputTokens: addTokenCount(left.inputTokens, right.inputTokens),
    outputTokenDetails: {
      reasoningTokens: addTokenCount(
        left.outputTokenDetails.reasoningTokens,
        right.outputTokenDetails.reasoningTokens,
      ),
      textTokens: addTokenCount(
        left.outputTokenDetails.textTokens,
        right.outputTokenDetails.textTokens,
      ),
    },
    outputTokens: addTokenCount(left.outputTokens, right.outputTokens),
    raw: undefined,
    reasoningTokens: addTokenCount(left.reasoningTokens, right.reasoningTokens),
    totalTokens: addTokenCount(left.totalTokens, right.totalTokens),
  };
}

function discoveryKey(value: string) {
  return cleanLabel(value).toLowerCase();
}

function summarizeSearchSources(output: SearchOutput): ResearchSource[] {
  return (
    output.results
      ?.slice(0, 6)
      .flatMap((result) =>
        result.title || result.url ? [{ title: result.title, url: result.url }] : [],
      ) ?? []
  );
}

function searchDigest(output: SearchOutput) {
  return (
    output.results
      ?.slice(0, 6)
      .map((result, index) => {
        const segments = [
          `${index + 1}. ${result.title ?? 'untitled result'}`,
          result.url ? `URL: ${result.url}` : undefined,
          compactText(result.summary ?? result.text, 320),
        ].filter(Boolean);

        return segments.join('\n');
      })
      .join('\n\n') ?? 'No search results.'
  );
}

async function maybeExecuteDeterministicDrugSearch(input: {
  prompt: string;
  query: string;
  toolName: SearchToolName;
}) {
  if (!isDrugLandscapePrompt(input.prompt) || !shouldUseDeterministicDrugData(process.env)) {
    return undefined;
  }

  switch (input.toolName) {
    case 'webSearch':
      return buildCategoryFallbackResults(input.query);
    case 'manufacturersForCategory':
      return searchManufacturersByCategory(extractCategoryFromQuery(input.query));
    case 'drugsForManufacturer':
      return searchDrugsByManufacturer(
        extractManufacturerFromQuery(input.query),
        extractCategoryConstraintFromDrugsQuery(input.query),
      );
    case 'categoriesForDrug':
      return searchDrugClassification(extractDrugFromQuery(input.query));
  }
}

export function shouldUseDeterministicDrugData(
  env: Record<string, string | undefined> = process.env,
) {
  const value = env[UI_AGENT_USE_DETERMINISTIC_DRUG_DATA_ENV]?.trim().toLowerCase();

  return value === '1' || value === 'true' || value === 'on';
}

async function maybeExecuteDrugSearchFallback(
  toolName: SearchToolName,
  query: string,
  error: unknown,
) {
  if (!shouldUseDrugSearchFallback(error)) {
    return undefined;
  }

  switch (toolName) {
    case 'webSearch':
      return buildCategoryFallbackResults(query);
    case 'manufacturersForCategory':
      return searchManufacturersByCategory(extractCategoryFromQuery(query));
    case 'drugsForManufacturer':
      return searchDrugsByManufacturer(
        extractManufacturerFromQuery(query),
        extractCategoryConstraintFromDrugsQuery(query),
      );
    case 'categoriesForDrug':
      return searchDrugClassification(extractDrugFromQuery(query));
  }
}

function isDrugLandscapePrompt(prompt: string) {
  const normalized = prompt.toLowerCase();

  return (
    normalized.includes('drug') ||
    normalized.includes('diabetes') ||
    normalized.includes('glp-1') ||
    normalized.includes('manufacturer')
  );
}

function shouldUseDrugSearchFallback(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();

  return (
    message.includes('exa_api_key') ||
    message.includes('credits limit') ||
    message.includes('no_more_credits') ||
    message.includes('402')
  );
}

function isStructuredFallbackOutput(output: SearchOutput) {
  return (
    output.results?.some(
      (result) =>
        result.url?.includes('api.fda.gov/drug/label') ||
        result.url?.includes('example.local/drug-class'),
    ) ?? false
  );
}

function buildCategoryFallbackResults(query: string): SearchOutput {
  const scope = query.toLowerCase().includes('diabetes')
    ? 'diabetes and metabolic disease'
    : 'the requested therapeutic area';

  return {
    results: DIABETES_CATEGORY_FALLBACKS.map((categoryLabel) => ({
      summary: `${categoryLabel} is a named drug class commonly tracked within ${scope}.`,
      text: `${categoryLabel} is a major category used to organize diabetes drugs for downstream manufacturer and product expansion.`,
      title: categoryLabel,
      url: `https://example.local/drug-class/${encodeURIComponent(categoryLabel.toLowerCase())}`,
    })),
  };
}

async function searchManufacturersByCategory(categoryLabel: string): Promise<SearchOutput> {
  const mappedClass = DIABETES_CLASS_QUERY_MAP[discoveryKey(categoryLabel)] ?? categoryLabel;
  const response = await fetchOpenFda(
    `openfda.pharm_class_epc:"${mappedClass.replace(/"/g, '\\"')}"`,
    8,
  );

  return {
    results: response.map((result) => ({
      summary: buildOpenFdaSummary(result),
      text: buildOpenFdaSummary(result),
      title: `${firstOf(result.openfda?.brand_name) ?? firstOf(result.openfda?.generic_name) ?? 'Unnamed drug'} — ${firstOf(result.openfda?.manufacturer_name) ?? 'Unknown manufacturer'}`,
      url: result.id ? `https://api.fda.gov/drug/label/${result.id}.json` : undefined,
    })),
  };
}

async function searchDrugsByManufacturer(
  manufacturerLabel: string,
  categoryLabel?: string,
): Promise<SearchOutput> {
  const response = await fetchOpenFda(
    `openfda.manufacturer_name:"${manufacturerLabel.replace(/"/g, '\\"')}"`,
    12,
  );
  const relevantResults = response
    .filter(
      (result) =>
        isDiabetesRelevantLabel(result) &&
        manufacturerMatches(result, manufacturerLabel) &&
        matchesExpectedCategory(result, categoryLabel),
    )
    .slice(0, 8);

  return {
    results: relevantResults.map((result) => ({
      summary: buildOpenFdaSummary(result),
      text: buildOpenFdaSummary(result),
      title: `${firstOf(result.openfda?.brand_name) ?? firstOf(result.openfda?.generic_name) ?? 'Unnamed drug'} — ${pickMatchedManufacturer(result, manufacturerLabel) ?? manufacturerLabel}`,
      url: result.id ? `https://api.fda.gov/drug/label/${result.id}.json` : undefined,
    })),
  };
}

async function searchDrugClassification(drugLabel: string): Promise<SearchOutput> {
  const escapedLabel = drugLabel.replace(/"/g, '\\"');
  const response = await fetchOpenFda(`openfda.brand_name:"${escapedLabel}"`, 4);
  const fallbackResponse =
    response.length > 0
      ? response
      : await fetchOpenFda(`openfda.generic_name:"${escapedLabel}"`, 4);

  return {
    results: fallbackResponse.map((result) => ({
      summary: buildOpenFdaSummary(result),
      text: buildOpenFdaSummary(result),
      title: `${drugLabel} classification`,
      url: result.id ? `https://api.fda.gov/drug/label/${result.id}.json` : undefined,
    })),
  };
}

async function fetchOpenFda(search: string, limit: number) {
  const url = new URL('https://api.fda.gov/drug/label.json');

  url.searchParams.set('search', search);
  url.searchParams.set('limit', String(limit));

  const response = await fetch(url.toString());

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error(`OpenFDA error: ${response.status}`);
  }

  const payload = (await response.json()) as { results?: OpenFdaLabelResult[] };

  return payload.results ?? [];
}

function buildOpenFdaSummary(result: OpenFdaLabelResult) {
  const brand = firstOf(result.openfda?.brand_name);
  const generic = firstOf(result.openfda?.generic_name);
  const manufacturer = firstOf(result.openfda?.manufacturer_name);
  const drugClass = firstOf(result.openfda?.pharm_class_epc);
  const indication = compactText(firstOf(result.indications_and_usage), 140);

  return [
    brand ? `brand: ${brand}` : undefined,
    generic ? `generic: ${generic}` : undefined,
    manufacturer ? `manufacturer: ${manufacturer}` : undefined,
    drugClass ? `class: ${drugClass}` : undefined,
    indication ? `indication: ${indication}` : undefined,
  ]
    .filter(Boolean)
    .join(' | ');
}

function extractBrandFromTitle(title: string | undefined) {
  return cleanLabel(title?.split(' — ')[0] ?? '');
}

function extractSummaryField(summary: string | undefined, field: 'class' | 'manufacturer') {
  const match = summary?.match(new RegExp(`${field}:\\s*([^|]+)`, 'i'));

  return cleanLabel(match?.[1] ?? '');
}

function normalizeDrugClassLabel(value: string) {
  const normalized = cleanLabel(value.replace(/\s*\[epc\]\s*/gi, ''));
  const key = discoveryKey(normalized);
  const canonicalMap: Record<string, string> = {
    biguanide: 'Biguanides',
    biguanides: 'Biguanides',
    'dipeptidyl peptidase 4 inhibitor': 'DPP-4 inhibitors',
    'dpp-4 inhibitor': 'DPP-4 inhibitors',
    'dpp-4 inhibitors': 'DPP-4 inhibitors',
    'glp-1 receptor agonist': 'GLP-1 receptor agonists',
    'glp-1 receptor agonists': 'GLP-1 receptor agonists',
    insulin: 'Insulins',
    'insulin analog': 'Insulins',
    insulins: 'Insulins',
    'sglt2 inhibitor': 'SGLT2 inhibitors',
    'sglt2 inhibitors': 'SGLT2 inhibitors',
    'sodium-glucose cotransporter 2 inhibitor': 'SGLT2 inhibitors',
    sulfonylurea: 'Sulfonylureas',
    sulfonylureas: 'Sulfonylureas',
    thiazolidinedione: 'Thiazolidinediones',
    thiazolidinediones: 'Thiazolidinediones',
  };

  return canonicalMap[key] ?? normalized;
}

function extractCategoryFromQuery(query: string) {
  return query.match(/market\s+(.+?)\s+drugs\?/i)?.[1]?.trim() ?? query;
}

function extractManufacturerFromQuery(query: string) {
  return query.match(/does\s+(.+?)\s+manufacture or market/i)?.[1]?.trim() ?? query;
}

function extractCategoryConstraintFromDrugsQuery(query: string) {
  return query.match(/what named\s+(.+?)\s+drugs does/i)?.[1]?.trim();
}

function extractDrugFromQuery(query: string) {
  return query.match(/does\s+(.+?)\s+belong to/i)?.[1]?.trim() ?? query;
}

function matchesExpectedCategory(result: OpenFdaLabelResult, categoryLabel: string | undefined) {
  if (!categoryLabel) {
    return true;
  }

  const expected = normalizeDrugClassLabel(categoryLabel);

  return (
    result.openfda?.pharm_class_epc?.some((value) => normalizeDrugClassLabel(value) === expected) ??
    false
  );
}

function isDiabetesRelevantLabel(result: OpenFdaLabelResult) {
  const classTerms =
    result.openfda?.pharm_class_epc?.some((value) => {
      const normalized = value.toLowerCase();

      return Object.values(DIABETES_CLASS_QUERY_MAP).some((category) =>
        normalized.includes(category.toLowerCase().replace(' [epc]', '')),
      );
    }) ?? false;
  const indicationText = result.indications_and_usage?.join(' ').toLowerCase() ?? '';
  const therapeuticTerms = [
    'type 2 diabetes mellitus',
    'type 1 diabetes mellitus',
    'glycemic control',
    'blood glucose',
    'antihyperglycemic',
  ];
  const indicationTerms = therapeuticTerms.some((term) => indicationText.includes(term));

  return classTerms || indicationTerms;
}

function firstOf(values: string[] | undefined) {
  return values?.[0];
}

function manufacturerMatches(result: OpenFdaLabelResult, manufacturerLabel: string) {
  const target = normalizeManufacturerMatchKey(manufacturerLabel);

  return (
    result.openfda?.manufacturer_name?.some((value) => {
      const candidate = normalizeManufacturerMatchKey(value);

      return candidate === target || candidate.includes(target) || target.includes(candidate);
    }) ?? false
  );
}

function normalizeManufacturerMatchKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function pickMatchedManufacturer(result: OpenFdaLabelResult, manufacturerLabel: string) {
  const target = normalizeManufacturerMatchKey(manufacturerLabel);

  return (
    result.openfda?.manufacturer_name?.find((value) => {
      const candidate = normalizeManufacturerMatchKey(value);

      return candidate === target || candidate.includes(target) || target.includes(candidate);
    }) ?? firstOf(result.openfda?.manufacturer_name)
  );
}

async function extractCategoriesFromSearch(input: {
  abortSignal?: AbortSignal;
  prompt: string;
  searchOutput: SearchOutput;
}) {
  if (isStructuredFallbackOutput(input.searchOutput)) {
    return {
      object: {
        categories:
          input.searchOutput.results
            ?.map((result) => ({
              label: normalizeDrugClassLabel(result.title ?? ''),
              summary: compactText(result.summary, 180),
            }))
            .filter((category) => category.label.length > 0)
            .slice(0, 6) ?? [],
      } satisfies ExtractCategoriesResult,
      usage: createEmptyUsage(),
    };
  }

  return extractStructuredObject({
    abortSignal: input.abortSignal,
    instruction: `Extract the major named drug classes, therapeutic categories, or subclasses relevant to this scope: ${input.prompt}. Return only category names that are explicitly supported by the search digest. Normalize category names to common industry wording.`,
    schema: categoryExtractionSchema,
    searchOutput: input.searchOutput,
  });
}

async function extractManufacturersFromSearch(input: {
  abortSignal?: AbortSignal;
  categoryLabel: string;
  prompt: string;
  searchOutput: SearchOutput;
}) {
  if (isStructuredFallbackOutput(input.searchOutput)) {
    const manufacturers: ExtractManufacturersResult['manufacturers'] = [];

    for (const result of input.searchOutput.results ?? []) {
      const manufacturer = extractSummaryField(result.summary, 'manufacturer');

      if (!manufacturer) {
        continue;
      }

      const drugLabel = extractBrandFromTitle(result.title);

      manufacturers.push({
        exampleDrugs: drugLabel ? [drugLabel] : [],
        label: manufacturer,
        summary: compactText(result.summary, 180),
      });
    }

    return {
      object: {
        manufacturers: manufacturers.slice(0, 6),
      } satisfies ExtractManufacturersResult,
      usage: createEmptyUsage(),
    };
  }

  return extractStructuredObject({
    abortSignal: input.abortSignal,
    instruction: `For the category "${input.categoryLabel}" within the scope "${input.prompt}", extract only the manufacturers or companies clearly associated with this category. Include example drug names only when the same digest supports them.`,
    schema: manufacturerExtractionSchema,
    searchOutput: input.searchOutput,
  });
}

async function extractDrugsFromSearch(input: {
  abortSignal?: AbortSignal;
  categoryLabel?: string;
  manufacturerLabel: string;
  prompt: string;
  searchOutput: SearchOutput;
}) {
  if (isStructuredFallbackOutput(input.searchOutput)) {
    const drugs: ExtractDrugsResult['drugs'] = [];

    for (const result of input.searchOutput.results ?? []) {
      const drugLabel = extractBrandFromTitle(result.title);

      if (!drugLabel) {
        continue;
      }

      drugs.push({
        categoryLabels: [extractSummaryField(result.summary, 'class')]
          .filter(Boolean)
          .map((value) => normalizeDrugClassLabel(value ?? '')),
        label: drugLabel,
        summary: compactText(result.summary, 180),
      });
    }

    return {
      object: {
        drugs: drugs.slice(0, 8),
      } satisfies ExtractDrugsResult,
      usage: createEmptyUsage(),
    };
  }

  return extractStructuredObject({
    abortSignal: input.abortSignal,
    instruction: input.categoryLabel
      ? `For the manufacturer "${input.manufacturerLabel}" within the scope "${input.prompt}", extract named drugs it manufactures or markets in the category "${input.categoryLabel}". Include category labels only when the digest states them clearly.`
      : `For the manufacturer "${input.manufacturerLabel}" within the scope "${input.prompt}", extract named drugs it manufactures or markets. Include category labels only when the digest states them clearly.`,
    schema: drugExtractionSchema,
    searchOutput: input.searchOutput,
  });
}

async function extractDrugClassificationFromSearch(input: {
  abortSignal?: AbortSignal;
  drugLabel: string;
  prompt: string;
  searchOutput: SearchOutput;
}) {
  if (isStructuredFallbackOutput(input.searchOutput)) {
    return {
      object: {
        categoryLabels: [extractSummaryField(input.searchOutput.results?.[0]?.summary, 'class')]
          .filter(Boolean)
          .map((value) => normalizeDrugClassLabel(value ?? '')),
        manufacturerLabels: [
          extractSummaryField(input.searchOutput.results?.[0]?.summary, 'manufacturer'),
        ].filter(Boolean) as string[],
        summary: compactText(input.searchOutput.results?.[0]?.summary, 180),
      } satisfies ExtractDrugClassificationResult,
      usage: createEmptyUsage(),
    };
  }

  return extractStructuredObject({
    abortSignal: input.abortSignal,
    instruction: `For the drug "${input.drugLabel}" within the scope "${input.prompt}", extract the category labels and manufacturer names that are explicitly supported by the digest. Do not guess missing links.`,
    schema: drugClassificationSchema,
    searchOutput: input.searchOutput,
  });
}

async function extractStructuredObject<TSchema extends z.ZodTypeAny>(input: {
  abortSignal?: AbortSignal;
  instruction: string;
  schema: TSchema;
  searchOutput: SearchOutput;
}) {
  throwIfAborted(input.abortSignal);

  const result = await generateText({
    abortSignal: input.abortSignal,
    model: graphModel,
    output: Output.object({
      description: 'Structured drug category, manufacturer, and product discoveries.',
      name: 'drug_graph_discovery',
      schema: input.schema,
    }),
    prompt: [
      'You extract grounded structured drug-market data from web search results.',
      input.instruction,
      'Rules:',
      '- Only include names explicitly supported by the digest.',
      '- Prefer canonical company and drug class names.',
      '- Exclude pricing, efficacy, dosage, side effects, and speculative links.',
      '',
      'Search digest:',
      searchDigest(input.searchOutput),
    ].join('\n'),
  });

  return {
    object: result.output as z.infer<TSchema>,
    usage: normalizeUsage(result.usage),
  };
}

function normalizeUsage(usage: Partial<LanguageModelUsage> | undefined): LanguageModelUsage {
  return {
    cachedInputTokens: usage?.cachedInputTokens,
    inputTokenDetails: {
      cacheReadTokens: usage?.inputTokenDetails?.cacheReadTokens,
      cacheWriteTokens: usage?.inputTokenDetails?.cacheWriteTokens,
      noCacheTokens: usage?.inputTokenDetails?.noCacheTokens,
    },
    inputTokens: usage?.inputTokens ?? 0,
    outputTokenDetails: {
      reasoningTokens: usage?.outputTokenDetails?.reasoningTokens,
      textTokens: usage?.outputTokenDetails?.textTokens,
    },
    outputTokens: usage?.outputTokens ?? 0,
    raw: usage?.raw,
    reasoningTokens: usage?.reasoningTokens,
    totalTokens: usage?.totalTokens ?? 0,
  };
}

function addTokenCount(left: number | undefined, right: number | undefined) {
  return left == null && right == null ? undefined : (left ?? 0) + (right ?? 0);
}

function throwIfAborted(signal: AbortSignal | undefined) {
  if (!signal?.aborted) {
    return;
  }

  const error = new Error('The research crawl was aborted.');

  error.name = 'AbortError';

  throw error;
}

export async function applyKnowledgeGraphPass(
  options: GraphPassOptions,
): Promise<GraphComposerResult> {
  const store = new MutableKnowledgeGraph(options.graph);

  store.attachEvidence(options.snapshot.evidence);
  seedGraphFromResearchSnapshot(store, options.snapshot, options.trigger);
  const seededGraph = store.snapshot();
  const defaultSummary =
    compactText(
      `Materialized ${seededGraph.nodes.length} nodes and ${seededGraph.edges.length} edges from the structured research ledger.`,
      180,
    ) ?? 'Graph materialized from the structured research ledger.';

  try {
    const result = await generateText({
      abortSignal: options.abortSignal,
      maxOutputTokens: 120,
      model: graphModel,
      prompt: [
        'Summarize the current knowledge-graph update in 1-2 terse sentences.',
        `Trigger: ${options.trigger}`,
        `Nodes: ${seededGraph.nodes.length}`,
        `Edges: ${seededGraph.edges.length}`,
        `Evidence items: ${seededGraph.evidence.length}`,
        'Structured ledger excerpt:',
        options.snapshot.analysis.split('\n').slice(0, 18).join('\n'),
      ].join('\n'),
    });
    const summary = compactText(result.text, 180) ?? defaultSummary;

    store.addAgentNote(summary, options.trigger);

    return store.toResult(summary);
  } catch (error) {
    if (isAbortError(error)) {
      throw error;
    }

    const message =
      error instanceof Error
        ? error.message
        : 'Graph summary generation failed after deterministic graph seeding.';

    store.addAgentNote(defaultSummary, options.trigger);

    return store.toResult(
      compactText(`${defaultSummary} Summary generation failed: ${message}`, 180) ?? defaultSummary,
    );
  }
}

function seedGraphFromResearchSnapshot(
  store: MutableKnowledgeGraph,
  snapshot: ResearchSnapshot,
  trigger: GraphMutationEvent['trigger'],
) {
  if (snapshot.discoveries) {
    seedGraphFromStructuredDiscoveries(store, snapshot.discoveries, trigger);
    return;
  }

  let section: 'categories' | 'drugs' | 'manufacturers' | undefined;

  for (const rawLine of snapshot.analysis.split('\n')) {
    const line = rawLine.trim();

    if (line.length === 0) {
      continue;
    }

    if (line === 'Seed categories') {
      section = 'categories';
      continue;
    }

    if (line === 'Manufacturer expansion') {
      section = 'manufacturers';
      continue;
    }

    if (line === 'Drug expansion') {
      section = 'drugs';
      continue;
    }

    if (!line.startsWith('- ')) {
      continue;
    }

    if (section === 'categories') {
      seedCategoryLine(store, line, trigger);
      continue;
    }

    if (section === 'manufacturers') {
      seedManufacturerLine(store, line, trigger);
      continue;
    }

    if (section === 'drugs') {
      seedDrugLine(store, line, trigger);
    }
  }
}

export function seedGraphFromStructuredDiscoveries(
  store: MutableKnowledgeGraph,
  discoveries: ResearchDiscoveries,
  trigger: GraphMutationEvent['trigger'],
) {
  for (const category of discoveries.categories) {
    const categoryId = upsertCategoryNode(store, category.label, category.summary, trigger);

    if (categoryId) {
      linkNodeToTaxonomy(store, DRUG_TAXONOMY_NODE_IDS.categories, categoryId, trigger);
    }
  }

  for (const manufacturer of discoveries.manufacturers) {
    const manufacturerId = upsertManufacturerNode(
      store,
      manufacturer.label,
      manufacturer.summary,
      trigger,
    );

    if (!manufacturerId) {
      continue;
    }

    linkNodeToTaxonomy(store, DRUG_TAXONOMY_NODE_IDS.manufacturers, manufacturerId, trigger);

    for (const drugLabel of manufacturer.drugs) {
      const drugId = upsertDrugNode(store, drugLabel, undefined, trigger);

      if (!drugId) {
        continue;
      }

      linkNodeToTaxonomy(store, DRUG_TAXONOMY_NODE_IDS.drugs, drugId, trigger);
      store.linkManufacturerToDrug(
        {
          drugId,
          manufacturerId,
          summary: manufacturer.summary,
        },
        trigger,
      );
    }

    for (const categoryLabel of manufacturer.categories) {
      const categoryId = upsertCategoryNode(store, categoryLabel, undefined, trigger);

      if (categoryId) {
        linkNodeToTaxonomy(store, DRUG_TAXONOMY_NODE_IDS.categories, categoryId, trigger);
      }
    }
  }

  for (const drug of discoveries.drugs) {
    const drugId = upsertDrugNode(store, drug.label, drug.summary, trigger);

    if (!drugId) {
      continue;
    }

    linkNodeToTaxonomy(store, DRUG_TAXONOMY_NODE_IDS.drugs, drugId, trigger);

    for (const manufacturerLabel of drug.manufacturers) {
      const manufacturerId = upsertManufacturerNode(store, manufacturerLabel, undefined, trigger);

      if (!manufacturerId) {
        continue;
      }

      linkNodeToTaxonomy(store, DRUG_TAXONOMY_NODE_IDS.manufacturers, manufacturerId, trigger);
      store.linkManufacturerToDrug(
        {
          drugId,
          manufacturerId,
          summary: drug.summary,
        },
        trigger,
      );
    }

    for (const categoryLabel of drug.categories) {
      const categoryId = upsertCategoryNode(store, categoryLabel, undefined, trigger);

      if (!categoryId) {
        continue;
      }

      linkNodeToTaxonomy(store, DRUG_TAXONOMY_NODE_IDS.categories, categoryId, trigger);
      store.linkCategoryToDrug(
        {
          categoryId,
          drugId,
          summary: drug.summary,
        },
        trigger,
      );
    }
  }
}

function seedCategoryLine(
  store: MutableKnowledgeGraph,
  line: string,
  trigger: GraphMutationEvent['trigger'],
) {
  const [labelPart, summaryPart] = line.slice(2).split(' — ', 2);
  const categoryId = upsertCategoryNode(
    store,
    normalizeDrugClassLabel(labelPart),
    compactText(summaryPart, 180),
    trigger,
  );

  if (categoryId) {
    linkNodeToTaxonomy(store, DRUG_TAXONOMY_NODE_IDS.categories, categoryId, trigger);
  }
}

function seedManufacturerLine(
  store: MutableKnowledgeGraph,
  line: string,
  trigger: GraphMutationEvent['trigger'],
) {
  const [manufacturerLabel, rest = ''] = line.slice(2).split(' | categories: ', 2);
  const manufacturer = upsertManufacturerNode(
    store,
    manufacturerLabel,
    'Manufacturer discovered in the structured drug crawl.',
    trigger,
  );

  if (!manufacturer) {
    return;
  }
  linkNodeToTaxonomy(store, DRUG_TAXONOMY_NODE_IDS.manufacturers, manufacturer, trigger);

  const [categoriesSegment = '', drugsSegment = ''] = rest.split(' | example drugs: ', 2);
  const categories = splitCsv(categoriesSegment).map((category) =>
    toGraphLabel(normalizeDrugClassLabel(category)),
  );
  const drugs = splitCsv(drugsSegment).map((drug) => toGraphLabel(drug));

  for (const drug of drugs) {
    const drugId = upsertDrugNode(store, drug, 'Drug linked from manufacturer expansion.', trigger);

    if (!drugId) {
      continue;
    }

    linkNodeToTaxonomy(store, DRUG_TAXONOMY_NODE_IDS.drugs, drugId, trigger);
    store.linkManufacturerToDrug(
      {
        drugId,
        manufacturerId: manufacturer,
      },
      trigger,
    );

    for (const category of categories) {
      if (!category) {
        continue;
      }

      const categoryId = upsertCategoryNode(store, category, undefined, trigger);

      if (!categoryId) {
        continue;
      }

      linkNodeToTaxonomy(store, DRUG_TAXONOMY_NODE_IDS.categories, categoryId, trigger);
      store.linkCategoryToDrug(
        {
          categoryId,
          drugId,
        },
        trigger,
      );
    }
  }
}

function seedDrugLine(
  store: MutableKnowledgeGraph,
  line: string,
  trigger: GraphMutationEvent['trigger'],
) {
  const [drugLabel, rest = ''] = line.slice(2).split(' | manufacturers: ', 2);
  const drug = upsertDrugNode(
    store,
    drugLabel,
    'Drug grounded from the structured manufacturer expansion.',
    trigger,
  );

  if (!drug) {
    return;
  }
  linkNodeToTaxonomy(store, DRUG_TAXONOMY_NODE_IDS.drugs, drug, trigger);

  const [manufacturersSegment = '', categoriesSegment = ''] = rest.split(' | categories: ', 2);
  const manufacturers = splitCsv(manufacturersSegment).map((manufacturer) =>
    toGraphLabel(manufacturer),
  );
  const categories = splitCsv(categoriesSegment).map((category) =>
    toGraphLabel(normalizeDrugClassLabel(category)),
  );

  for (const manufacturer of manufacturers) {
    const manufacturerId = upsertManufacturerNode(store, manufacturer, undefined, trigger);

    if (!manufacturerId) {
      continue;
    }

    linkNodeToTaxonomy(store, DRUG_TAXONOMY_NODE_IDS.manufacturers, manufacturerId, trigger);
    store.linkManufacturerToDrug(
      {
        drugId: drug,
        manufacturerId,
      },
      trigger,
    );
  }

  for (const category of categories) {
    if (!category) {
      continue;
    }

    const categoryId = upsertCategoryNode(store, category, undefined, trigger);

    if (!categoryId) {
      continue;
    }

    linkNodeToTaxonomy(store, DRUG_TAXONOMY_NODE_IDS.categories, categoryId, trigger);
    store.linkCategoryToDrug(
      {
        categoryId,
        drugId: drug,
      },
      trigger,
    );
  }
}

function upsertCategoryNode(
  store: MutableKnowledgeGraph,
  label: string,
  summary: string | undefined,
  trigger: GraphMutationEvent['trigger'],
) {
  const nextLabel = toGraphLabel(normalizeDrugClassLabel(label));

  if (!nextLabel) {
    return undefined;
  }

  store.upsertNode(
    {
      kind: 'category',
      label: nextLabel,
      summary,
    },
    trigger,
  );

  return nextLabel;
}

function upsertManufacturerNode(
  store: MutableKnowledgeGraph,
  label: string,
  summary: string | undefined,
  trigger: GraphMutationEvent['trigger'],
) {
  const nextLabel = toGraphLabel(label);

  if (!nextLabel) {
    return undefined;
  }

  store.upsertNode(
    {
      kind: 'company',
      label: nextLabel,
      summary,
    },
    trigger,
  );

  return nextLabel;
}

function upsertDrugNode(
  store: MutableKnowledgeGraph,
  label: string,
  summary: string | undefined,
  trigger: GraphMutationEvent['trigger'],
) {
  const nextLabel = toGraphLabel(label);

  if (!nextLabel) {
    return undefined;
  }

  store.upsertNode(
    {
      kind: 'product',
      label: nextLabel,
      summary,
    },
    trigger,
  );

  return nextLabel;
}

function linkNodeToTaxonomy(
  store: MutableKnowledgeGraph,
  taxonomyId: string,
  nodeId: string,
  trigger: GraphMutationEvent['trigger'],
) {
  store.upsertEdge(
    {
      fromId: taxonomyId,
      label: 'maps',
      relation: 'maps',
      toId: nodeId,
      tone: 'accent',
    },
    trigger,
  );
}

function splitCsv(value: string) {
  return value
    .split(value.includes(';') ? ';' : ',')
    .map((entry) => cleanLabel(entry))
    .filter((entry) => entry.length > 0);
}

function toGraphLabel(value: string) {
  return compactText(cleanLabel(value), 72) ?? '';
}

function isAbortError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const message = error.message.toLowerCase();

  return error.name === 'AbortError' || message.includes('abort');
}
