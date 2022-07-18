import { render, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TooltipModule } from './tooltip.module';

describe('TooltipDirective', () => {
  it('[appTooltip] does not show message in the DOM by default', async () => {
    const message = 'This is a tooltip';
    const { queryByText } = await render(`<div [appTooltip]="message">HOST</div>`, {
      imports: [TooltipModule],
      componentProperties: { message },
    });
    expect(queryByText('HOST')).toBeInTheDocument();
    expect(queryByText(message)).toBeNull();
  });

  it('[appTooltip] show message in the DOM while hovering on the host element', async () => {
    const message = 'This is a tooltip';
    const { getByText, queryByText } = await render(`<div [appTooltip]="message">HOST</div>`, {
      imports: [TooltipModule],
      componentProperties: { message },
    });
    const host = getByText('HOST');
    userEvent.hover(host);
    expect(queryByText(message)).toBeInTheDocument();
    userEvent.unhover(host);
    expect(queryByText(message)).not.toBeInTheDocument();
  });
});
