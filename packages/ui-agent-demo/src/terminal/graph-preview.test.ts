import { describe, expect, it } from 'vitest';
import { createSeedKnowledgeGraph, MutableKnowledgeGraph } from '../shared/knowledge-graph.js';
import {
  buildDotGraph,
  clampPreviewOffset,
  formatArtifactWorkspaceLines,
  formatGraphFallbackLines,
  getArtifactRenderWidth,
  getAutoPreviewOffset,
  getPngRenderWidth,
  getVisiblePreviewLines,
  pickGraphEngine,
} from './graph-preview.js';

describe('buildDotGraph', () => {
  it('serializes nodes and edges into a graphviz diagram', () => {
    const store = new MutableKnowledgeGraph(createSeedKnowledgeGraph('Map diabetes drugs.'));

    store.upsertNode(
      {
        kind: 'category',
        label: 'GLP-1 receptor agonists',
        summary: 'Drug class used in diabetes care.',
      },
      'manual',
    );
    store.upsertNode(
      {
        kind: 'company',
        label: 'Novo Nordisk',
        summary: 'Manufacturer with major diabetes products.',
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
      },
      'manual',
    );
    store.linkManufacturerToDrug(
      {
        drugId: 'ozempic',
        manufacturerId: 'novo-nordisk',
      },
      'manual',
    );

    const dot = buildDotGraph(store.toResult('Graph expanded.').graph);

    expect(dot).toContain('digraph knowledge_graph');
    expect(dot).toContain('"ozempic"');
    expect(dot).toContain('Novo Nordisk');
    expect(dot).toContain('fontcolor="#e2e8f0"');
    expect(dot).toContain('label="contains"');
    expect(dot).toContain('label="manufacturer of"');
  });
});

describe('formatGraphFallbackLines', () => {
  it('renders a readable fallback summary', () => {
    const graph = createSeedKnowledgeGraph('Map diabetes drugs.');
    const lines = formatGraphFallbackLines(graph, 72, 12, 'renderer exploded');

    expect(lines).toHaveLength(12);
    expect(lines.join('\n')).toContain('Knowledge graph preview unavailable');
    expect(lines.join('\n')).toContain('renderer exploded');
    expect(lines.join('\n')).toContain('Top nodes');
  });
});

describe('formatArtifactWorkspaceLines', () => {
  it('renders an artifact-first graph workspace summary', () => {
    const store = new MutableKnowledgeGraph(createSeedKnowledgeGraph('Map diabetes drugs.'));

    store.upsertNode(
      {
        kind: 'company',
        label: 'Eli Lilly',
        summary: 'Diabetes-focused drug manufacturer.',
      },
      'manual',
    );
    store.upsertNode(
      {
        kind: 'product',
        label: 'Mounjaro',
        summary: 'Tirzepatide brand used in metabolic disease care.',
      },
      'manual',
    );
    store.linkManufacturerToDrug(
      {
        drugId: 'mounjaro',
        manufacturerId: 'eli-lilly',
      },
      'manual',
    );

    const lines = formatArtifactWorkspaceLines(
      store.toResult('Graph expanded with linked drugs.').graph,
      84,
      32,
      { svg: '/tmp/ui-agent-demo/artifacts/live/latest-knowledge-graph.svg' },
    );

    expect(lines.join('\n')).toContain('Workspace');
    expect(lines.join('\n')).toContain('Live SVG');
    expect(lines.join('\n')).toContain('Manufacturer + category links');
    expect(lines.join('\n')).toContain('Eli Lilly');
    expect(lines.join('\n')).toContain('manufacturer-of');
  });
});

