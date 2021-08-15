import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { TooltipModule } from './tooltip.module';

export default {
  title: 'Tooltip',
  decorators: [
    moduleMetadata({
      imports: [TooltipModule],
    }),
  ],
} as Meta;

export const SimpleUsage: Story<{ message: string }> = (args) => ({
  template: `<div>Header</div><div [appTooltip]="message">Tooltip host</div><div>Footer</div>`,
  props: args,
});
SimpleUsage.args = {
  message: 'This is tooltip',
};
