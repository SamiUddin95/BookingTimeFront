import { Component, inject, OnInit } from '@angular/core';
import { Footer1Component } from '../../hotels/home/components/footer1/footer1.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateFormInputDirective } from '@/app/components/form/date-form-input.directive'
import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { CarRentalsService } from '@/app/core/services/api/car-rentals.service';
import { forkJoin } from 'rxjs';
import { CommonService } from '@/app/core/services/api/common.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CarRegistrationForm, CarRegistrationFormIncorrect } from '@/app/core/models/requestModels/car-rentals.model';
import {
  DROPZONE_CONFIG,
  DropzoneModule,
  type DropzoneConfigInterface,
} from 'ngx-dropzone-wrapper'
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-registration',
  standalone: true,
  imports: [
    Footer1Component,
    TopbarComponent,
    CommonModule,
    DateFormInputDirective,
    SelectFormInputDirective,
    ReactiveFormsModule,
    FormsModule,
    DropzoneModule,
  ],
  templateUrl: './car-registration.component.html',
  styleUrl: './car-registration.component.scss',
})
export class CarRegistrationComponent implements OnInit {

  dropzoneConfig: DropzoneConfigInterface = {
    url: '#', 
    maxFiles: 5,
    maxFilesize: 5, 
    acceptedFiles: 'image/jpeg, image/png, image/gif',
    autoProcessQueue: false 
  };

  carRegistrationForm!: CarRegistrationFormIncorrect;
  currentStep = 1;
  totalSteps = 11;

  constructor(private router: Router) {}


  initialiseForm() {
    this.carRegistrationForm = {
      countryId: 0,
      stateId: 0,
      cityId: 0,
      street: '',
  
  
      location: 'temp location',
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
      mobileNumber1: '',
      mobileNumber2: '',
      startDate: new Date(),
      endDate: new Date(),
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
    this.carService.AddCarDetails(this.carRegistrationForm, this.carRegistrationForm.image , this.carRegistrationForm.carImages).subscribe((res=> {
      console.log(res);
      if(res.success) {
        this.router.navigate(['/register-car/success']);
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
  
  onGalleryImageAdded(file: any) {

    this.carRegistrationForm.carImages = []; 
    this.carRegistrationForm.carImages.push(file); 
  }

}
