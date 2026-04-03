import { z } from 'zod';

export const graphNodeKindSchema = z.enum(['focus', 'category', 'product', 'company']);
export const graphRelationSchema = z.enum(['maps', 'contains', 'manufacturer-of']);
export const graphToneSchema = z.enum(['neutral', 'accent', 'positive', 'warning', 'danger']);
export const graphCertaintySchema = z.enum(['low', 'medium', 'high']);
export const graphNodeStatusSchema = z.enum(['seed', 'candidate', 'confirmed', 'deprecated']);

export const evidenceItemSchema = z.object({
  query: z.string(),
  snippet: z.string().optional(),
  title: z.string(),
  url: z.string().optional(),
});

export const graphNodeSchema = z.object({
  aliases: z.array(z.string()).max(8).default([]),
  cluster: z.string().optional(),
  evidenceIds: z.array(z.string()).max(64).default([]),
  id: z.string(),
  kind: graphNodeKindSchema,
  label: z.string(),
  notes: z.array(z.string()).max(6).default([]),
  status: graphNodeStatusSchema.default('confirmed'),
  summary: z.string().optional(),
  tone: graphToneSchema.default('neutral'),
});

export const graphEdgeSchema = z.object({
  certainty: graphCertaintySchema.default('medium'),
  evidenceIds: z.array(z.string()).max(64).default([]),
  fromId: z.string(),
  id: z.string(),
  label: z.string().optional(),
  relation: graphRelationSchema,
  summary: z.string().optional(),
  toId: z.string(),
  tone: graphToneSchema.default('neutral'),
});

export const graphMutationEventSchema = z.object({
  at: z.string(),
  id: z.string(),
  summary: z.string(),
  trigger: z.enum(['initial', 'evidence', 'step', 'final', 'manual']),
  type: z.enum(['node-upserted', 'edge-upserted', 'node-merged', 'node-removed', 'agent-note']),
});

export const knowledgeGraphSchema = z.object({
  edges: z.array(graphEdgeSchema),
  evidence: z.array(evidenceItemSchema.extend({ id: z.string() })),
  events: z.array(graphMutationEventSchema),
  lastAgentNote: z.string().optional(),
  prompt: z.string(),
  rootNodeId: z.string(),
  summary: z.string(),
  title: z.string(),
  updatedAt: z.string(),
  version: z.number().int().nonnegative(),
  nodes: z.array(graphNodeSchema),
});

export const upsertGraphNodeInputSchema = z.object({
  aliases: z.array(z.string()).max(8).optional(),
  cluster: z.string().max(48).optional(),
  evidenceIds: z.array(z.string()).max(12).optional(),
  id: z.string().max(64).optional(),
  kind: graphNodeKindSchema,
  label: z.string().min(1).max(72),
  notes: z.array(z.string().max(120)).max(4).optional(),
  status: graphNodeStatusSchema.optional(),
  summary: z.string().max(180).optional(),
  tone: graphToneSchema.optional(),
});

export const upsertGraphEdgeInputSchema = z.object({
  certainty: graphCertaintySchema.optional(),
  evidenceIds: z.array(z.string()).max(12).optional(),
  fromId: z.string().min(1).max(64),
  label: z.string().max(64).optional(),
  relation: graphRelationSchema,
  summary: z.string().max(180).optional(),
  toId: z.string().min(1).max(64),
  tone: graphToneSchema.optional(),
});

export const linkCategoryToDrugInputSchema = z.object({
  certainty: graphCertaintySchema.optional(),
  evidenceIds: z.array(z.string()).max(12).optional(),
  categoryId: z.string().min(1).max(64),
  drugId: z.string().min(1).max(64),
  summary: z.string().max(180).optional(),
  tone: graphToneSchema.optional(),
});

export const linkManufacturerToDrugInputSchema = z.object({
  certainty: graphCertaintySchema.optional(),
  drugId: z.string().min(1).max(64),
  evidenceIds: z.array(z.string()).max(12).optional(),
  manufacturerId: z.string().min(1).max(64),
  summary: z.string().max(180).optional(),
  tone: graphToneSchema.optional(),
});

export const mergeGraphNodesInputSchema = z.object({
  primaryId: z.string().min(1).max(64),
  reason: z.string().min(1).max(120),
  secondaryId: z.string().min(1).max(64),
});

