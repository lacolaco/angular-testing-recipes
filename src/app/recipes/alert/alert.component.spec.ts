import { render, waitFor } from '@testing-library/angular';
import { AlertComponent } from './alert.component';
import userEvent from '@testing-library/user-event';

describe('AlertComponent', () => {
  it('should render an alert', async () => {
    const { getByRole } = await render(`<app-alert>TEXT</app-alert>`, {
      imports: [AlertComponent],
    });

    expect(getByRole('alert').textContent).toContain('TEXT');
  });

  // TODO: add specs for context

  describe('dismissible alert', () => {
    it('should render an alertdialog', async () => {
      const { getByRole } = await render(`<app-alert dismissible>TEXT</app-alert>`, { imports: [AlertComponent] });

      expect(getByRole('alertdialog').textContent).toContain('TEXT');
    });

    it('should have a close button', async () => {
      const { getByRole } = await render(`<app-alert dismissible>TEXT</app-alert>`, { imports: [AlertComponent] });

      expect(getByRole('button', { name: /Close/i })).not.toBeNull();
    });

    it('should dismiss after close button click', async () => {
      const { getByRole, queryByRole } = await render(`<app-alert dismissible>TEXT</app-alert>`, {
        imports: [AlertComponent],
      });

      await userEvent.click(getByRole('button', { name: /Close/i }));

      await waitFor(() => {
        expect(queryByRole('alertdialog')).toBeNull();
      });
    });

    it('should emit (closed) event', async () => {
      const onClosed = jasmine.createSpy();
      const { getByRole } = await render(`<app-alert dismissible (closed)="onClosed($event)">TEXT</app-alert>`, {
        imports: [AlertComponent],
        componentProperties: { onClosed },
      });

      await userEvent.click(getByRole('button', { name: /Close/i }));

      expect(onClosed).toHaveBeenCalled();
    });
  });
});
