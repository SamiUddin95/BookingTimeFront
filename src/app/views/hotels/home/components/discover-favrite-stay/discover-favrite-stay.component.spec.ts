import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverFavriteStayComponent } from './discover-favrite-stay.component';

describe('DiscoverFavriteStayComponent', () => {
  let component: DiscoverFavriteStayComponent;
  let fixture: ComponentFixture<DiscoverFavriteStayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverFavriteStayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverFavriteStayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
