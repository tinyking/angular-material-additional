import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTkAdditionalComponent } from './ng-tk-additional.component';

describe('NgTkAdditionalComponent', () => {
  let component: NgTkAdditionalComponent;
  let fixture: ComponentFixture<NgTkAdditionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgTkAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTkAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