describe('preview viewport helpers', () => {
  it('clamps manual offsets inside the rendered graph height', () => {
    expect(clampPreviewOffset(40, 10, -5)).toBe(0);
    expect(clampPreviewOffset(40, 10, 12)).toBe(12);
    expect(clampPreviewOffset(40, 10, 99)).toBe(30);
  });

  it('auto-centers large previews and pads smaller ones', () => {
    expect(getAutoPreviewOffset(64, 20)).toBe(22);

    const lines = getVisiblePreviewLines(['node-a', 'node-b'], 6, 0);

    expect(lines).toEqual(['', '', 'node-a', 'node-b', '', '']);
  });
});

describe('pickGraphEngine', () => {
  it('keeps taxonomy graphs on a compact hierarchical engine as they grow', () => {
    const smallGraph = createSeedKnowledgeGraph('Map diabetes drugs.');
    const mediumStore = new MutableKnowledgeGraph(createSeedKnowledgeGraph('Map diabetes drugs.'));
    const largeStore = new MutableKnowledgeGraph(createSeedKnowledgeGraph('Map diabetes drugs.'));

    for (const label of [
      'GLP-1 receptor agonists',
      'SGLT2 inhibitors',
      'DPP-4 inhibitors',
      'Biguanides',
      'Sulfonylureas',
      'Novo Nordisk',
      'Eli Lilly',
    ]) {
      mediumStore.upsertNode(
        {
          kind:
            label.includes('inhibitors') || label === 'Biguanides' || label === 'Sulfonylureas'
              ? 'category'
              : 'company',
          label,
        },
        'manual',
      );
    }

    for (const label of [
      'GLP-1 receptor agonists',
      'SGLT2 inhibitors',
      'DPP-4 inhibitors',
      'Biguanides',
      'Sulfonylureas',
      'Thiazolidinediones',
      'Insulins',
      'Amylin analogs',
      'Novo Nordisk',
      'Eli Lilly',
      'Sanofi',
      'AstraZeneca',
      'Boehringer Ingelheim',
      'Merck',
      'Ozempic',
      'Rybelsus',
      'Mounjaro',
      'Jardiance',
      'Farxiga',
      'Janumet',
      'Metformin',
    ]) {
      largeStore.upsertNode(
        {
          kind:
            label === 'Novo Nordisk' ||
            label === 'Eli Lilly' ||
            label === 'Sanofi' ||
            label === 'AstraZeneca' ||
            label === 'Boehringer Ingelheim' ||
            label === 'Merck'
              ? 'company'
              : label.includes('inhibitors') ||
                  label === 'Biguanides' ||
                  label === 'Sulfonylureas' ||
                  label === 'Thiazolidinediones' ||
                  label === 'Insulins' ||
                  label === 'Amylin analogs'
                ? 'category'
                : 'product',
          label,
        },
        'manual',
      );
    }

    expect(pickGraphEngine(smallGraph)).toBe('dot');
    expect(pickGraphEngine(mediumStore.toResult('expanded').graph)).toBe('dot');
    expect(pickGraphEngine(largeStore.toResult('expanded').graph)).toBe('dot');
  });
});

