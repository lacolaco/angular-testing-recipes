import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

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
  it('.message should be "Hello"', async () => {
    await TestBed.configureTestingModule({
      imports: [MessageComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MessageComponent);
    const component = fixture.componentInstance;

    expect(component.message).toBe('Hello');
  });
  it('.message should be "こんにちは" after toggleLanguage()', async () => {
    await TestBed.configureTestingModule({
      imports: [MessageComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MessageComponent);
    const component = fixture.componentInstance;
    component.toggleLanguage();

    expect(component.message).toBe('こんにちは');
  });

  it('should render "Hello"', async () => {
    await TestBed.configureTestingModule({
      imports: [MessageComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MessageComponent);
    const element = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    expect(element.textContent).toContain('Hello');
  });
  it('should render "こんにちは" after toggle language button click', async () => {
    await TestBed.configureTestingModule({
      imports: [MessageComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(MessageComponent);
    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector('button') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(element.textContent).toContain('こんにちは');
  });
});
