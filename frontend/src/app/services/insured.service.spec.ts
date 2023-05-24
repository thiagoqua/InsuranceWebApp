import { TestBed } from '@angular/core/testing';

import { InsuredService } from './insured.service';

describe('InsuredService', () => {
  let service: InsuredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
