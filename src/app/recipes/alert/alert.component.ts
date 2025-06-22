import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  inject,
  input,
  output,
} from '@angular/core';

type AlertContext = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info';

@Component({
  selector: 'app-alert',
  template: `
    <ng-content />
    @if (dismissible) {
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
    '[style.display]': 'isClosed ? "none" : "block"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class AlertComponent {
  private readonly cdRef = inject(ChangeDetectorRef);

  /**
   * @todo Not implemented
   */
  readonly context = input<AlertContext>('secondary');

  @Input()
  get dismissible(): boolean {
    return this._dismissible;
  }

  set dismissible(value: BooleanInput) {
    this._dismissible = coerceBooleanProperty(value);
    this.cdRef.markForCheck();
  }
  private _dismissible = false;

  readonly closed = output<void>();

  @HostBinding('attr.role')
  get role() {
    return this.isClosed ? null : this.dismissible ? 'alertdialog' : 'alert';
  }

  isClosed = false;

  close() {
    this.isClosed = true;
    // TODO: The 'emit' function requires a mandatory void argument
    this.closed.emit();
    this.cdRef.markForCheck();
  }
}
