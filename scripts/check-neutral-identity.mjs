#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';

// Build the retired five-character identity from code points so this guard does not self-match.
const forbiddenIdentity = String.fromCharCode(110, 121, 114, 114, 97);
const files = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
  { encoding: 'utf8' },
)
  .split('\0')
  .filter(Boolean);
const matches = [];

for (const file of files) {
  if (file.toLowerCase().includes(forbiddenIdentity)) {
    matches.push(`${file} (path)`);
    continue;
  }

  if (!statSync(file).isFile()) {
    continue;
  }

  const contents = readFileSync(file).toString('utf8').toLowerCase();
  if (contents.includes(forbiddenIdentity)) {
    matches.push(file);
  }
}

if (matches.length > 0) {
  console.error('Retired identity references found:');
  for (const match of matches) {
    console.error(`- ${match}`);
  }
  process.exit(1);
}

console.log(`Neutral identity check passed across ${files.length} repository files.`);
