import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'tk-input-show',
  templateUrl: './input-show.component.html',
  styleUrls: ['./input-show.component.scss']
})
export class InputShowComponent implements OnInit, OnDestroy {
  /**
   * Message to display in the InputShow
   */
  message: string;
  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
