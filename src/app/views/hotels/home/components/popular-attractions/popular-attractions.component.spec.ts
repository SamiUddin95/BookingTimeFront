import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularAttractionsComponent } from './popular-attractions.component';

describe('PopularAttractionsComponent', () => {
  let component: PopularAttractionsComponent;
  let fixture: ComponentFixture<PopularAttractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularAttractionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularAttractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
