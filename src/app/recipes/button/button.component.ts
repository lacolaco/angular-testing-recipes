import { Component, OnInit, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[app-button]',
  template: `<ng-content />`,
  styles: `
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
  host: {
    class: 'app-button',
    '[class.app-button-stroked]': "appearance() === 'stroked'",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly appearance = input<'basic' | 'stroked'>('basic');
}
