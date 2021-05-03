import { TestBed } from '@angular/core/testing';

import { BnetAuthService } from './bnet-auth.service';

describe('BnetAuthService', () => {
  let service: BnetAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BnetAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
