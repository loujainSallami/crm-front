import { TestBed } from '@angular/core/testing';

import { VicidialleadService } from './vicidiallead.service';

describe('VicidialleadService', () => {
  let service: VicidialleadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VicidialleadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
