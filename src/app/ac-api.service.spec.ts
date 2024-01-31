import { TestBed } from '@angular/core/testing';

import { AcApiService } from './ac-api.service';

describe('AcApiService', () => {
  let service: AcApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
