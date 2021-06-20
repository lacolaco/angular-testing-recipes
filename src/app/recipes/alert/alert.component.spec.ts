import { render } from '@testing-library/angular';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  it('should render an alert', async () => {
    const { getByRole } = await render(`<app-alert>TEXT</app-alert>`, {
      declarations: [AlertComponent],
    });

    expect(getByRole('alert', { hidden: false })).toHaveTextContent('TEXT');
  });

  // TODO: add specs for context

  describe('dismissible alert', () => {
    it('should have a close button', async () => {
      const { getByRole } = await render(
        `<app-alert dismissible>TEXT</app-alert>`,
        { declarations: [AlertComponent] },
      );

      expect(getByRole('button', { name: /Close/i })).toBeInTheDocument();
    });

    it('should dismiss after close button click', async () => {
      const { getByRole } = await render(
        `<app-alert dismissible>TEXT</app-alert>`,
        { declarations: [AlertComponent] },
      );
      getByRole('button', { name: /Close/i }).click();

      expect(getByRole('alert', { hidden: true })).toBeInTheDocument();
    });

    it('should emit (closed) event', async () => {
      const onClosed = jest.fn();
      const { getByRole } = await render(
        `<app-alert dismissible (closed)="onClosed($event)">TEXT</app-alert>`,
        {
          declarations: [AlertComponent],
          componentProperties: { onClosed },
        },
      );
      getByRole('button', { name: /Close/i }).click();

      expect(onClosed).toHaveBeenCalled();
    });
  });
});
