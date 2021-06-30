import { NgModule } from '@angular/core';
import { AlertModule } from './alert/alert.module';
import { ButtonModule } from './button/button.module';
import { CardModule } from './card/card.module';
import { ColorpickerModule } from './colorpicker/colorpicker.module';
import { ToastModule } from './toast/toast.module';

@NgModule({
  declarations: [],
  exports: [
    CardModule,
    ButtonModule,
    AlertModule,
    ToastModule,
    ColorpickerModule,
  ],
})
export class RecipesModule {}
