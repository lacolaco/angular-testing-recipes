require('jest-preset-angular/global-setup');

module.exports = {
  preset: 'jest-preset-angular',

  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
};
