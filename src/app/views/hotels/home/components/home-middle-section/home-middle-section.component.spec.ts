import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMiddleSectionComponent } from './home-middle-section.component';

describe('HomeMiddleSectionComponent', () => {
  let component: HomeMiddleSectionComponent;
  let fixture: ComponentFixture<HomeMiddleSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMiddleSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMiddleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
