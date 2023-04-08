import { Component } from '@angular/core';
import { screen, render, fireEvent } from '@testing-library/angular';

@Component({
  selector: 'app-message',
  template: `
    <button (click)="toggleLanguage()">Toggle Language</button>
    <p>{{ message }}</p>
  `,
  standalone: true,
})
export class MessageComponent {
  private language: 'en' | 'ja' = 'en';

  get message() {
    return this.language === 'en' ? 'Hello' : 'こんにちは';
  }

  toggleLanguage() {
    this.language = this.language === 'en' ? 'ja' : 'en';
  }
}

describe('MessageComponent', () => {
  it('should render "Hello"', async () => {
    await render(MessageComponent);

    expect(screen.getByText('Hello')).toBeDefined();
  });
  it('should render "こんにちは" after toggle language button click', async () => {
    await render(MessageComponent);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('こんにちは')).toBeDefined();
  });
});
