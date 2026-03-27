#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';

const [, , manifestPath, nextVersion] = process.argv;

if (!manifestPath || !nextVersion) {
  throw new Error('Usage: node scripts/set-package-version.mjs <manifest-path> <version>');
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
manifest.version = nextVersion;
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
