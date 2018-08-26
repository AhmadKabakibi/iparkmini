module.exports = {
  coverageDirectory: './docs/coverage',
  coveragePathIgnorePatterns: [],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30
    }
  },
  reporters: ['default', './node_modules/jest-html-reporter'],
  testMatch: [
    '**/*.spec.js'
  ],
  testURL: 'http://localhost/'
}
