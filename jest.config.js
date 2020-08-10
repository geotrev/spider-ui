module.exports = {
  clearMocks: true,
  collectCoverageFrom: ["<rootDir>/packages/*/src/**/*.js"],
  restoreMocks: true,
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/.jest/empty-mock.js",
  },
  testMatch: ["<rootDir>/packages/*/__tests__/*.spec.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testURL: "http://localhost/",
  transform: { "^.+\\.js$": "babel-jest" },
  verbose: true,
}
