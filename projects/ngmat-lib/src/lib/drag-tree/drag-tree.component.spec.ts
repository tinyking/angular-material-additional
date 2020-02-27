import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragTreeComponent } from './drag-tree.component';

describe('DragTreeComponent', () => {
  let component: DragTreeComponent;
  let fixture: ComponentFixture<DragTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DragTreeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
