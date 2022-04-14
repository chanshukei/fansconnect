import { TestBed } from '@angular/core/testing';

import { SupportitemService } from './supportitem.service';

describe('SupportitemService', () => {
  let service: SupportitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
