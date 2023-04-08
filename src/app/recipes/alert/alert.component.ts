import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

type AlertContext = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info';

@Component({
  selector: 'app-alert',
  template: `
    <ng-content></ng-content>
    <button *ngIf="dismissible" (click)="close()" type="button" aria-label="Close">x</button>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'app-alert',
    '[style.display]': 'isClosed ? "none" : "block"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf],
})
export class AlertComponent {
  /**
   * @todo Not implemented
   */
  @Input()
  context: AlertContext = 'secondary';

  @Input()
  get dismissible(): boolean {
    return this._dismissible;
  }

  set dismissible(value: BooleanInput) {
    this._dismissible = coerceBooleanProperty(value);
    this.cdRef.markForCheck();
  }
  private _dismissible = false;

  @Output()
  readonly closed = new EventEmitter<void>();

  @HostBinding('attr.role')
  get role() {
    return this.isClosed ? null : this.dismissible ? 'alertdialog' : 'alert';
  }

  isClosed = false;

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  close() {
    this.isClosed = true;
    this.closed.emit();
    this.cdRef.markForCheck();
  }
}
