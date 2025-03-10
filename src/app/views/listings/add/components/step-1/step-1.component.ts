import { CommonService } from '@/app/core/services/api/common.service';
import { CommonModule } from '@angular/common'
import { Component, inject, Input, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import Stepper from 'bs-stepper'
import { ListingBasicInfo } from '@/app/core/models/add-listing-form.model';

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
export class Step1Component implements OnInit {
  @Input() stepperInstance?: Stepper;

  ngOnInit(): void {
    this.loadCountries();
    this.loadListingTypes();
    this.loadGuestOptions();
  }

  gotoNext() {
    this.isSubmitted = true;
    if(this.validateForm()) {
      this.stepperInstance?.next();
    }
  }

  listingForm: ListingBasicInfo = {
    listingTypeId: null,
    listingName: '',
    guestOption: null,
    description: '',
    countryId: null,
    stateId: null,
    cityId: null,
    postalNumber: null,
    street: '',
    latitude: null,
    longitude: null
  };

  isSubmitted: boolean = false;

  private commonService = inject(CommonService);

  //category
  listingTypes: any[] = [];
  guestOptions: any[] = [];

  //location
  countries: any[] = [];
  cities: any[] = [];
  states: any[] = [];

  loadCountries() {
    this.commonService.GetAllCountryList().subscribe((res)=>{
      this.countries = res;
    })
  }

  loadCitiesAndStates(countryId: number) {
    this.commonService.GetCityByCountryId(countryId).subscribe((res)=>{
      this.cities = res;
    })

    this.commonService.GetStateByCountryId(countryId).subscribe((res)=>{
      this.states = res;
    })
  }

  loadListingTypes() {
    this.commonService.GetAllHotelTypesList().subscribe((res)=>{
      this.listingTypes = res;
    })
  }

  loadGuestOptions() {
    this.guestOptions = [
      { value: 'forGuest', label: 'For Guest', id: 'flexRadioDefault2' },
      { value: 'forPersonal', label: 'For Personal', id: 'flexRadioDefault3' }
    ];
  }

  validateForm(): boolean {
    return (
      this.listingForm.listingTypeId != 0 &&
      this.listingForm.listingName != '' &&
      this.listingForm.guestOption != '' &&
      this.listingForm.description != '' &&
      this.listingForm.countryId != 0 &&
      this.listingForm.stateId != 0 &&
      this.listingForm.cityId != 0 &&
      this.listingForm.postalNumber != 0 &&
      this.listingForm.street != '' &&
      this.listingForm.latitude != 0 &&
      this.listingForm.longitude != 0
    );
  }
  
}

