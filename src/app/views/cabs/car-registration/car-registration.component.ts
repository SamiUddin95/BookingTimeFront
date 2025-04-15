import { Component, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Footer1Component } from '../../hotels/home/components/footer1/footer1.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { DateFormInputDirective } from '@/app/components/form/date-form-input.directive'
import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { CarRentalsService } from '@/app/core/services/api/car-rentals.service';
import { forkJoin } from 'rxjs';
import { CommonService } from '@/app/core/services/api/common.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarRegistrationForm, CarRegistrationFormIncorrect, CarRegistrationFormUpdated } from '@/app/core/models/requestModels/car-rentals.model';
import {
  DROPZONE_CONFIG,
  DropzoneModule,
  type DropzoneConfigInterface,
} from 'ngx-dropzone-wrapper'
import { BsStepperWrapperComponent } from '@/app/components/bs-stepper-wrapper.component';

@Component({
  selector: 'app-car-registration',
  standalone: true,
  imports: [
    Footer1Component,
    // TopbarComponent,
    CommonModule,
    DateFormInputDirective,
    // SelectFormInputDirective,
    ReactiveFormsModule,
    FormsModule,
    DropzoneModule,
    // BsStepperWrapperComponent
  ],
  templateUrl: './car-registration.component.html',
  styleUrl: './car-registration.component.scss',
})
export class CarRegistrationComponent implements OnInit {

  @ViewChildren(NgModel) formFields!: QueryList<NgModel>;

  dropzoneConfig: DropzoneConfigInterface = {
    url: '#',
    maxFiles: 5,
    maxFilesize: 5,
    acceptedFiles: 'image/jpeg, image/png, image/gif',
    autoProcessQueue: false,
    addRemoveLinks: true, 
    dictRemoveFile: 'Remove' 
  };
  timePickerOptions: any = {
    enableTime: true,     
    noCalendar: true,     
    dateFormat: "H:i",    
    time_24hr: true       
  };
  

  passengesCapacity = [
    { id: 1, name: 1 },
    { id: 2, name: 2 },
    { id: 3, name: 3 },
    { id: 4, name: 4 },
    { id: 5, name: 5 },
    { id: 6, name: 6 },
    { id: 7, name: 7 },
    { id: 8, name: 8 },
    { id: 9, name: 9 },
    { id: 10, name: 10 },
    { id: 11, name: 11 },
    { id: 12, name: 12 },
    { id: 13, name: 13 },
    { id: 14, name: 14 },
    { id: 15, name: 15 },
    { id: 16, name: 16 },
  ];



  carRegistrationForm!: CarRegistrationFormUpdated;
  currentStep = 1;
  totalSteps = 11;

  constructor(private router: Router, private route: ActivatedRoute) { }


  initialiseForm() {
    this.carRegistrationForm= {
      countryId: 0,
      stateId: 0,
      cityId: 0,
      street: '',
      vin: 0,
      yearId: 0,
      makeId: 0,
      model: '',
      odometerId: 0,
      transmission: '',
      vehicleValue: '',
      vehicleConditionId: 0,
      seatbelts: false,
      seatbeltTypeId: 0,
      capacityId: 0,
      mobileNumber1: '',
      mobileNumber2: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      mileageLimit: 0,
      fuelTypeId: 0,
      features: '',
      additionalInfo: '',
      carImages: [],
      image: undefined
    };
  }


  countries: any;
  cities: any;
  states: any;
  fuelTypes: any;
  odometerReadings: any;
  seatBeltTypes: any;
  vehicleConditions: any;
  vehicleMakes: any;
  vehicleYears: any;
  //passengesCapacity: any;
  isSubmitted: boolean = false;

