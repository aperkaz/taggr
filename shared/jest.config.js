module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.build.json',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/src/**/*.spec.ts'],
  testEnvironment: 'node',
  resetMocks: true,
  setupFiles: [],
};