describe('getArtifactRenderWidth', () => {
  it('keeps PNG targets in a sane range instead of exploding to six-figure widths', () => {
    const smallGraph = createSeedKnowledgeGraph('Map diabetes drugs.');
    const mediumStore = new MutableKnowledgeGraph(createSeedKnowledgeGraph('Map diabetes drugs.'));
    const largeStore = new MutableKnowledgeGraph(createSeedKnowledgeGraph('Map diabetes drugs.'));

    for (const label of [
      'GLP-1 receptor agonists',
      'SGLT2 inhibitors',
      'DPP-4 inhibitors',
      'Biguanides',
      'Sulfonylureas',
      'Thiazolidinediones',
      'Insulins',
      'Novo Nordisk',
      'Eli Lilly',
      'Merck',
      'Sanofi',
      'Ozempic',
      'Mounjaro',
      'Jardiance',
      'Metformin',
      'Trulicity',
      'Janumet',
    ]) {
      mediumStore.upsertNode(
        {
          kind:
            label === 'Novo Nordisk' ||
            label === 'Eli Lilly' ||
            label === 'Merck' ||
            label === 'Sanofi'
              ? 'company'
              : label.includes('inhibitors') ||
                  label.includes('agonists') ||
                  label === 'Biguanides' ||
                  label === 'Sulfonylureas' ||
                  label === 'Thiazolidinediones' ||
                  label === 'Insulins'
                ? 'category'
                : 'product',
          label,
        },
        'manual',
      );
    }

    for (const label of [
      'GLP-1 receptor agonists',
      'SGLT2 inhibitors',
      'DPP-4 inhibitors',
      'Biguanides',
      'Sulfonylureas',
      'Thiazolidinediones',
      'Insulins',
      'Alpha-glucosidase inhibitors',
      'Meglitinides',
      'Amylin analogs',
      'Novo Nordisk',
      'Eli Lilly',
      'Merck',
      'Boehringer Ingelheim',
      'Sanofi',
      'AstraZeneca',
      'Takeda',
      'Pfizer',
      'Ozempic',
      'Rybelsus',
      'Mounjaro',
      'Jardiance',
      'Janumet',
      'Metformin',
      'Trulicity',
      'Synjardy',
      'Pioglitazone',
      'Byetta',
      'Victoza',
      'Tresiba',
      'Lantus',
      'Actos',
      'Amaryl',
      'Prandin',
      'Acarbose',
      'Miglitol',
      'Symlin',
      'Invokana',
      'Nesina',
      'Onglyza',
      'Tradjenta',
      'Xigduo XR',
    ]) {
      largeStore.upsertNode(
        {
          kind:
            label === 'Novo Nordisk' ||
            label === 'Eli Lilly' ||
            label === 'Merck' ||
            label === 'Boehringer Ingelheim' ||
            label === 'Sanofi' ||
            label === 'AstraZeneca' ||
            label === 'Takeda' ||
            label === 'Pfizer'
              ? 'company'
              : label.includes('inhibitors') ||
                  label.includes('agonists') ||
                  label.includes('analogs') ||
                  label === 'Biguanides' ||
                  label === 'Sulfonylureas' ||
                  label === 'Thiazolidinediones' ||
                  label === 'Insulins' ||
                  label === 'Meglitinides'
                ? 'category'
                : 'product',
          label,
        },
        'manual',
      );
    }

    expect(getArtifactRenderWidth(smallGraph, 160)).toBeGreaterThanOrEqual(4096);
    expect(getArtifactRenderWidth(smallGraph, 160)).toBeLessThanOrEqual(6144);
    expect(
      getArtifactRenderWidth(mediumStore.toResult('expanded').graph, 160),
    ).toBeGreaterThanOrEqual(5120);
    expect(getArtifactRenderWidth(mediumStore.toResult('expanded').graph, 160)).toBeLessThanOrEqual(
      7168,
    );
    expect(
      getArtifactRenderWidth(largeStore.toResult('expanded').graph, 160),
    ).toBeGreaterThanOrEqual(6144);
    expect(getArtifactRenderWidth(largeStore.toResult('expanded').graph, 160)).toBeLessThanOrEqual(
      8192,
    );
  });
});

describe('getPngRenderWidth', () => {
  it('caps tall exports by total pixel area instead of honoring the raw requested width', () => {
    const tallSvg =
      '<svg viewBox="0 0 2402 2142" width="2402pt" height="2142pt" xmlns="http://www.w3.org/2000/svg"></svg>';

    expect(getPngRenderWidth(tallSvg, 6144)).toBeLessThan(6144);
    expect(getPngRenderWidth(tallSvg, 6144)).toBeGreaterThanOrEqual(2048);
  });

  it('keeps narrower exports near the requested width when area is already reasonable', () => {
    const wideSvg =
      '<svg viewBox="0 0 3200 900" width="3200pt" height="900pt" xmlns="http://www.w3.org/2000/svg"></svg>';

    expect(getPngRenderWidth(wideSvg, 4096)).toBe(4096);
  });
});
