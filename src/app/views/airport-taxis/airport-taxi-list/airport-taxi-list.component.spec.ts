import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportTaxiListComponent } from './airport-taxi-list.component';

describe('AirportTaxiListComponent', () => {
  let component: AirportTaxiListComponent;
  let fixture: ComponentFixture<AirportTaxiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirportTaxiListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirportTaxiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
