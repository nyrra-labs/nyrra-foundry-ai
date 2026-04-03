import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import * as Viz from '@viz-js/viz';
import type { UiAgentDevToolsInfo } from '../devtools.js';
import type { GraphNode, GraphRelation, KnowledgeGraph } from '../shared/knowledge-graph.js';

export type GraphPreviewFrame = {
  artifactPaths?: {
    png?: string;
    svg: string;
  };
  contentHeight: number;
  lines: string[];
  mode: 'artifact-live' | 'text-fallback';
};

type GraphPreviewOptions = {
  artifactDir?: string;
  devTools?: UiAgentDevToolsInfo;
  height: number;
  persistPng?: boolean;
  width: number;
};

let vizPromise: Promise<Viz.Viz> | undefined;
const MAX_PNG_LONG_SIDE = 8192;
const MIN_PNG_LONG_SIDE = 2048;
const MAX_PNG_PIXEL_AREA = 20_000_000;

export async function renderKnowledgeGraphPreview(
  graph: KnowledgeGraph,
  options: GraphPreviewOptions,
): Promise<GraphPreviewFrame> {
  try {
    const dot = buildDotGraph(graph);
    const viz = await getViz();
    const engine = pickGraphEngine(graph);
    const svg = viz.renderString(dot, { engine, format: 'svg' });
    const artifactPaths = options.artifactDir
      ? await persistGraphArtifacts(
          options.artifactDir,
          svg,
          options.persistPng
            ? renderSvgToPng(svg, getArtifactRenderWidth(graph, options.width))
            : undefined,
        )
      : undefined;
    const lines = formatArtifactWorkspaceLines(
      graph,
      options.width,
      options.height,
      artifactPaths,
      options.devTools,
      options.persistPng ?? false,
    );

    return {
      artifactPaths,
      contentHeight: lines.length,
      lines,
      mode: 'artifact-live',
    };
  } catch (error) {
    const lines = formatGraphFallbackLines(
      graph,
      options.width,
      options.height,
      describeRenderError(error),
    );

    return {
      contentHeight: lines.length,
      lines,
      mode: 'text-fallback',
    };
  }
}

export function buildDotGraph(graph: KnowledgeGraph) {
  const clusters = groupNodesByCluster(graph.nodes);
  const compactTaxonomyLayout = isTaxonomyGraph(graph);
  const edgeLabelsEnabled = graph.edges.length <= 42;
  const graphLines = [
    'digraph knowledge_graph {',
    '  graph [',
    '    bgcolor="#0b1020"',
    '    fontcolor="#e2e8f0"',
    `    pad="${compactTaxonomyLayout ? '0.18' : '0.35'}"`,
    '    rankdir="LR"',
    `    splines="${compactTaxonomyLayout ? 'polyline' : 'true'}"`,
    '    overlap="false"',
    '    outputorder="edgesfirst"',
    `    nodesep="${compactTaxonomyLayout ? '0.18' : '0.38'}"`,
    `    ranksep="${compactTaxonomyLayout ? '0.52' : '1.05'}"`,
    `    concentrate="${compactTaxonomyLayout ? 'true' : 'false'}"`,
    `    pack="${compactTaxonomyLayout ? 'true' : 'false'}"`,
    '    fontname="SF Mono"',
    '  ]',
    '  node [shape="plain", fontname="SF Mono", margin="0.02"]',
    '  edge [fontname="SF Mono", fontsize="10", color="#475569", fontcolor="#94a3b8", penwidth="1.3", arrowsize="0.8"]',
  ];

  for (const [clusterName, nodes] of clusters) {
    graphLines.push(`  subgraph cluster_${sanitizeIdentifier(clusterName)} {`);
    graphLines.push('    style="rounded"');
    graphLines.push('    color="#1f2937"');
    graphLines.push('    fontcolor="#e2e8f0"');
    graphLines.push('    penwidth="1.2"');
    graphLines.push(`    label="${escapeDot(clusterName)}"`);

    for (const node of nodes.sort((left, right) => left.label.localeCompare(right.label))) {
      graphLines.push(`    "${node.id}" [label=<${buildNodeLabel(node)}>];`);
    }

    graphLines.push('  }');
  }

  for (const edge of graph.edges) {
    const attributes = [
      `color="${edgeColor(edge.relation)}"`,
      `fontcolor="${edgeColor(edge.relation)}"`,
      `penwidth="${edge.certainty === 'high' ? 1.8 : edge.certainty === 'low' ? 1.0 : 1.4}"`,
    ];

    if (edgeLabelsEnabled) {
      attributes.push(`label="${escapeDot(edge.label ?? edge.relation)}"`);
    }

    graphLines.push(`  "${edge.fromId}" -> "${edge.toId}" [${attributes.join(', ')}];`);
  }

  graphLines.push('}');

  return graphLines.join('\n');
}

