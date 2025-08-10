import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnDestroy, inject, signal } from '@angular/core';
import { Subject } from 'rxjs';

export class ToastContext {
  constructor(public readonly message: string) {}
}

@Component({
  template: `<div>{{ context.message }}</div>`,
  styles: `
    :host {
      display: block;
    }
  `,
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
    '[@state]': 'animationState()',
    '(@state.done)': 'onAnimationDone($event)',
  },
})
export class ToastComponent implements OnDestroy {
  readonly context = inject(ToastContext);

  readonly animationState = signal<'void' | 'hidden' | 'visible'>('void');

  readonly afterDismissed = new Subject<void>();
  private readonly destroyed = signal(false);

  ngOnDestroy() {
    this.destroyed.set(true);
    this.completeEnd();
  }

  enter() {
    if (!this.destroyed()) {
      this.animationState.set('visible');
    }
  }

  exit() {
    this.animationState.set('hidden');
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
