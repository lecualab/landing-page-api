const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  rootDir: '.',
  prettierPath: null, // HACK: Prettier v3 is incompatible with Jest's inline snapshots
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  collectCoverageFrom: ['src/**/*.(use-case|adapter|service).ts'],
  testPathIgnorePatterns: ['^app/.+$'],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  testEnvironment: 'node',
  clearMocks: true,
  setupFilesAfterEnv: ['jest-extended/all', '<rootDir>/jest.setup.ts'],
  // Helps to use aliases in tsconfig (@module/*)
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths ?? {}, {
    prefix: '<rootDir>',
  }),
};
