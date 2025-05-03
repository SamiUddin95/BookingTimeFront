import { DateFormInputDirective } from '@/app/components/form/date-form-input.directive'
import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { CommonService } from '@/app/core/services/api/common.service'
import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

type AvailabilityFormType = {
  location: string
  stayFor: Date | Array<Date>
  guests: {
    adults: number
    children: number
    rooms: number
  }
}

@Component({
  selector: 'home-availability-filter',
  standalone: true,
  imports: [
    DateFormInputDirective,
    NgbDropdownModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './availability-filter.component.html',
})
export class AvailabilityFilterComponent implements OnInit {
 
  ngOnInit(): void {
    this.loadCities()
  }

  private commonService = inject(CommonService)

  hotelFilter = {
    details: {
      cityId: 0,
      priceRangeFrom: 0,
      priceRangeTo: 2000,
      ratingId: 0,
      hotelTypes: [] as { hotelTypeId: number }[],
      amenities: [] as { amenitiesId: number }[],
      BeachAccess: [] as { id: number }[],
      EntirePlaces: [] as { id: number }[],
      Facilities: [] as { id: number }[],
      FunThingsToDo: [] as { id: number }[],
      PopularFilter: [] as { id: number }[],
      PropertyType: [] as { id: number }[],
      PropertyAccessibility: [] as { id: number }[],
      roomAccessibility: [] as { id: number }[],
      roomFacilities: [] as { id: number }[],
    },
    paginationInfo: {
      page: 0,
      rowsPerPage: 10,
    },
  }
  cities: any[] = []

  loadCities() {
    this.commonService.GetCityAndCountryList().subscribe((res) => {
      this.cities = res
    })
  }

  formValue: AvailabilityFormType = {
    location: 'San Jacinto, USA',
    stayFor: [new Date(), new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)],
    guests: {
      adults: 2,
      rooms: 1,
      children: 0,
    },
  }

  updateGuests = (
    type: keyof AvailabilityFormType['guests'],
    increase: boolean = true
  ) => {
    const val = this.formValue.guests[type]
    this.formValue = {
      ...this.formValue,
      guests: {
        ...this.formValue.guests,
        [type]: increase ? val + 1 : val > 1 ? val - 1 : 0,
      },
    }
  }

  getGuestsValue = (): string => {
    let value = ''
    const guests = this.formValue.guests
    if (guests.adults || guests.children) {
      value +=
        guests.adults +
        guests.children +
        (guests.adults > 1 ? ' Guests ' : ' Guest ')
    }
    if (guests.rooms) {
      value += guests.rooms + (guests.rooms > 1 ? ' Rooms ' : ' Room ')
    }
    return value
  }
}