export const removeGraphNodeInputSchema = z.object({
  id: z.string().min(1).max(64),
  reason: z.string().min(1).max(120),
});

export type EvidenceItem = z.infer<typeof evidenceItemSchema>;
export type GraphEvidenceItem = z.infer<typeof evidenceItemSchema> & { id: string };
export type GraphMutationEvent = z.infer<typeof graphMutationEventSchema>;
export type GraphNode = z.infer<typeof graphNodeSchema>;
export type GraphEdge = z.infer<typeof graphEdgeSchema>;
export type GraphNodeKind = z.infer<typeof graphNodeKindSchema>;
export type GraphRelation = z.infer<typeof graphRelationSchema>;
export type KnowledgeGraph = z.infer<typeof knowledgeGraphSchema>;
export type UpsertGraphNodeInput = z.infer<typeof upsertGraphNodeInputSchema>;
export type UpsertGraphEdgeInput = z.infer<typeof upsertGraphEdgeInputSchema>;
export type LinkCategoryToDrugInput = z.infer<typeof linkCategoryToDrugInputSchema>;
export type LinkManufacturerToDrugInput = z.infer<typeof linkManufacturerToDrugInputSchema>;
export type MergeGraphNodesInput = z.infer<typeof mergeGraphNodesInputSchema>;
export type RemoveGraphNodeInput = z.infer<typeof removeGraphNodeInputSchema>;

export type ResearchDiscoveryCategory = {
  label: string;
  summary?: string;
};

export type ResearchDiscoveryManufacturer = {
  categories: string[];
  drugs: string[];
  label: string;
  summary?: string;
};

export type ResearchDiscoveryDrug = {
  categories: string[];
  label: string;
  manufacturers: string[];
  summary?: string;
};

export type ResearchDiscoveries = {
  categories: ResearchDiscoveryCategory[];
  drugs: ResearchDiscoveryDrug[];
  manufacturers: ResearchDiscoveryManufacturer[];
};

export type ResearchSnapshot = {
  analysis: string;
  completed: boolean;
  discoveries?: ResearchDiscoveries;
  evidence: EvidenceItem[];
  finalReasoning?: string;
  prompt: string;
  stepCount: number;
  stepSummaries: ResearchStepSummary[];
  toolEvents: ResearchToolEvent[];
};

export type ResearchStepSummary = {
  finishReason: string;
  stepNumber: number;
  textPreview?: string;
  toolCalls: number;
  toolResults: number;
};

export type ResearchToolEvent = {
  inputPreview: string;
  outputPreview?: string;
  state: 'completed' | 'error' | 'running';
  toolName: string;
};

export type GraphComposerResult = {
  eventCount: number;
  graph: KnowledgeGraph;
  mutationSummary: string;
  newEvents: GraphMutationEvent[];
};

export function createSeedKnowledgeGraph(prompt: string): KnowledgeGraph {
  const normalizedPrompt = prompt.trim();
  const rootLabel = compactText(normalizedPrompt, 68) ?? 'Drug classification graph';
  const rootId = `focus-${slugify(rootLabel).slice(0, 36) || 'ecosystem'}`;
  const createdAt = new Date().toISOString();
  const rootNode: GraphNode = {
    aliases: [],
    cluster: 'Focus',
    evidenceIds: [],
    id: rootId,
    kind: 'focus',
    label: rootLabel,
    notes: [
      'Track drug classes, manufacturers, and marketed drugs as distinct linked nodes.',
      'When a manufacturer appears, expand it into drugs and connect each drug back to its class.',
    ],
    status: 'seed',
    summary: 'Initial focus node for the live drug classification graph.',
    tone: 'accent',
  };
  const categoryNodes: GraphNode[] = [
    createCategoryNode('classes', 'Drug classes'),
    createCategoryNode('manufacturers', 'Manufacturers'),
    createCategoryNode('drugs', 'Drugs'),
  ];
  const categoryEdges: GraphEdge[] = categoryNodes.map((node) =>
    createGraphEdge({
      certainty: 'medium',
      evidenceIds: [],
      fromId: rootId,
      relation: 'maps',
      toId: node.id,
      tone: 'accent',
    }),
  );

  return {
    edges: categoryEdges,
    evidence: [],
    events: [
      createGraphEvent({
        summary: 'Seeded the knowledge graph with focus and taxonomy nodes.',
        trigger: 'initial',
        type: 'node-upserted',
      }),
    ],
    lastAgentNote: 'Graph seeded. Waiting for research evidence.',
    nodes: [rootNode, ...categoryNodes],
    prompt: normalizedPrompt,
    rootNodeId: rootId,
    summary: 'Seed graph created with focus, class, manufacturer, and drug branches.',
    title: rootLabel,
    updatedAt: createdAt,
    version: 1,
  };
}

