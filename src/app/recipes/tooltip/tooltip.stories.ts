import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { TooltipDirective } from './tooltip.directive';

export default {
  title: 'Tooltip',
  decorators: [
    moduleMetadata({
      imports: [TooltipDirective],
    }),
  ],
  parameters: {
    screenshot: {
      variants: {
        hovered: {
          hover: '#tooltipHost',
        },
      },
    },
  },
} as Meta;

export const SimpleUsage: Story<{ message: string }> = (args) => ({
  template: `<div>Header</div><div id="tooltipHost" [appTooltip]="message">Tooltip host</div><div>Footer</div>`,
  props: args,
});
SimpleUsage.args = {
  message: 'This is tooltip',
};
