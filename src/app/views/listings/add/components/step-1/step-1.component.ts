import { CommonService } from '@/app/core/services/api/common.service';
import { CommonModule } from '@angular/common'
import { Component, inject, Input, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import Stepper from 'bs-stepper'
import { ListingBasicInfo } from '@/app/core/models/add-listing-form.model';
import { PropertyFormDataService } from '@/app/core/services/property-form-data.service';

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

  constructor(private formDataService: PropertyFormDataService) {}

  ngOnInit(): void {
    
    this.loadCountries();
    this.loadListingTypes();
    this.loadGuestOptions();
    this.listingForm = { ...this.formDataService.getFormData().page1 };
  }

  gotoNext() {
    this.isSubmitted = true;
    if(this.validateForm()) {
      this.formDataService.updateFormData('page1', this.listingForm);
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
    thumbnail: null,
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

  loadStates(countryId: number) {
    this.commonService.GetStateByCountryId(countryId).subscribe((res)=>{
      this.states = res;
    })
    this.formDataService.setCountryId(countryId);
  }
  loadCities(stateId: number) {
    this.commonService.GetCityByStateId(stateId).subscribe((res)=>{
      this.cities = res;
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

  onThumbnailChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formDataService.setThumbnail = file;
    }
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
      this.listingForm.postalNumber != '' &&
      this.listingForm.street != '' &&
      this.listingForm.latitude != 0 &&
      this.listingForm.longitude != 0
    );
  }
  
}