export class MutableKnowledgeGraph {
  #graph: KnowledgeGraph;
  #newEvents: GraphMutationEvent[] = [];

  constructor(graph: KnowledgeGraph) {
    this.#graph = cloneGraph(graph);
  }

  addAgentNote(summary: string, trigger: GraphMutationEvent['trigger']) {
    if (summary.trim().length === 0) {
      return;
    }

    this.#graph.lastAgentNote = summary.trim();
    this.#graph.summary = summary.trim();
    this.#pushEvent({
      summary: `Agent note: ${compactText(summary, 120) ?? summary}`,
      trigger,
      type: 'agent-note',
    });
  }

  get pendingEventCount() {
    return this.#newEvents.length;
  }

  attachEvidence(items: EvidenceItem[]) {
    const existingIds = new Set(this.#graph.evidence.map((item) => item.id));

    for (const item of items) {
      const id = createEvidenceId(item);

      if (existingIds.has(id)) {
        continue;
      }

      existingIds.add(id);
      this.#graph.evidence.push({ ...item, id });
    }
  }

  mergeNodes(input: MergeGraphNodesInput, trigger: GraphMutationEvent['trigger']) {
    const parsed = mergeGraphNodesInputSchema.parse(input);
    const primaryNode = this.#findNode(parsed.primaryId);
    const secondaryNode = this.#findNode(parsed.secondaryId);

    if (!primaryNode || !secondaryNode || primaryNode.id === secondaryNode.id) {
      return { merged: false };
    }

    primaryNode.aliases = uniqueValues([
      ...primaryNode.aliases,
      secondaryNode.label,
      ...secondaryNode.aliases,
    ]);
    primaryNode.notes = uniqueValues([...primaryNode.notes, ...secondaryNode.notes]).slice(0, 6);
    primaryNode.evidenceIds = uniqueValues([
      ...primaryNode.evidenceIds,
      ...secondaryNode.evidenceIds,
    ]).slice(0, 64);
    primaryNode.summary = primaryNode.summary ?? secondaryNode.summary;

    for (const edge of this.#graph.edges) {
      if (edge.fromId === secondaryNode.id) {
        edge.fromId = primaryNode.id;
      }

      if (edge.toId === secondaryNode.id) {
        edge.toId = primaryNode.id;
      }
    }

    this.#graph.edges = dedupeEdges(this.#graph.edges.filter((edge) => edge.fromId !== edge.toId));
    this.#graph.nodes = this.#graph.nodes.filter((node) => node.id !== secondaryNode.id);
    this.#pushEvent({
      summary: `Merged ${secondaryNode.label} into ${primaryNode.label}. ${parsed.reason}`,
      trigger,
      type: 'node-merged',
    });

    return {
      merged: true,
      primaryId: primaryNode.id,
      secondaryId: secondaryNode.id,
    };
  }

  removeNode(input: RemoveGraphNodeInput, trigger: GraphMutationEvent['trigger']) {
    const parsed = removeGraphNodeInputSchema.parse(input);
    const existingNode = this.#findNode(parsed.id);

    if (!existingNode || existingNode.kind === 'focus') {
      return { removed: false };
    }

    this.#graph.nodes = this.#graph.nodes.filter((node) => node.id !== parsed.id);
    this.#graph.edges = this.#graph.edges.filter(
      (edge) => edge.fromId !== parsed.id && edge.toId !== parsed.id,
    );
    this.#pushEvent({
      summary: `Removed ${existingNode.label}. ${parsed.reason}`,
      trigger,
      type: 'node-removed',
    });

    return { removed: true };
  }

  upsertEdge(input: UpsertGraphEdgeInput, trigger: GraphMutationEvent['trigger']) {
    const parsed = upsertGraphEdgeInputSchema.parse(input);
    const normalizedFromId = normalizeNodeId(parsed.fromId);
    const normalizedToId = normalizeNodeId(parsed.toId);

    if (normalizedFromId === normalizedToId) {
      return { edgeId: undefined, skipped: true };
    }

    const fromNode = this.#findNode(normalizedFromId);
    const toNode = this.#findNode(normalizedToId);

    if (!fromNode || !toNode) {
      return { edgeId: undefined, skipped: true };
    }

    const existingEdge = this.#graph.edges.find(
      (edge) =>
        edge.fromId === normalizedFromId &&
        edge.toId === normalizedToId &&
        edge.relation === parsed.relation,
    );
    const nextEdge = existingEdge
      ? {
          ...existingEdge,
          certainty: parsed.certainty ?? existingEdge.certainty,
          evidenceIds: uniqueValues([
            ...existingEdge.evidenceIds,
            ...(parsed.evidenceIds ?? []),
          ]).slice(0, 64),
          label: parsed.label ?? existingEdge.label,
          summary: parsed.summary ?? existingEdge.summary,
          tone: parsed.tone ?? existingEdge.tone,
        }
      : createGraphEdge({
          ...parsed,
          fromId: normalizedFromId,
          toId: normalizedToId,
        });

    if (existingEdge) {
      this.#graph.edges = this.#graph.edges.map((edge) =>
        edge.id === existingEdge.id ? nextEdge : edge,
      );
    } else {
      this.#graph.edges.push(nextEdge);
    }

    this.#pushEvent({
      summary: `${fromNode.label} ${parsed.relation} ${toNode.label}.`,
      trigger,
      type: 'edge-upserted',
    });

    return { edgeId: nextEdge.id, skipped: false };
  }

  linkCategoryToDrug(input: LinkCategoryToDrugInput, trigger: GraphMutationEvent['trigger']) {
    const parsed = linkCategoryToDrugInputSchema.parse(input);

    return this.upsertEdge(
      {
        certainty: parsed.certainty,
        evidenceIds: parsed.evidenceIds,
        fromId: parsed.categoryId,
        label: 'contains',
        relation: 'contains',
        summary: parsed.summary,
        toId: parsed.drugId,
        tone: parsed.tone,
      },
      trigger,
    );
  }

  linkManufacturerToDrug(
    input: LinkManufacturerToDrugInput,
    trigger: GraphMutationEvent['trigger'],
  ) {
    const parsed = linkManufacturerToDrugInputSchema.parse(input);

    return this.upsertEdge(
      {
        certainty: parsed.certainty,
        evidenceIds: parsed.evidenceIds,
        fromId: parsed.manufacturerId,
        label: 'manufacturer of',
        relation: 'manufacturer-of',
        summary: parsed.summary,
        toId: parsed.drugId,
        tone: parsed.tone,
      },
      trigger,
    );
  }

  upsertNode(input: UpsertGraphNodeInput, trigger: GraphMutationEvent['trigger']) {
    const parsed = upsertGraphNodeInputSchema.parse(input);
    const nextId = normalizeNodeId(parsed.id ?? parsed.label);
    const existingNode = this.#findNode(nextId);
    const nextNode = graphNodeSchema.parse({
      aliases: uniqueValues([...(existingNode?.aliases ?? []), ...(parsed.aliases ?? [])]).slice(
        0,
        8,
      ),
      cluster: parsed.cluster ?? existingNode?.cluster,
      evidenceIds: uniqueValues([
        ...(existingNode?.evidenceIds ?? []),
        ...(parsed.evidenceIds ?? []),
      ]).slice(0, 64),
      id: nextId,
      kind: parsed.kind,
      label: parsed.label,
      notes: uniqueValues([...(existingNode?.notes ?? []), ...(parsed.notes ?? [])]).slice(0, 6),
      status: parsed.status ?? existingNode?.status ?? 'confirmed',
      summary: parsed.summary ?? existingNode?.summary,
      tone: parsed.tone ?? existingNode?.tone ?? toneForNodeKind(parsed.kind),
    });

    if (existingNode) {
      this.#graph.nodes = this.#graph.nodes.map((node) => (node.id === nextId ? nextNode : node));
    } else {
      this.#graph.nodes.push(nextNode);
    }

    this.#pushEvent({
      summary: `${existingNode ? 'Updated' : 'Added'} ${nextNode.label} (${nextNode.kind}).`,
      trigger,
      type: 'node-upserted',
    });

    return {
      nodeId: nextNode.id,
      skipped: false,
    };
  }

  toResult(mutationSummary: string): GraphComposerResult {
    const updatedGraph = knowledgeGraphSchema.parse({
      ...this.#graph,
      updatedAt: new Date().toISOString(),
      version: this.#graph.version + 1,
    });

    return {
      eventCount: this.#newEvents.length,
      graph: updatedGraph,
      mutationSummary,
      newEvents: structuredClone(this.#newEvents),
    };
  }

  snapshot() {
    return cloneGraph(this.#graph);
  }

  #findNode(id: string) {
    return this.#graph.nodes.find((node) => node.id === normalizeNodeId(id));
  }

  #pushEvent(input: Pick<GraphMutationEvent, 'summary' | 'trigger' | 'type'>) {
    const event = createGraphEvent(input);

    this.#graph.events = [...this.#graph.events, event].slice(-160);
    this.#newEvents.push(event);
  }
}

