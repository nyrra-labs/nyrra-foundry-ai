import process from 'node:process';
import { inspect } from 'node:util';

const EXAMPLE_INSPECT_OPTIONS = {
  breakLength: 120,
  colors: process.stdout.isTTY,
  compact: false,
  depth: null,
  maxArrayLength: null,
  sorted: true,
} as const;

export function logExampleValue(value: unknown): void {
  console.log(inspect(value, EXAMPLE_INSPECT_OPTIONS));
}

export function logExampleError(value: unknown): void {
  console.error(inspect(value, EXAMPLE_INSPECT_OPTIONS));
}
