import { TestBed } from '@angular/core/testing';

import { MemorizationService } from './memorization.service';

describe('MemorizationService', () => {
  let service: MemorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
