import { TestBed } from '@angular/core/testing';

import { VicidialstatuesService } from './vicidialstatues.service';

describe('VicidialstatuesService', () => {
  let service: VicidialstatuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VicidialstatuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
