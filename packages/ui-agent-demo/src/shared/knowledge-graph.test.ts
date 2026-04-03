import { describe, expect, it } from 'vitest';
import {
  buildGraphMutationPrompt,
  createSeedKnowledgeGraph,
  MutableKnowledgeGraph,
} from './knowledge-graph.js';

describe('createSeedKnowledgeGraph', () => {
  it('creates category, manufacturer, and drug branches around the prompt', () => {
    const graph = createSeedKnowledgeGraph('Map diabetes drugs by class and manufacturer.');

    expect(graph.nodes.length).toBeGreaterThanOrEqual(4);
    expect(graph.edges.length).toBeGreaterThanOrEqual(3);
    expect(graph.title).toContain('Map diabetes drugs');
    expect(graph.nodes.some((node) => node.kind === 'focus')).toBe(true);
    expect(graph.nodes.some((node) => node.label === 'Drug classes')).toBe(true);
    expect(graph.nodes.some((node) => node.label === 'Manufacturers')).toBe(true);
    expect(graph.nodes.some((node) => node.label === 'Drugs')).toBe(true);
  });
});

describe('MutableKnowledgeGraph', () => {
  it('upserts categories, manufacturers, and drugs with explicit links', () => {
    const store = new MutableKnowledgeGraph(createSeedKnowledgeGraph('Map diabetes drugs.'));

    store.upsertNode(
      {
        kind: 'category',
        label: 'GLP-1 receptor agonists',
        summary: 'Drug class used in diabetes and metabolic disease care.',
      },
      'manual',
    );
    store.upsertNode(
      {
        kind: 'company',
        label: 'Novo Nordisk',
        summary: 'Pharmaceutical manufacturer focused on diabetes care.',
      },
      'manual',
    );
    store.upsertNode(
      {
        kind: 'product',
        label: 'Ozempic',
        summary: 'Semaglutide brand used in diabetes care.',
      },
      'manual',
    );
    store.linkCategoryToDrug(
      {
        categoryId: 'glp-1-receptor-agonists',
        drugId: 'ozempic',
        summary: 'Ozempic belongs to the GLP-1 receptor agonist class.',
      },
      'manual',
    );
    store.linkManufacturerToDrug(
      {
        drugId: 'ozempic',
        manufacturerId: 'novo-nordisk',
        summary: 'Novo Nordisk manufactures Ozempic.',
      },
      'manual',
    );

    const result = store.toResult('Graph expanded.');

    expect(result.graph.nodes.some((node) => node.id === 'novo-nordisk')).toBe(true);
    expect(
      result.graph.edges.some(
        (edge) =>
          edge.fromId === 'glp-1-receptor-agonists' &&
          edge.toId === 'ozempic' &&
          edge.relation === 'contains',
      ),
    ).toBe(true);
    expect(
      result.graph.edges.some(
        (edge) =>
          edge.fromId === 'novo-nordisk' &&
          edge.toId === 'ozempic' &&
          edge.relation === 'manufacturer-of',
      ),
    ).toBe(true);
    expect(result.eventCount).toBeGreaterThanOrEqual(5);
  });

  it('merges alias nodes cleanly', () => {
    const store = new MutableKnowledgeGraph(createSeedKnowledgeGraph('Map diabetes drugs.'));

    store.upsertNode(
      {
        kind: 'company',
        label: 'Eli Lilly',
      },
      'manual',
    );
    store.upsertNode(
      {
        aliases: ['Eli Lilly'],
        kind: 'company',
        label: 'Lilly',
      },
      'manual',
    );
    store.mergeNodes(
      {
        primaryId: 'eli-lilly',
        reason: 'Same manufacturer with a shortened alias.',
        secondaryId: 'lilly',
      },
      'manual',
    );

    const result = store.toResult('Merged aliases.');

    expect(result.graph.nodes.some((node) => node.id === 'lilly')).toBe(false);
    expect(result.graph.nodes.find((node) => node.id === 'eli-lilly')?.aliases).toContain('Lilly');
  });
});

describe('buildGraphMutationPrompt', () => {
  it('describes graph mutation rules for categories, manufacturers, and drugs', () => {
    const graph = createSeedKnowledgeGraph('Map diabetes drugs.');
    const prompt = buildGraphMutationPrompt({
      graph,
      snapshot: {
        analysis:
          'GLP-1 receptor agonists and SGLT2 inhibitors keep recurring, with Novo Nordisk and Eli Lilly attached to several drugs.',
        completed: false,
        evidence: [
          {
            query: 'glp-1 receptor agonists manufacturers',
            snippet: 'Novo Nordisk and Eli Lilly both make major GLP-1 products.',
            title: 'GLP-1 Manufacturer Overview',
            url: 'https://example.com/glp1',
          },
        ],
        prompt: 'Map diabetes drugs.',
        stepCount: 1,
        stepSummaries: [
          {
            finishReason: 'tool-calls',
            stepNumber: 0,
            textPreview: 'Research is expanding.',
            toolCalls: 3,
            toolResults: 3,
          },
        ],
        toolEvents: [
          {
            inputPreview: 'GLP-1 manufacturers',
            outputPreview: '5 results',
            state: 'completed',
            toolName: 'manufacturersForCategory',
          },
        ],
      },
      trigger: 'evidence',
    });

    expect(prompt).toContain('therapeutic categories or drug classes');
    expect(prompt).toContain('manufacturer-to-drug and category-to-drug links');
    expect(prompt).toContain('every discovered manufacturer should be expanded into drugs');
  });
});
