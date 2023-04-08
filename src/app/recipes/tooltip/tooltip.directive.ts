/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Component, ComponentRef, Directive, HostListener, Input, ViewContainerRef } from '@angular/core';

@Component({
  template: `<div class="tooltip-pane">
    {{ message }}
  </div>`,
  styles: [
    `
      :host {
        position: relative;
      }

      .tooltip-pane {
        position: absolute;
        top: 0;
        padding: 4px;
        background-color: #333;
        color: #fff;
        opacity: 0.8;
        white-space: nowrap;
      }
    `,
  ],
  standalone: true,
})
export class TooltipComponent {
  message: string = '';
}

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input('appTooltip') message = '';

  private tooltipInstance: ComponentRef<TooltipComponent> | null = null;

  constructor(private readonly vcRef: ViewContainerRef) {}

  @HostListener('mouseenter', ['$event'])
  onMouseEnter($event: MouseEvent) {
    this.show();
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave($event: MouseEvent) {
    this.hide();
  }

  private show() {
    this.tooltipInstance = this.vcRef.createComponent(TooltipComponent);
    this.tooltipInstance.instance.message = this.message;
    this.tooltipInstance.changeDetectorRef.detectChanges();
  }

  private hide() {
    if (this.tooltipInstance) {
      this.tooltipInstance.destroy();
      this.tooltipInstance = null;
    }
  }
}
