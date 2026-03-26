import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    index: 'src/index.ts',
    'providers/openai': 'src/providers/openai.ts',
    'providers/anthropic': 'src/providers/anthropic.ts',
    registry: 'src/registry.ts',
  },
  external: ['ai', '@ai-sdk/openai', '@ai-sdk/anthropic'],
  format: ['esm', 'cjs'],
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
  outDir: 'dist',
  sourcemap: true,
  target: 'es2022',
  tsconfig: './tsconfig.lib.json',
});
