import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class ToastContext {
  constructor(public readonly message: string) {}
}

@Component({
  template: `<div>{{ context.message }}</div>`,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('state', [
      state('void, hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('* => void, * => hidden', animate('100ms')),
    ]),
  ],

  host: {
    role: 'status',
    'aria-live': 'polite',
    '[@state]': 'animationState',
    '(@state.done)': 'onAnimationDone($event)',
  },
  standalone: true,
})
export class ToastComponent implements OnDestroy {
  animationState = 'void';

  readonly afterDismissed = new Subject<void>();
  private destroyed = false;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    public readonly context: ToastContext,
  ) {}

  ngOnDestroy() {
    this.destroyed = true;
    this.completeEnd();
  }

  detectChanges() {
    this.cdRef.detectChanges();
  }

  enter() {
    if (!this.destroyed) {
      this.animationState = 'visible';
    }
  }

  exit() {
    this.animationState = 'hidden';
  }

  onAnimationDone(event: AnimationEvent) {
    const { fromState, toState } = event;

    if ((fromState !== 'void' && toState === 'void') || toState === 'hidden') {
      this.completeEnd();
      return;
    }
  }

  private completeEnd() {
    this.afterDismissed.next();
    this.afterDismissed.complete();
  }
}
