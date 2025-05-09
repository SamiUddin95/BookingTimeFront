import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CustomerReviewComponent } from './customer-review.component'

describe('CustomerReviewComponent', () => {
  let component: CustomerReviewComponent
  let fixture: ComponentFixture<CustomerReviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerReviewComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CustomerReviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
