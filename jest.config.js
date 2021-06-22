require('jest-preset-angular/ngcc-jest-processor');

module.exports = {
  preset: 'jest-preset-angular',

  testEnvironment: '<rootDir>/jest/zone-jsdom-environment.js', // workaround for https://github.com/thymikee/jest-preset-angular/issues/520
  setupFilesAfterEnv: [
    '<rootDir>/jest/jest-zone.js', // workaround for https://github.com/thymikee/jest-preset-angular/issues/520
    '<rootDir>/src/setup-jest.ts',
  ],
};
