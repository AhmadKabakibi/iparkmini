module.exports = {
  coverageDirectory: './docs/coverage',
  coveragePathIgnorePatterns: [],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10
    }
  },
  reporters: ['default', './node_modules/jest-html-reporter'],
  testMatch: [
    '**/*.spec.js'
  ],
  testURL: 'http://localhost/',
  testEnvironment: 'node'
}
