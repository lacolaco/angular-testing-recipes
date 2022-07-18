import { Component, Input } from '@angular/core';
import { screen, render, fireEvent } from '@testing-library/angular';

@Component({
  selector: 'app-title',
  template: ` <h1>{{ appName }}</h1> `,
})
export class TitleComponent {
  @Input() appName = '';
}

describe('TitleComponent', () => {
  // By render(type)
  it('should render application title', async () => {
    await render(TitleComponent, {
      componentProperties: { appName: 'My Application' },
    });

    expect(screen.getByRole('heading').textContent).toContain('My Application');
  });
  it('should render changed application title', async () => {
    const { change } = await render(TitleComponent, {
      componentProperties: { appName: 'My Application' },
    });

    change({ appName: 'My Application v2' });

    expect(screen.getByRole('heading').textContent).toContain('My Application v2');
  });

  // By render(template)
  it('should render application title', async () => {
    await render(`<app-title [appName]="'My Application'"></app-title>`, {
      declarations: [TitleComponent],
    });

    expect(screen.getByRole('heading').textContent).toContain('My Application');
  });
  it('should render changed application title', async () => {
    const { change } = await render(`<app-title [appName]="appName"></app-title>`, {
      declarations: [TitleComponent],
      componentProperties: { appName: 'My Application' },
    });

    change({ appName: 'My Application v2' });

    expect(screen.getByRole('heading').textContent).toContain('My Application v2');
  });
});
