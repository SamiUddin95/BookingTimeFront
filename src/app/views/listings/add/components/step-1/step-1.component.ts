import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import Stepper from 'bs-stepper'

@Component({
  selector: 'add-listing-step-1',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './step-1.component.html',
  styles: ``,
})
export class Step1Component {
  @Input() stepperInstance?: Stepper;

  category = {
    listingTypeId: 0,
    name: '',
    guest: '',
    description: '',
    countryId:0,
    stateId:0,
    city: '',
    postalNumber: '',
    street: '',
    latitude: '',
    longitude: ''
  };

  listingTypes = [
    { id: 0, name: 'Select Type' },
    { id: 1, name: 'Hotel' },
    { id: 2, name: 'Villa' },
    { id: 3, name: 'Home Stay' },
    { id: 4, name: 'Farmhouse' },
    { id: 5, name: 'House boat' }
  ];

  guestOptions = [
    { value: 'entirePlace', label: 'Entire Place', id: 'flexRadioDefault1' },
    { value: 'forGuest', label: 'For Guest', id: 'flexRadioDefault2' },
    { value: 'forPersonal', label: 'For Personal', id: 'flexRadioDefault3' }
  ];

  countries = [
    { id: 1, name: 'Pakistan' },
    { id: 2, name: 'Saudi Arabia' },
    { id: 3, name: 'Indonesia' },
    { id: 4, name: 'India' },
    { id: 5, name: 'Qatar' }
  ];

  states = [
    { id: 1, name: 'Manama' },
    { id: 2, name: 'Qallat' },
    { id: 3, name: 'London' },
    { id: 4, name: 'Kerala' },
    { id: 5, name: 'Avenue' }
  ];

  gotoNext(event?: Event) {
    debugger
    event?.preventDefault();
    console.log(this.category);
    localStorage.setItem("steeper1", JSON.stringify(this.category));
    this.stepperInstance?.next();
  }

  isFormValid: boolean = false;

  formValid() {
    this.isFormValid =
      this.category.listingTypeId !== 0 &&
      !!this.category.name &&
      !!this.category.guest &&
      !!this.category.description &&
      this.category.countryId !== 0 &&
      this.category.stateId !== 0 &&
      !!this.category.city &&
      !!this.category.postalNumber &&
      !!this.category.street &&
      !!this.category.latitude &&
      !!this.category.longitude;
  }
  
}

