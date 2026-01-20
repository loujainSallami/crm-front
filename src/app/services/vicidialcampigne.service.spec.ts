import { TestBed } from '@angular/core/testing';

import { VicidialcampigneService } from './vicidialcampigne.service';

describe('VicidialcampigneService', () => {
  let service: VicidialcampigneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VicidialcampigneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
