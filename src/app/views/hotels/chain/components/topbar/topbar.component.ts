import { Component } from '@angular/core'
import {
  hotelCategories,
  hotelDestinations,
  hotelFacilities,
  hotelTypes,
} from '../../data'
import { RouterModule } from '@angular/router'
import { LogoBoxComponent } from '@/app/components/logo-box/logo-box.component'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { ThemeSwitcherComponent } from '@/app/components/top-bar/theme-switcher/them-switcher.component'
import { VerticalMenuButtonComponent } from '@/app/components/app-menu/components/vertical-menu-button.component'
import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { DateFormInputDirective } from '@/app/components/form/date-form-input.directive'

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
  selector: 'chain-topbar',
  standalone: true,
  imports: [
    RouterModule,
    LogoBoxComponent,
    NgbDropdownModule,
    ThemeSwitcherComponent,
    VerticalMenuButtonComponent,
    SelectFormInputDirective,
    DateFormInputDirective,
  ],
  templateUrl: './topbar.component.html',
  styles: ``,
})
export class TopbarComponent {
  categoryList = hotelCategories
  hotelTypes = hotelTypes
  hotelDestinations = hotelDestinations
  hotelFacilities = hotelFacilities

  flags = [
    {
      flagImg: '/assets/images/flags/uk.svg',
      name: 'English',
    },
    {
      flagImg: '/assets/images/flags/sp.svg',
      name: 'Español',
    },
    {
      flagImg: '/assets/images/flags/fr.svg',
      name: 'Français',
    },
    {
      flagImg: '/assets/images/flags/gr.svg',
      name: 'Deutsch',
    },
  ]

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
