import { rm } from 'node:fs/promises';

const generatedPaths = [
  'packages/foundry-ai/dist',
  'packages/foundry-ai/dist-types',
  'out-tsc',
  'tsconfig.tsbuildinfo',
];

await Promise.all(
  generatedPaths.map(async (path) => {
    await rm(path, { force: true, recursive: true });
  }),
);
