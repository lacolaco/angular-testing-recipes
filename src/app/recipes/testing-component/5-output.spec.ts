import { Component, EventEmitter, Input, Output } from '@angular/core';
import { screen, render, fireEvent } from '@testing-library/angular';

@Component({
  selector: 'app-toast',
  template: `
    <div>
      <p>{{ message }}</p>
      <button (click)="close()">Close</button>
    </div>
  `,
  standalone: true,
})
export class ToastComponent {
  @Input() message = '';
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}

describe('ToastComponent', () => {
  it('should render passed message', async () => {
    await render(`<app-toast [message]="message"></app-toast>`, {
      imports: [ToastComponent],
      componentProperties: { message: 'Test Message' },
    });

    expect(screen.getByText('Test Message')).toBeDefined();
  });

  it('should emit (closed) on "Close" button click', async () => {
    const onClosed = jasmine.createSpy();
    await render(`<app-toast [message]="message" (closed)="onClosed()"></app-toast>`, {
      imports: [ToastComponent],
      componentProperties: { message: 'Test Message', onClosed },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(onClosed).toHaveBeenCalled();
  });
});
