import { TestBed } from '@angular/core/testing';

import { AirportTaxiFilterService } from './airport-taxi-filter.service';

describe('AirportTaxiFilterService', () => {
  let service: AirportTaxiFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportTaxiFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
