import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';

export default {
  title: 'Button',
  component: ButtonComponent,
  decorators: [moduleMetadata({ imports: [ButtonModule] })],
} as Meta;

export const defaultButton: Story<ButtonComponent> = (args) => ({
  template: `<button app-button [appearance]="appearance">BUTTON</button>`,
  props: args,
});
defaultButton.args = {
  appearance: 'basic',
};

export const strokedButton = () => ({
  template: `<button app-button appearance="stroked">BUTTON</button>`,
});
