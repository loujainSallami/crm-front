import { TestBed } from '@angular/core/testing';

import { VicidialUserService } from './vicidil-user-service.service';

describe('VicidilUserServiceService', () => {
  let service: VicidialUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VicidialUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
