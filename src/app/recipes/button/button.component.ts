import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[app-button]',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'app-button',
    '[class.app-button-stroked]': "appearance === 'stroked'",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() appearance: 'basic' | 'stroked' = 'basic';
}
