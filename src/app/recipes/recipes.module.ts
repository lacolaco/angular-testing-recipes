import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from './card/card.module';
import { ButtonModule } from './button/button.module';
import { AlertModule } from './alert/alert.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CardModule, ButtonModule, AlertModule],
})
export class RecipesModule {}
