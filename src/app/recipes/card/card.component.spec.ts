import { render } from '@testing-library/angular';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  it('should show text content', async () => {
    const { getByText } = await render(`<app-card>TEXT</app-card>`, {
      imports: [CardComponent],
    });

    const card = getByText('TEXT');
    expect(card).toBeInTheDocument();
  });
});