export function buildGraphMutationPrompt(input: {
  graph: KnowledgeGraph;
  snapshot: ResearchSnapshot;
  trigger: GraphMutationEvent['trigger'];
}) {
  const { graph, snapshot, trigger } = input;

  return `
You are the graph agent for a live drug classification explorer.

You own a mutable knowledge graph. Use the graph tools to add, update, merge, link, or remove nodes.

What to capture:
- what each node is in one short line
- therapeutic categories or drug classes
- manufacturers or companies
- drugs or branded products
- grounded manufacturer-to-drug and category-to-drug links

Tooling rules:
- prefer precise category, company, and drug nodes over vague prose
- merge aliases instead of duplicating the same manufacturer or drug twice
- every discovered manufacturer should be expanded into drugs when evidence exists
- every discovered drug should be linked to at least one category and one manufacturer when evidence exists
- do not spend graph budget on efficacy, side effects, dosage, or pricing
- when evidence is weak, mark nodes as candidate instead of confirmed
- remove obviously wrong placeholder nodes if the graph drifted
- after using tools, finish with 1-2 sentences describing the graph changes you made

Current research prompt:
${snapshot.prompt}

Current trigger:
${trigger}

Trigger guidance:
${trigger === 'final' ? '- final pass: materialize as many grounded nodes and edges as you can from the accumulated evidence before you summarize' : '- intermediate pass: keep the graph moving with grounded incremental mutations'}

Research completion:
- completed: ${snapshot.completed ? 'yes' : 'no'}
- steps observed: ${snapshot.stepCount}
- final reasoning: ${snapshot.finalReasoning ?? 'not available yet'}

Current graph snapshot:
${summarizeKnowledgeGraph(graph)}

Recent research steps:
${
  snapshot.stepSummaries.length === 0
    ? '- none yet'
    : snapshot.stepSummaries
        .slice(-6)
        .map(
          (step) =>
            `- step ${step.stepNumber + 1}: ${step.finishReason}, calls=${step.toolCalls}, results=${step.toolResults}, text=${step.textPreview ?? 'none'}`,
        )
        .join('\n')
}

Recent tool activity:
${
  snapshot.toolEvents.length === 0
    ? '- none yet'
    : snapshot.toolEvents
        .slice(-8)
        .map(
          (event) =>
            `- ${event.state}: ${event.toolName} | input=${event.inputPreview}${event.outputPreview ? ` | output=${event.outputPreview}` : ''}`,
        )
        .join('\n')
}

Evidence ledger:
${
  snapshot.evidence.length === 0
    ? '- none yet'
    : snapshot.evidence
        .slice(-12)
        .map(
          (item) =>
            `- title=${item.title}${item.url ? ` | url=${item.url}` : ''}${item.snippet ? ` | snippet=${item.snippet}` : ''}${item.query ? ` | query=${item.query}` : ''}`,
        )
        .join('\n')
}

Research analysis:
${snapshot.analysis.trim().length > 0 ? snapshot.analysis.trim() : 'No final prose yet. Build the graph from the evidence stream.'}
`.trim();
}

