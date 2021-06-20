import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/angular';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  it('should render an alert', async () => {
    const { getByRole } = await render(`<app-alert>TEXT</app-alert>`, {
      declarations: [AlertComponent],
    });

    expect(getByRole('alert')).toHaveTextContent('TEXT');
  });

  // TODO: add specs for context

  describe('dismissible alert', () => {
    it('should render an alertdialog', async () => {
      const { getByRole } = await render(
        `<app-alert dismissible>TEXT</app-alert>`,
        { declarations: [AlertComponent] },
      );

      expect(getByRole('alertdialog')).toHaveTextContent('TEXT');
    });

    it('should have a close button', async () => {
      const { getByRole } = await render(
        `<app-alert dismissible>TEXT</app-alert>`,
        { declarations: [AlertComponent] },
      );

      expect(getByRole('button', { name: /Close/i })).toBeInTheDocument();
    });

    it('should dismiss after close button click', async () => {
      const { getByRole, queryByRole } = await render(
        `<app-alert dismissible>TEXT</app-alert>`,
        { declarations: [AlertComponent] },
      );
      getByRole('button', { name: /Close/i }).click();

      await waitFor(() => {
        expect(queryByRole('alertdialog')).not.toBeInTheDocument();
      });
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
