import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.test.ts', '../../scripts/**/*.test.mjs'],
    exclude: ['src/**/*.live.test.ts'],
    watch: false,
  },
});
