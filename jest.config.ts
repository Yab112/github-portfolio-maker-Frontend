export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Load Jest matchers
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.node.json"
      }
    ]
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};
