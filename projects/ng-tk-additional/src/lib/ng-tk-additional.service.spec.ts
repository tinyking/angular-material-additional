import { TestBed } from '@angular/core/testing';

import { NgTkAdditionalService } from './ng-tk-additional.service';

describe('NgTkAdditionalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgTkAdditionalService = TestBed.get(NgTkAdditionalService);
    expect(service).toBeTruthy();
  });
});
