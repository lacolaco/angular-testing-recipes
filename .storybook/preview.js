import { setCompodocJson } from '@storybook/addon-docs/angular';
import { withScreenshot } from 'storycap';
import docJson from '../documentation.json';

setCompodocJson(docJson);

export const decorators = [
  withScreenshot,
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
  screenshot: {
    viewport: 'iPhone 5',
  },
};
