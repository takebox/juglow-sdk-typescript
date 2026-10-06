import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { sourceMaps: 'inline' }],
  },
  moduleNameMapper: {
    '^@takebox-ai/google-cloud-sdk$': '<rootDir>/src/index.ts',
    '^@takebox-ai/google-cloud-sdk/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/deno/'],
  testPathIgnorePatterns: ['scripts'],
};

export default config;