export function formatGraphFallbackLines(
  graph: KnowledgeGraph,
  width: number,
  height: number,
  errorMessage?: string,
) {
  const lines = [
    'Knowledge graph preview unavailable. Rendering text fallback.',
    `Nodes: ${graph.nodes.length}  Edges: ${graph.edges.length}  Events: ${graph.events.length}`,
  ];

  if (errorMessage) {
    lines.push(`Renderer error: ${errorMessage}`);
  }

  lines.push('');
  lines.push('Top nodes');

  for (const node of graph.nodes.slice(0, 12)) {
    const details = [node.kind, node.cluster].filter(Boolean);
    lines.push(`- ${node.label}${details.length > 0 ? ` (${details.join(' | ')})` : ''}`);
  }

  lines.push('');
  lines.push('Recent links');

  for (const edge of graph.edges.slice(-12)) {
    lines.push(`- ${edge.fromId} ${edge.relation} ${edge.toId}`);
  }

  return padLines(
    lines.flatMap((line) => wrapText(line, Math.max(24, width - 2))),
    height,
  );
}

export function formatArtifactWorkspaceLines(
  graph: KnowledgeGraph,
  width: number,
  height: number,
  artifactPaths?: GraphPreviewFrame['artifactPaths'],
  devTools?: UiAgentDevToolsInfo,
  persistPng = false,
) {
  return formatArtifactWorkspaceLinesInternal(
    graph,
    width,
    height,
    artifactPaths,
    devTools,
    persistPng,
  );
}

export function getAutoPreviewOffset(contentHeight: number, viewportHeight: number) {
  return clampPreviewOffset(
    contentHeight,
    viewportHeight,
    Math.floor((contentHeight - viewportHeight) / 2),
  );
}

export function clampPreviewOffset(contentHeight: number, viewportHeight: number, offset: number) {
  if (contentHeight <= viewportHeight) {
    return 0;
  }

  return Math.min(Math.max(offset, 0), contentHeight - viewportHeight);
}

export function getVisiblePreviewLines(
  lines: string[],
  viewportHeight: number,
  offset: number,
  align: 'center' | 'top' = 'center',
) {
  if (lines.length >= viewportHeight) {
    const start = clampPreviewOffset(lines.length, viewportHeight, offset);

    return lines.slice(start, start + viewportHeight);
  }

  const padCount = viewportHeight - lines.length;
  const padTop = align === 'center' ? Math.floor(padCount / 2) : 0;
  const padBottom = padCount - padTop;

  return [
    ...Array.from({ length: padTop }, () => ''),
    ...lines,
    ...Array.from({ length: padBottom }, () => ''),
  ];
}

function buildNodeLabel(node: GraphNode) {
  const accent = nodeFill(node);
  const heading = escapeHtml(node.label);
  const typeLine = escapeHtml(`${node.kind}${node.cluster ? ` • ${node.cluster}` : ''}`);
  const detailRows = [
    node.summary ? escapeHtml(node.summary) : undefined,
    node.aliases.length > 0
      ? escapeHtml(`Aliases: ${node.aliases.slice(0, 3).join(', ')}`)
      : undefined,
  ].filter(Boolean);
  const rows = [
    `<TR><TD BGCOLOR="${accent}" ALIGN="LEFT"><FONT COLOR="#f8fafc"><B>${heading}</B></FONT></TD></TR>`,
    `<TR><TD BGCOLOR="#111827" ALIGN="LEFT"><FONT COLOR="#94a3b8" POINT-SIZE="10">${typeLine}</FONT></TD></TR>`,
    ...detailRows.map(
      (detail) =>
        `<TR><TD BGCOLOR="#0f172a" ALIGN="LEFT"><FONT COLOR="#cbd5e1" POINT-SIZE="10">${detail}</FONT></TD></TR>`,
    ),
  ];

  return `<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="6" COLOR="#334155">${rows.join('')}</TABLE>`;
}

function describeRenderError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

function edgeColor(relation: GraphRelation) {
  switch (relation) {
    case 'manufacturer-of':
      return '#10b981';
    case 'contains':
      return '#38bdf8';
    default:
      return '#64748b';
  }
}

