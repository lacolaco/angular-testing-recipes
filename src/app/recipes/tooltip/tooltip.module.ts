import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent, TooltipDirective } from './tooltip.directive';

@NgModule({
  declarations: [TooltipDirective, TooltipComponent],
  imports: [CommonModule],
  exports: [TooltipDirective],
})
export class TooltipModule {}
