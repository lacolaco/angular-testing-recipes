import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[app-button]',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: inline-block;
        box-sizing: border-box;
        border-radius: 0.5rem;
        border: 1px solid transparent;
        padding: 1rem 1.5rem;
      }
      :host-context(.app-button-stroked) {
        border: 1px solid #333;
      }
    `,
  ],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'app-button',
    '[class.app-button-stroked]': "appearance === 'stroked'",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ButtonComponent {
  @Input() appearance: 'basic' | 'stroked' = 'basic';
}
