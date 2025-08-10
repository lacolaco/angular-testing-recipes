import { ChangeDetectionStrategy, Component, booleanAttribute, computed, input, output, signal } from '@angular/core';

type AlertContext = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info';

@Component({
  selector: 'app-alert',
  template: `
    <ng-content />
    @if (dismissible()) {
      <button (click)="close()" type="button" aria-label="Close">x</button>
    }
  `,
  styles: `
    :host {
      display: block;
    }
  `,

  host: {
    class: 'app-alert',
    '[style.display]': 'isClosed() ? "none" : "block"',
    '[attr.role]': 'role()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class AlertComponent {
  /**
   * @todo Not implemented
   */
  readonly context = input<AlertContext>('secondary');

  readonly dismissible = input(false, { transform: booleanAttribute });

  readonly closed = output<void>();

  readonly role = computed(() => {
    return this.isClosed() ? null : this.dismissible() ? 'alertdialog' : 'alert';
  });

  readonly isClosed = signal(false);

  close() {
    this.isClosed.set(true);
    this.closed.emit();
  }
}
