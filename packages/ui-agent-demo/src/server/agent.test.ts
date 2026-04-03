import { describe, expect, it } from 'vitest';
import { createSeedKnowledgeGraph, MutableKnowledgeGraph } from '../shared/knowledge-graph.js';
import {
  getDrugSeedCategories,
  hasGroundedDrugDiscoveries,
  seedGraphFromStructuredDiscoveries,
  shouldRequireLiveSearch,
  shouldUseDeterministicDrugData,
} from './agent.js';

describe('seedGraphFromStructuredDiscoveries', () => {
  it('materializes linked category, manufacturer, and drug nodes without splitting company names', () => {
    const store = new MutableKnowledgeGraph(createSeedKnowledgeGraph('Map diabetes drugs.'));

    seedGraphFromStructuredDiscoveries(
      store,
      {
        categories: [
          {
            label: 'DPP-4 inhibitors',
            summary: 'Diabetes drug class.',
          },
        ],
        drugs: [
          {
            categories: ['DPP-4 inhibitors'],
            label: 'Jentadueto XR',
            manufacturers: ['Boehringer Ingelheim Pharmaceuticals, Inc.'],
            summary: 'Combination diabetes product.',
          },
        ],
        manufacturers: [
          {
            categories: ['DPP-4 inhibitors'],
            drugs: ['Jentadueto XR'],
            label: 'Boehringer Ingelheim Pharmaceuticals, Inc.',
            summary: 'Manufacturer with diabetes products.',
          },
        ],
      },
      'step',
    );

    const graph = store.toResult('Seeded graph.').graph;

    expect(
      graph.nodes.some(
        (node) =>
          node.label === 'Boehringer Ingelheim Pharmaceuticals, Inc.' && node.kind === 'company',
      ),
    ).toBe(true);
    expect(graph.nodes.some((node) => node.label === 'Inc.')).toBe(false);
    expect(
      graph.edges.some(
        (edge) =>
          edge.fromId === 'boehringer-ingelheim-pharmaceuticals-inc' &&
          edge.toId === 'jentadueto-xr' &&
          edge.relation === 'manufacturer-of',
      ),
    ).toBe(true);
    expect(
      graph.edges.some(
        (edge) =>
          edge.fromId === 'dpp-4-inhibitors' &&
          edge.toId === 'jentadueto-xr' &&
          edge.relation === 'contains',
      ),
    ).toBe(true);
    expect(
      graph.edges.some(
        (edge) =>
          edge.fromId === 'category-manufacturers' &&
          edge.toId === 'boehringer-ingelheim-pharmaceuticals-inc' &&
          edge.relation === 'maps',
      ),
    ).toBe(true);
  });
});

describe('shouldUseDeterministicDrugData', () => {
  it('only enables the deterministic mode when explicitly requested', () => {
    expect(shouldUseDeterministicDrugData({})).toBe(false);
    expect(shouldUseDeterministicDrugData({ UI_AGENT_USE_DETERMINISTIC_DRUG_DATA: '0' })).toBe(
      false,
    );
    expect(shouldUseDeterministicDrugData({ UI_AGENT_USE_DETERMINISTIC_DRUG_DATA: '1' })).toBe(
      true,
    );
    expect(shouldUseDeterministicDrugData({ UI_AGENT_USE_DETERMINISTIC_DRUG_DATA: 'true' })).toBe(
      true,
    );
  });
});

describe('shouldRequireLiveSearch', () => {
  it('only enables live-only mode when explicitly requested', () => {
    expect(shouldRequireLiveSearch({})).toBe(false);
    expect(shouldRequireLiveSearch({ UI_AGENT_REQUIRE_LIVE_SEARCH: '0' })).toBe(false);
    expect(shouldRequireLiveSearch({ UI_AGENT_REQUIRE_LIVE_SEARCH: '1' })).toBe(true);
    expect(shouldRequireLiveSearch({ UI_AGENT_REQUIRE_LIVE_SEARCH: 'true' })).toBe(true);
  });
});

describe('getDrugSeedCategories', () => {
  it('prioritizes directly mentioned classes before the broader diabetes taxonomy', () => {
    const categories = getDrugSeedCategories(
      'Map the GLP-1 and SGLT2 diabetes-drug landscape by manufacturer and product.',
    );

    expect(categories[0]).toBe('GLP-1 receptor agonists');
    expect(categories[1]).toBe('SGLT2 inhibitors');
    expect(categories).toContain('Biguanides');
  });
});

describe('hasGroundedDrugDiscoveries', () => {
  it('requires categories, manufacturers, and drugs before the run is considered usable', () => {
    expect(
      hasGroundedDrugDiscoveries({
        categories: [{ label: 'GLP-1 receptor agonists' }],
        drugs: [],
        manufacturers: [],
      }),
    ).toBe(false);
    expect(
      hasGroundedDrugDiscoveries({
        categories: [{ label: 'GLP-1 receptor agonists' }],
        drugs: [
          {
            categories: ['GLP-1 receptor agonists'],
            label: 'Ozempic',
            manufacturers: ['Novo Nordisk'],
          },
        ],
        manufacturers: [
          {
            categories: ['GLP-1 receptor agonists'],
            drugs: ['Ozempic'],
            label: 'Novo Nordisk',
          },
        ],
      }),
    ).toBe(true);
  });
});
