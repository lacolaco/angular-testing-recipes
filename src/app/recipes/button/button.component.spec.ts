import { render } from '@testing-library/angular';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  it('should render a button with content', async () => {
    const { getByRole } = await render(`<button app-button>TEXT</button>`, {
      imports: [ButtonComponent],
    });

    expect(getByRole('button', { name: 'TEXT' })).toBeInTheDocument();
  });

  describe('appearance', () => {
    it('should render a stroked button', async () => {
      const { getByRole } = await render(`<button app-button appearance="stroked">TEXT</button>`, {
        imports: [ButtonComponent],
      });

      expect(getByRole('button', { name: 'TEXT' })).toHaveClass('app-button-stroked');
    });
  });
});
