import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatChipList
} from '@angular/material';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap
} from 'rxjs/operators';

@Component({
  selector: 'ngmat-multi-autocomplete-select',
  templateUrl: './multi-autocomplete-select.component.html',
  styleUrls: ['./multi-autocomplete-select.component.css']
})
export class MultiAutocompleteSelectComponent {
  selectable = false;
  removable = true;
  inputControl = new FormControl();
  filteredItems: Observable<any[]>;

  @Input() required = false;
  @Input() selectedItems: any[] = [];
  @Input() placeholder: string;
  @Input() autoSearchFn: (value: string) => Observable<any[]>;
  @Input() displayFn: (value: any) => string;

  @ViewChild('inputElement', { static: true }) inputElement: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto', { static: true }) matAutocomplete: MatAutocomplete;
  @ViewChild('chipList', { static: true }) chipList: MatChipList;

  @Input() set readonly(value: boolean) {
    this.removable = !value;
  }

  constructor() {
    this.filteredItems = this.inputControl.valueChanges.pipe(
      debounceTime(200),
      startWith(''),
      distinctUntilChanged(),
      // filter(val => !!val),
      switchMap(value => {
        return this.autoSearchFn ? this.autoSearchFn(value) : of([]);
      })
    );
  }

  remove(item: any): void {
    const index = this.selectedItems.indexOf(item);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
    if (this.required) {
      this.chipList.errorState = this.selectedItems.length === 0;
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedItems.push(event.option.value);
    this.inputElement.nativeElement.value = '';
    this.inputControl.setValue(null);
    if (this.required) {
      this.chipList.errorState = this.selectedItems.length === 0;
    }
  }

  onblur() {
    this.inputElement.nativeElement.value = '';
    this.inputControl.setValue(null);

    if (this.required) {
      this.chipList.errorState = this.selectedItems.length === 0;
    }
  }
}