export function summarizeKnowledgeGraph(graph: KnowledgeGraph) {
  const lines = [
    `- title: ${graph.title}`,
    `- nodes: ${graph.nodes.length}`,
    `- edges: ${graph.edges.length}`,
    `- evidence items: ${graph.evidence.length}`,
  ];
  const sampleNodes = graph.nodes
    .slice()
    .sort((left, right) => compareGraphNodes(left, right))
    .slice(0, 18)
    .map((node) => {
      const extras = [node.cluster ? `cluster=${node.cluster}` : undefined].filter(Boolean);

      return `  - ${node.id}: ${node.label} [${node.kind}]${extras.length > 0 ? ` (${extras.join(', ')})` : ''}`;
    });
  const sampleEdges = graph.edges
    .slice(0, 18)
    .map((edge) => `  - ${edge.fromId} ${edge.relation} ${edge.toId}`);

  return [
    ...lines,
    '- sample nodes:',
    ...(sampleNodes.length > 0 ? sampleNodes : ['  - none']),
    '- sample edges:',
    ...(sampleEdges.length > 0 ? sampleEdges : ['  - none']),
  ].join('\n');
}

export function createEvidenceId(item: EvidenceItem) {
  return normalizeNodeId(`${item.url ?? item.title}:${item.query}`);
}

