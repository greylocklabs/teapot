module.exports = {
  collectCoverageFrom: [
    'src/**/*',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  testMatch: [
    '**/*.spec.ts',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
