import { TestBed } from '@angular/core/testing';

import { NgmatLibService } from './ngmat-lib.service';

describe('NgmatLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgmatLibService = TestBed.get(NgmatLibService);
    expect(service).toBeTruthy();
  });
});
