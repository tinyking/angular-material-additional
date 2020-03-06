import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatTreeModule
} from '@angular/material';
import { NgmatLibComponent } from './ngmat-lib.component';
import { DragTreeComponent } from './drag-tree/drag-tree.component';
import { MultiAutocompleteSelectComponent } from './multi-autocomplete-select/multi-autocomplete-select.component';

@NgModule({
  declarations: [
    NgmatLibComponent,
    DragTreeComponent,
    MultiAutocompleteSelectComponent
  ],
  imports: [
    MatTreeModule,
    DragDropModule,
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [DragTreeComponent, MultiAutocompleteSelectComponent]
})
export class NgmatLibModule {}
