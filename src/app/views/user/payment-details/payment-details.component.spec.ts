import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PaymentDetailsComponent } from './payment-details.component'

describe('PaymentDetailsComponent', () => {
  let component: PaymentDetailsComponent
  let fixture: ComponentFixture<PaymentDetailsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDetailsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PaymentDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
