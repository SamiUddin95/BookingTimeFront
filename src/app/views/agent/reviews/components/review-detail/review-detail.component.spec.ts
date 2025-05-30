import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ReviewDetailComponent } from './review-detail.component'

describe('ReviewDetailComponent', () => {
  let component: ReviewDetailComponent
  let fixture: ComponentFixture<ReviewDetailComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewDetailComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ReviewDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
