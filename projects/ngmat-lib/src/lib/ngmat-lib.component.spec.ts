import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgmatLibComponent } from './ngmat-lib.component';

describe('NgmatLibComponent', () => {
  let component: NgmatLibComponent;
  let fixture: ComponentFixture<NgmatLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgmatLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgmatLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
