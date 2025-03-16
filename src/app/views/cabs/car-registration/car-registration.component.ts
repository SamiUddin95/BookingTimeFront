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

@Component({
  selector: 'app-car-registration',
  standalone: true,
  imports: [Footer1Component, TopbarComponent, CommonModule, DateFormInputDirective, SelectFormInputDirective],
  templateUrl: './car-registration.component.html',
  styleUrl: './car-registration.component.scss'
})
export class CarRegistrationComponent implements OnInit {
  form!: FormGroup;
  currentStep = 1;
  totalSteps = 9;

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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      alert('Car Registered Successfully!');
    }
  }

  formValid() {

  }

  ngOnInit(): void {
      this.loadDropdowns();
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
}
