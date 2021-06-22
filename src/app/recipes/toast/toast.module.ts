import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ToastComponent } from './toast.component';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule, OverlayModule],
  exports: [OverlayModule],
})
export class ToastModule {}
