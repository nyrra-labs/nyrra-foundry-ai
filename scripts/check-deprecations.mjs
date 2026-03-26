#!/usr/bin/env node

import { dirname, relative, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tsconfigPath = resolve(workspaceRoot, readProjectPath(process.argv.slice(2)));

const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);

if (configFile.error) {
  reportDiagnostic(configFile.error);
  process.exit(1);
}

const parsedConfig = ts.parseJsonConfigFileContent(
  configFile.config,
  ts.sys,
  dirname(tsconfigPath),
  undefined,
  tsconfigPath,
);

if (parsedConfig.errors.length > 0) {
  for (const diagnostic of parsedConfig.errors) {
    reportDiagnostic(diagnostic);
  }

  process.exit(1);
}

const program = ts.createProgram({
  rootNames: parsedConfig.fileNames,
  options: parsedConfig.options,
  projectReferences: parsedConfig.projectReferences,
});
const checker = program.getTypeChecker();
const findings = [];
const seen = new Set();

for (const sourceFile of program.getSourceFiles()) {
  if (
    sourceFile.isDeclarationFile ||
    !isWorkspaceSourceFile(sourceFile.fileName) ||
    sourceFile.fileName.includes('/dist/')
  ) {
    continue;
  }

  visitSourceFile(sourceFile);
}

if (findings.length > 0) {
  console.error('Deprecated API usage detected:');

  for (const finding of findings) {
    console.error(
      `${finding.path}:${finding.line}:${finding.column} ${finding.expression}\n  ${finding.message}`,
    );
  }

  process.exit(1);
}

function readProjectPath(args) {
  const projectFlagIndex = args.indexOf('--project');

  if (projectFlagIndex === -1) {
    return 'tsconfig.json';
  }

  const projectPath = args[projectFlagIndex + 1];

  if (projectPath == null || projectPath.startsWith('--')) {
    throw new Error('Expected a path after --project.');
  }

  return projectPath;
}

function isWorkspaceSourceFile(filePath) {
  const relativePath = relative(workspaceRoot, filePath);

  return !relativePath.startsWith('..') && !relativePath.includes('/node_modules/');
}

function visitSourceFile(sourceFile) {
  const visit = (node) => {
    if (
      ts.isCallExpression(node) ||
      ts.isNewExpression(node) ||
      ts.isTaggedTemplateExpression(node)
    ) {
      const signature = checker.getResolvedSignature(node);

      if (signature != null) {
        const message =
          getDeprecatedMessageFromTags(signature.getJsDocTags()) ??
          getDeprecatedMessageFromDeclaration(signature.getDeclaration());

        if (message != null) {
          addFinding(getReferencedExpression(node), message);
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
}

function getReferencedExpression(node) {
  if (ts.isTaggedTemplateExpression(node)) {
    return node.tag;
  }

  return node.expression;
}

function getDeprecatedMessageFromDeclaration(declaration) {
  if (declaration == null) {
    return undefined;
  }

  const deprecatedTag = ts.getJSDocDeprecatedTag(declaration);

  if (deprecatedTag == null) {
    return undefined;
  }

  return normalizeDeprecatedMessage(deprecatedTag.comment);
}

function getDeprecatedMessageFromTags(tags) {
  const deprecatedTag = tags.find((tag) => tag.name === 'deprecated');

  if (deprecatedTag == null) {
    return undefined;
  }

  return normalizeDeprecatedMessage(deprecatedTag.text);
}

function normalizeDeprecatedMessage(comment) {
  if (comment == null) {
    return 'Deprecated API.';
  }

  if (typeof comment === 'string') {
    return comment.trim() || 'Deprecated API.';
  }

  const text = comment
    .map((part) => {
      if (typeof part === 'string') {
        return part;
      }

      return part.text;
    })
    .join('')
    .trim();

  return text || 'Deprecated API.';
}

function addFinding(expression, message) {
  const sourceFile = expression.getSourceFile();
  const relativePath = relative(workspaceRoot, sourceFile.fileName).replaceAll('\\', '/');
  const position = ts.getLineAndCharacterOfPosition(sourceFile, expression.getStart(sourceFile));
  const key = `${relativePath}:${position.line}:${position.character}:${expression.getText(sourceFile)}`;

  if (seen.has(key)) {
    return;
  }

  seen.add(key);
  findings.push({
    path: relativePath,
    line: position.line + 1,
    column: position.character + 1,
    expression: expression.getText(sourceFile),
    message,
  });
}

function reportDiagnostic(diagnostic) {
  console.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
}
