import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputShowDirective } from './input-show.directive';
import { InputShowComponent } from './input-show.component';



@NgModule({
  declarations: [InputShowDirective, InputShowComponent],
  imports: [
    CommonModule
  ],
  exports: [InputShowDirective]
})
export class InputShowModule { }