export function compactText(text: string | undefined, maxLength = 280) {
  const normalized = text?.replace(/\s+/g, ' ').trim();

  if (!normalized) {
    return undefined;
  }

  if (normalized.length <= maxLength) {
    return normalized;
  }

  if (maxLength <= 3) {
    return normalized.slice(0, maxLength);
  }

  return `${normalized.slice(0, maxLength - 3)}...`;
}

export function normalizeNodeId(value: string) {
  const normalized = slugify(value);

  return normalized.length > 0 ? normalized.slice(0, 64) : 'node';
}

function cloneGraph(graph: KnowledgeGraph) {
  return structuredClone(graph);
}

function compareGraphNodes(left: GraphNode, right: GraphNode) {
  if (left.kind === 'focus') {
    return -1;
  }

  if (right.kind === 'focus') {
    return 1;
  }

  return left.label.localeCompare(right.label);
}

function createCategoryNode(suffix: string, label: string): GraphNode {
  return {
    aliases: [],
    cluster: 'Taxonomy',
    evidenceIds: [],
    id: `category-${suffix}`,
    kind: 'category',
    label,
    notes: [],
    status: 'seed',
    summary: `Taxonomy branch for ${label.toLowerCase()}.`,
    tone: 'warning',
  };
}

function createGraphEdge(
  input: Omit<GraphEdge, 'id' | 'certainty' | 'evidenceIds' | 'tone'> &
    Partial<Pick<GraphEdge, 'certainty' | 'evidenceIds' | 'tone'>>,
) {
  const normalizedInput = graphEdgeSchema.omit({ id: true }).parse({
    ...input,
    certainty: input.certainty ?? 'medium',
    evidenceIds: input.evidenceIds ?? [],
    tone: input.tone ?? 'neutral',
  });

  return graphEdgeSchema.parse({
    ...normalizedInput,
    id: normalizeNodeId(
      `${normalizedInput.fromId}:${normalizedInput.relation}:${normalizedInput.toId}`,
    ),
  });
}

function createGraphEvent(input: Pick<GraphMutationEvent, 'summary' | 'trigger' | 'type'>) {
  return graphMutationEventSchema.parse({
    at: new Date().toISOString(),
    id: normalizeNodeId(`${input.type}:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`),
    ...input,
  });
}

function dedupeEdges(edges: GraphEdge[]) {
  const edgeMap = new Map<string, GraphEdge>();

  for (const edge of edges) {
    edgeMap.set(`${edge.fromId}:${edge.relation}:${edge.toId}`, edge);
  }

  return [...edgeMap.values()];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/['".,()[\]{}]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toneForNodeKind(kind: GraphNodeKind): z.infer<typeof graphToneSchema> {
  switch (kind) {
    case 'focus':
      return 'accent';
    case 'company':
      return 'neutral';
    case 'product':
      return 'positive';
    case 'category':
      return 'warning';
    default:
      return 'neutral';
  }
}

function uniqueValues(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter((value) => value.length > 0))];
}
