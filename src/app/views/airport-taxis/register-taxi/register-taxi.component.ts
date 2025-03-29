import { Component, inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Footer1Component } from '../../hotels/home/components/footer1/footer1.component';
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

import { RegisterTaxiForm } from '@/app/core/models/requestModels/register-airport-taxi.model';
import { AirportTaxisService } from '@/app/core/services/api/airport-taxi.service';

@Component({
  selector: 'app-register-taxi',
  standalone: true,
  imports: [
    Footer1Component,
    CommonModule,
    DateFormInputDirective,
    ReactiveFormsModule,
    FormsModule,
    DropzoneModule,
  ],
  templateUrl: './register-taxi.component.html',
  styleUrl: './register-taxi.component.scss'
})
export class RegisterTaxiComponent {

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

  currentStep = 1;
  totalSteps = 3;

  taxiRegistrationForm!: RegisterTaxiForm;

  constructor(private router: Router, private route: ActivatedRoute) { }


  initialiseForm() {
    this.taxiRegistrationForm = {
      airportName: '',
      countryId: 0,
      cityId: 0,
      stateId: 0,
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      maxBookingsPerDay: 0,
      fleetSizeId: 0,
      vehicleTypeIds: ""
    }
  }


  countries: any;
  cities: any;
  states: any;
  isSubmitted: boolean = false;

  private commonService = inject(CommonService);
  private taxiService = inject(AirportTaxisService);

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
    console.log(this.taxiRegistrationForm)

    if (!this.isFormValid()) {
      this.isSubmitted = true;
      return; 
    }
 
    this.taxiService.registerTaxi(this.taxiRegistrationForm).subscribe((res => {
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
      //add master/dropdown data apis
    }).subscribe(res => {
      this.countries = res.countries;
      //bind here
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

  isFormValid(): boolean {

    const isValid = this.taxiRegistrationForm.countryId > 0 &&
      this.taxiRegistrationForm.stateId > 0 &&
      this.taxiRegistrationForm.cityId > 0 &&
      this.taxiRegistrationForm.airportName.trim() !== ''
      
      //add remaining validations here 

    return isValid;
  }

  steps = [
    { id: 1, label: 'Location' },
    { id: 2, label: 'Contact Information' },
    { id: 3, label: 'Vehicle Details' }
  ];

  goToStep(stepId: number): void {
    this.currentStep = stepId;
  }

  dummyVehicleTypes: any = [
    {id: 1, name: "Standard Sedan", description: "Skoda Octavia or similar"},
    {id: 2, name: "Executive Sedan", description: "Mercedes E-Class or similar"},
    {id: 3, name: "Luxury Sedan", description: "Mercedes S-Class or similar"},
    {id: 4, name: "People Carrier", description: "Peugeot 5008 or similar"},
    {id: 5, name: "Large People Carrier", description: "Ford Tourneo or similar"},
    {id: 5, name: "Executive People Carrier", description: "Mercedes V-Class or similar"},
    {id: 5, name: "Minibus", description: "Renault Master or similar"},
  ]

  dummyFleetSize: any = [
    {id: 1, name: "1 - 5 Vehicle"},
    {id: 2, name: "6 - 10 Vehicle"},
    {id: 3, name: "11 - 15 Vehicle"},
    {id: 4, name: "16 - 20 Vehicle"},
    {id: 5, name: "21 - 50 Vehicle"},
    {id: 6, name: "51 - 100 Vehicle"},
    {id: 7, name: "100+ Vehicle"},
  ]
}
