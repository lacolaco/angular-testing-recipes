import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { ButtonComponent } from './button.component';

export default {
  title: 'Button',
  component: ButtonComponent,
  decorators: [moduleMetadata({ imports: [ButtonComponent] })],
} as Meta;

export const defaultButton: StoryFn<ButtonComponent> = (args) => ({
  template: `<button app-button [appearance]="appearance">BUTTON</button>`,
  props: args,
});
defaultButton.args = {
  appearance: 'basic',
};

export const strokedButton = () => ({
  template: `<button app-button appearance="stroked">BUTTON</button>`,
});
