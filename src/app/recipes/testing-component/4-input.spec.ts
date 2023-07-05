import { Component, Input } from '@angular/core';
import { screen, render } from '@testing-library/angular';

@Component({
  selector: 'app-title',
  template: ` <h1>{{ appName }}</h1> `,
  standalone: true,
})
export class TitleComponent {
  @Input() appName = '';
}

describe('TitleComponent', () => {
  // By render(type)
  it('should render application title', async () => {
    await render(TitleComponent, {
      componentInputs: { appName: 'My Application' },
    });

    expect(screen.getByRole('heading').textContent).toContain('My Application');
  });
  it('should render changed application title', async () => {
    const { rerender } = await render(TitleComponent, {
      componentInputs: { appName: 'My Application' },
    });

    await rerender({ componentInputs: { appName: 'My Application v2' } });

    expect(screen.getByRole('heading').textContent).toContain('My Application v2');
  });

  // By render(template)
  it('should render application title', async () => {
    await render(`<app-title [appName]="'My Application'"></app-title>`, {
      imports: [TitleComponent],
    });

    expect(screen.getByRole('heading').textContent).toContain('My Application');
  });
  it('should render changed application title', async () => {
    const { rerender } = await render(`<app-title [appName]="appName"></app-title>`, {
      imports: [TitleComponent],
      componentProperties: { appName: 'My Application' },
    });

    await rerender({ componentProperties: { appName: 'My Application v2' } });

    expect(screen.getByRole('heading').textContent).toContain('My Application v2');
  });
});
