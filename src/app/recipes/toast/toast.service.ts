import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastComponent, ToastContext } from './toast.component';

const defaultToastDurationMs = 3000;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private openingToastRef: {
    overlay: OverlayRef;
  } | null = null;

  constructor(
    private readonly overlay: Overlay,
    private readonly injector: Injector,
  ) {}

  show(message: string, options: { durationMs?: number } = {}) {
    const context = new ToastContext(message);
    const overlayRef = this.createOverlay();
    const portal = this.createPortal(context);

    const componentRef = overlayRef.attach(portal);
    componentRef.instance.enter();
    componentRef.changeDetectorRef.detectChanges();

    timer(options.durationMs ?? defaultToastDurationMs)
      .pipe(takeUntil(componentRef.instance.afterDismissed))
      .subscribe(() => {
        componentRef.instance.exit();
        componentRef.changeDetectorRef.detectChanges();
      });

    componentRef.instance.afterDismissed.subscribe(() => {
      this.hide();
    });

    this.openingToastRef = { overlay: overlayRef };
  }
  hide() {
    if (this.openingToastRef) {
      this.openingToastRef.overlay.dispose();
      this.openingToastRef = null;
    }
  }

  private createOverlay() {
    const positionStrategy = this.overlay.position().global().centerHorizontally().bottom();
    return this.overlay.create({
      positionStrategy,
    });
  }

  private createPortal(context: ToastContext) {
    return new ComponentPortal(
      ToastComponent,
      undefined,
      Injector.create({
        providers: [
          {
            provide: ToastContext,
            useValue: context,
          },
        ],
        parent: this.injector,
      }),
    );
  }
}
