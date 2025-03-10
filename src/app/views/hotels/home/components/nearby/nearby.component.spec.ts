import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NearbyComponent } from './nearby.component'

describe('NearbyComponent', () => {
  let component: NearbyComponent
  let fixture: ComponentFixture<NearbyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NearbyComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(NearbyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
