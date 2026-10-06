import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { sourceMaps: 'inline' }],
  },
  moduleNameMapper: {
    '^@takebox-ai/bedrock-sdk$': '<rootDir>/src/index.ts',
    '^@takebox-ai/bedrock-sdk/(.*)$': '<rootDir>/src/$1',
    // Pin the core SDK to this package's copy: the aws-auth.ts symlink
    // resolves to its realpath in aws-sdk, which would otherwise load a
    // second copy of the SDK whose error classes fail instanceof checks.
    '^@takebox-ai/sdk$': '<rootDir>/node_modules/@takebox-ai/sdk',
    '^@takebox-ai/sdk/(.*)$': '<rootDir>/node_modules/@takebox-ai/sdk/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/deno/'],
  testPathIgnorePatterns: ['scripts'],
};

export default config;
