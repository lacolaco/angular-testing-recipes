module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', 'storycap', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/angular',
    options: {}
  }
};