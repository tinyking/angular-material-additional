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

@NgModule({
  declarations: [NgmatLibComponent, DragTreeComponent],
  imports: [
    MatTreeModule,
    DragDropModule,
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [NgmatLibComponent, DragTreeComponent]
})
export class NgmatLibModule {}