function escapeDot(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function getViz() {
  vizPromise ??= Viz.instance();

  return vizPromise;
}

function groupNodesByCluster(nodes: GraphNode[]) {
  const clusterMap = new Map<string, GraphNode[]>();

  for (const node of nodes) {
    const cluster = node.cluster ?? defaultCluster(node);
    const currentNodes = clusterMap.get(cluster) ?? [];

    currentNodes.push(node);
    clusterMap.set(cluster, currentNodes);
  }

  return clusterMap;
}

function defaultCluster(node: GraphNode) {
  switch (node.kind) {
    case 'focus':
      return 'Focus';
    case 'company':
      return 'Manufacturers';
    case 'product':
      return 'Drugs';
    case 'category':
      return 'Categories';
    default:
      return 'Graph';
  }
}

function nodeFill(node: GraphNode) {
  switch (node.kind) {
    case 'focus':
      return '#0ea5e9';
    case 'company':
      return '#10b981';
    case 'category':
      return '#3b82f6';
    default:
      return '#f97316';
  }
}

function padLines(lines: string[], height: number) {
  if (lines.length >= height) {
    return lines.slice(0, height);
  }

  return [...lines, ...Array.from({ length: height - lines.length }, () => '')];
}

export function pickGraphEngine(graph: KnowledgeGraph) {
  if (isTaxonomyGraph(graph)) {
    return 'dot';
  }

  if (graph.nodes.length > 24 || graph.edges.length > 36) {
    return 'sfdp';
  }

  if (graph.nodes.length > 10 || graph.edges.length > 14) {
    return 'fdp';
  }

  return 'dot';
}

function isTaxonomyGraph(graph: KnowledgeGraph) {
  const nodeIds = new Set(graph.nodes.map((node) => node.id));

  return (
    nodeIds.has('category-classes') &&
    nodeIds.has('category-manufacturers') &&
    nodeIds.has('category-drugs')
  );
}

async function persistGraphArtifacts(artifactDir: string, svg: string, png?: Uint8Array) {
  await mkdir(artifactDir, { recursive: true });
  const svgPath = path.join(artifactDir, 'latest-knowledge-graph.svg');
  const pngPath = path.join(artifactDir, 'latest-knowledge-graph.png');

  await writeFile(svgPath, svg, 'utf8');

  if (png) {
    await writeFile(pngPath, png);
  } else {
    await rm(pngPath, { force: true });
  }

  return {
    svg: svgPath,
    ...(png ? { png: pngPath } : {}),
  };
}

function renderSvgToPng(svg: string, width: number) {
  const targetWidth = getPngRenderWidth(svg, width);
  const resvg = new Resvg(svg, {
    background: '#0b1020',
    fitTo: {
      mode: 'width',
      value: targetWidth,
    },
    font: {
      defaultFontFamily: 'SF Mono',
    },
  });

  return resvg.render().asPng();
}

export function getArtifactRenderWidth(graph: KnowledgeGraph, width: number) {
  if (graph.nodes.length > 36 || graph.edges.length > 48) {
    return Math.max(6144, Math.min(MAX_PNG_LONG_SIDE, width * 42));
  }

  if (graph.nodes.length > 18 || graph.edges.length > 20) {
    return Math.max(5120, Math.min(7168, width * 34));
  }

  return Math.max(4096, Math.min(6144, width * 28));
}

export function getPngRenderWidth(svg: string, requestedWidth: number) {
  const clampedRequestedWidth = Math.max(
    MIN_PNG_LONG_SIDE,
    Math.min(MAX_PNG_LONG_SIDE, Math.round(requestedWidth)),
  );
  const viewBox = parseSvgViewBox(svg);

  if (!viewBox) {
    return clampedRequestedWidth;
  }

  const aspectRatio = viewBox.width / viewBox.height;

  if (!Number.isFinite(aspectRatio) || aspectRatio <= 0) {
    return clampedRequestedWidth;
  }

  const areaBoundWidth = Math.sqrt(MAX_PNG_PIXEL_AREA * aspectRatio);

  return Math.max(
    MIN_PNG_LONG_SIDE,
    Math.min(MAX_PNG_LONG_SIDE, Math.round(Math.min(clampedRequestedWidth, areaBoundWidth))),
  );
}

function parseSvgViewBox(svg: string) {
  const match = svg.match(/viewBox="([\d.\s-]+)"/i);

  if (!match) {
    return undefined;
  }

  const [minX, minY, width, height] = match[1].trim().split(/\s+/).map(Number);

  if (![minX, minY, width, height].every(Number.isFinite) || width <= 0 || height <= 0) {
    return undefined;
  }

  return { height, minX, minY, width };
}

function compactPreviewText(text: string, width: number) {
  if (text.length <= width) {
    return text;
  }

  return `${text.slice(0, Math.max(0, width - 3))}...`;
}

function shortenArtifactPath(artifactPath: string) {
  const relativeToCwd = path.relative(process.cwd(), artifactPath);

  if (relativeToCwd.length > 0) {
    return relativeToCwd.split(path.sep).join('/');
  }

  return artifactPath;
}

function sanitizeIdentifier(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '_');
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

function formatArtifactWorkspaceLinesInternal(
  graph: KnowledgeGraph,
  width: number,
  height: number,
  artifactPaths?: GraphPreviewFrame['artifactPaths'],
  devTools?: UiAgentDevToolsInfo,
  persistPng = false,
) {
  const innerWidth = Math.max(28, width - 2);
  const lines: string[] = [
    'Workspace',
    ...wrapPrefixedLine(
      `Live SVG: ${artifactPaths?.svg ? shortenArtifactPath(artifactPaths.svg) : 'pending write'}`,
      innerWidth,
    ),
    ...wrapPrefixedLine(
      persistPng
        ? `PNG snapshot: ${artifactPaths?.png ? shortenArtifactPath(artifactPaths.png) : 'pending write'}`
        : 'PNG snapshot: generated after the final graph settles.',
      innerWidth,
    ),
  ];

  if (devTools?.enabled) {
    lines.push(
      ...wrapPrefixedLine(`DevTools: ${shortenArtifactPath(devTools.generationsPath)}`, innerWidth),
      ...wrapPrefixedLine(`Viewer: ${devTools.viewerUrl}`, innerWidth),
    );
  }

  lines.push(
    '',
    'Graph snapshot',
    ...wrapPrefixedLine(`Title: ${graph.title}`, innerWidth),
    ...wrapPrefixedLine(
      `Nodes ${graph.nodes.length} • Edges ${graph.edges.length} • Evidence ${graph.evidence.length} • Events ${graph.events.length}`,
      innerWidth,
    ),
    ...wrapPrefixedLine(`Clusters: ${summarizeClusters(graph)}`, innerWidth),
  );

  if (graph.lastAgentNote) {
    lines.push(...wrapPrefixedLine(`Last note: ${graph.lastAgentNote}`, innerWidth));
  }

  lines.push(
    '',
    'Key nodes',
    ...buildRankedNodeLines(graph, innerWidth, 8),
    '',
    'Manufacturer + category links',
    ...buildRelationshipLines(graph, innerWidth, ['manufacturer-of', 'contains']),
    '',
    'Recent mutations',
    ...buildEventLines(graph, innerWidth, 8),
  );

  return padLines(lines, height);
}

function buildEventLines(graph: KnowledgeGraph, width: number, limit: number) {
  if (graph.events.length === 0) {
    return ['- No graph mutations yet.'];
  }

  return graph.events
    .slice(-limit)
    .flatMap((event) =>
      wrapPrefixedLine(`- ${event.type} • ${event.trigger} • ${event.summary}`, width),
    );
}

function buildRankedNodeLines(graph: KnowledgeGraph, width: number, limit: number) {
  const degreeMap = new Map<string, number>();

  for (const edge of graph.edges) {
    degreeMap.set(edge.fromId, (degreeMap.get(edge.fromId) ?? 0) + 1);
    degreeMap.set(edge.toId, (degreeMap.get(edge.toId) ?? 0) + 1);
  }

  const rankedNodes = [...graph.nodes]
    .sort((left, right) => {
      const degreeDelta = (degreeMap.get(right.id) ?? 0) - (degreeMap.get(left.id) ?? 0);

      if (degreeDelta !== 0) {
        return degreeDelta;
      }

      return left.label.localeCompare(right.label);
    })
    .slice(0, limit);

  return rankedNodes.flatMap((node) => {
    const segments = [
      `${node.label} (${node.kind}`,
      node.cluster ? ` • ${node.cluster}` : '',
      ` • degree ${degreeMap.get(node.id) ?? 0})`,
    ].join('');

    return wrapPrefixedLine(`- ${segments}`, width);
  });
}

function buildRelationshipLines(graph: KnowledgeGraph, width: number, relations: GraphRelation[]) {
  const interestingEdges = graph.edges
    .filter((edge) => relations.includes(edge.relation))
    .slice(-10);

  if (interestingEdges.length === 0) {
    return ['- No manufacturer or category links yet.'];
  }

  return interestingEdges.flatMap((edge) => {
    const summary = [edge.summary, edge.label].filter(Boolean).join(' • ');

    return wrapPrefixedLine(
      `- ${lookupNodeLabel(graph, edge.fromId)} ${edge.relation} ${lookupNodeLabel(graph, edge.toId)}${summary ? ` • ${summary}` : ''}`,
      width,
    );
  });
}

function lookupNodeLabel(graph: KnowledgeGraph, nodeId: string) {
  return graph.nodes.find((node) => node.id === nodeId)?.label ?? nodeId;
}

function summarizeClusters(graph: KnowledgeGraph) {
  const clusterCounts = new Map<string, number>();

  for (const node of graph.nodes) {
    const cluster = node.cluster ?? defaultCluster(node);

    clusterCounts.set(cluster, (clusterCounts.get(cluster) ?? 0) + 1);
  }

  return [...clusterCounts.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, 6)
    .map(([cluster, count]) => `${cluster} ${count}`)
    .join(' • ');
}

function wrapPrefixedLine(text: string, width: number) {
  return wrapText(compactPreviewText(text, 800), width);
}
