import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GridlistComponent } from './gridlist.component'

describe('GridlistComponent', () => {
  let component: GridlistComponent
  let fixture: ComponentFixture<GridlistComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridlistComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(GridlistComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
