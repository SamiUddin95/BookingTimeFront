import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PlaceComponent } from './place.component'

describe('PlaceComponent', () => {
  let component: PlaceComponent
  let fixture: ComponentFixture<PlaceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PlaceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
