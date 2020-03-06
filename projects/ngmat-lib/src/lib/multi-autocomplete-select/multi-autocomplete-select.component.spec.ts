import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiAutocompleteSelectComponent } from './multi-autocomplete-select.component';

describe('MultiAutocompleteSelectComponent', () => {
  let component: MultiAutocompleteSelectComponent;
  let fixture: ComponentFixture<MultiAutocompleteSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiAutocompleteSelectComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiAutocompleteSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