  private carService = inject(CarRentalsService);
  private commonService = inject(CommonService)

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
    else if (this.currentStep == this.totalSteps) {
      this.submit();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submit() {
    console.log(this.carRegistrationForm)

    if (!this.isFormValid()) {
      this.isSubmitted = true;
      return; 
    }
 
    this.carService.AddCarDetails(this.carRegistrationForm, this.carRegistrationForm.image, this.carRegistrationForm.carImages).subscribe((res => {
      console.log(res);
      if (res.success) {
        this.router.navigate(['success'], { relativeTo: this.route });
      }
    }))

  }

  ngOnInit(): void {
    this.loadDropdowns();
    this.initialiseForm();
  }
  
  
  loadDropdowns() {
    forkJoin({
      countries: this.commonService.GetAllCountryList(),
      fuelTypes: this.carService.GetAllFuelTypeList(),
      odometerReadings: this.carService.GetAllOdometerReadingList(),
      seatBeltTypes: this.carService.GetAllSeatbeltTypeList(),
      vehicleConditions: this.carService.GetAllVehicleConditionList(),
      vehicleMakes: this.carService.GetAllVehicleMakeList(),
      vehicleYears: this.carService.GetAllVehicleYearList()
    }).subscribe(res => {
      this.countries = res.countries;
      this.fuelTypes = res.fuelTypes;
      this.odometerReadings = res.odometerReadings;
      this.seatBeltTypes = res.seatBeltTypes;
      this.vehicleConditions = res.vehicleConditions;
      this.vehicleMakes = res.vehicleMakes;
      this.vehicleYears = res.vehicleYears;
      console.log(res);
    });
  }

  loadCitiesAndStates(countryId: number) {
    this.commonService.GetCityByCountryId(countryId).subscribe((res) => {
      this.cities = res;
    })

    this.commonService.GetStateByCountryId(countryId).subscribe((res) => {
      this.states = res;
    })
  }

  selectedFeatures: string[] = [];
  features = ['Air Conditioning', 'Sunroof', 'GPS Navigation', 'Leather Seats'];

  toggleFeature(feature: string, event: any) {
    event.target.checked
      ? this.selectedFeatures.push(feature)
      : this.selectedFeatures = this.selectedFeatures.filter(f => f !== feature);

    this.carRegistrationForm.features = this.selectedFeatures.join(', ');
  }

  onThumbnailSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.carRegistrationForm.image = file;
    }
  }

  onGalleryImageAdded(file: File) { 
  
      if (!this.carRegistrationForm.carImages) {
        this.carRegistrationForm.carImages = [];
      }
  
      this.carRegistrationForm.carImages.push(file);
  }
  

  isFormValid(): boolean {

    const isValid = this.carRegistrationForm.countryId > 0 &&
      this.carRegistrationForm.stateId > 0 &&
      this.carRegistrationForm.cityId > 0 &&
      this.carRegistrationForm.street.trim() !== '' &&
      this.carRegistrationForm.vin.toString().length >= 5 &&
      /^[A-HJ-NPR-Z0-9]{17}$/.test(this.carRegistrationForm.vin.toString()) &&
      this.carRegistrationForm.yearId > 0 &&
      this.carRegistrationForm.makeId > 0 &&
      this.carRegistrationForm.model !== '' &&
      this.carRegistrationForm.odometerId > 0 &&
      this.carRegistrationForm.transmission !== '' &&
      this.carRegistrationForm.vehicleValue !== '' &&
      this.carRegistrationForm.vehicleConditionId > 0 &&
      (this.carRegistrationForm.seatbeltTypeId ? this.carRegistrationForm.seatbeltTypeId > 0 : true) &&
      this.carRegistrationForm.mobileNumber1 !== '' &&
      (this.carRegistrationForm.mobileNumber2 ? this.carRegistrationForm.mobileNumber2 != '' : true) &&
      this.carRegistrationForm.startDate !== '' &&
      this.carRegistrationForm.endDate !== '' &&
      this.carRegistrationForm.mileageLimit > 0 &&
      this.carRegistrationForm.fuelTypeId > 0;

    return isValid;
  }

  steps = [
    { id: 1, label: 'Location' },
    { id: 2, label: 'VIN' },
    { id: 3, label: 'Make & Model' },
    { id: 4, label: 'Odometer' },
    { id: 5, label: 'Market Value' },
    { id: 6, label: 'Condition' },
    { id: 7, label: 'Fuel Type' },
    { id: 8, label: 'Availibility' },
    { id: 9, label: 'Contact Information' },
    { id: 10, label: 'Photos' },
    { id: 11, label: 'Additional Info' },
  ];

  goToStep(stepId: number): void {
    this.currentStep = stepId;
  }


}
