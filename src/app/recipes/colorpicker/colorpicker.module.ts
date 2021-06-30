import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorpickerComponent } from './colorpicker.component';

@NgModule({
  declarations: [ColorpickerComponent],
  imports: [CommonModule],
  exports: [ColorpickerComponent],
})
export class ColorpickerModule {}
