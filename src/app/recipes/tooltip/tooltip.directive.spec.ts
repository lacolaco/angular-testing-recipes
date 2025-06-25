import { render, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TooltipDirective } from './tooltip.directive';

describe('TooltipDirective', () => {
  it('[appTooltip] does not show message in the DOM by default', async () => {
    const message = 'This is a tooltip';
    const { queryByText } = await render(`<div [appTooltip]="message">HOST</div>`, {
      imports: [TooltipDirective],
      componentProperties: { message },
    });
    expect(queryByText('HOST')).not.toBeNull();
    expect(queryByText(message)).toBeNull();
  });

  it('[appTooltip] show message in the DOM while hovering on the host element', async () => {
    const message = 'This is a tooltip';
    const { getByText, queryByText } = await render(`<div [appTooltip]="message">HOST</div>`, {
      imports: [TooltipDirective],
      componentProperties: { message },
    });
    const host = getByText('HOST');
    await userEvent.hover(host);
    expect(queryByText(message)).not.toBeNull();
    await userEvent.unhover(host);
    expect(queryByText(message)).toBeNull();
  });
});
