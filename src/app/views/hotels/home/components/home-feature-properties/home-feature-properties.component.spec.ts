import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeaturePropertiesComponent } from './home-feature-properties.component';

describe('HomeFeaturePropertiesComponent', () => {
  let component: HomeFeaturePropertiesComponent;
  let fixture: ComponentFixture<HomeFeaturePropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeaturePropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFeaturePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
