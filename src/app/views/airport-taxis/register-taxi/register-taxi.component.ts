import {
  Component,
  inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { Footer1Component } from '../../hotels/home/components/footer1/footer1.component'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms'
import { DateFormInputDirective } from '@/app/components/form/date-form-input.directive'
import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { CarRentalsService } from '@/app/core/services/api/car-rentals.service'
import { forkJoin } from 'rxjs'
import { CommonService } from '@/app/core/services/api/common.service'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import {
  CarRegistrationForm,
  CarRegistrationFormIncorrect,
  CarRegistrationFormUpdated,
} from '@/app/core/models/requestModels/car-rentals.model'
import {
  DROPZONE_CONFIG,
  DropzoneModule,
  type DropzoneConfigInterface,
} from 'ngx-dropzone-wrapper'

import { RegisterTaxiForm } from '@/app/core/models/requestModels/register-airport-taxi.model'
import { AirportTaxisService } from '@/app/core/services/api/airport-taxi.service'

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
  styleUrl: './register-taxi.component.scss',
})
export class RegisterTaxiComponent {
  @ViewChildren(NgModel) formFields!: QueryList<NgModel>

  dropzoneConfig: DropzoneConfigInterface = {
    url: '#',
    maxFiles: 5,
    maxFilesize: 5,
    acceptedFiles: 'image/jpeg, image/png, image/gif',
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Remove',
  }

  timePickerOptions: any = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    time_24hr: true,
  }

  currentStep = 1
  totalSteps = 3

  taxiRegistrationForm!: RegisterTaxiForm


  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  initialiseForm() {
    this.taxiRegistrationForm = {
      companyName: '',
      operatingAirport: '',
      countryId: 0,
      cityId: 0,
      stateId: 0,
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      bookingPerDay: 0,
      fleetSize: 0,
      vehicleType: '',
      website: '',
      capacity: 0,
      basePrice: 0,
      currency: 0,
      availabilityStatus: '',
      status: 'Approved',
      description: '',
      image: null,
    }
  }

  onThumbnailChange(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.taxiRegistrationForm.image = file
    }
  }
  fleet: any = []
  types: any = []
  countries: any
  cities: any
  states: any
  isSubmitted: boolean = false

  private commonService = inject(CommonService)
  private taxiService = inject(AirportTaxisService)

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++
    } else if (this.currentStep == this.totalSteps) {
      this.submit()
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--
    }
  }
  selectedVehicleTypes: number[] = [];
  onVehicleTypeChange(event: Event, vehicleId: number) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedVehicleTypes.push(vehicleId);
    } else {
      this.selectedVehicleTypes = this.selectedVehicleTypes.filter(id => id !== vehicleId);
    }

  }
  submit() {
   var vechileType=this.selectedVehicleTypes
   this.taxiRegistrationForm.vehicleType=String(vechileType);
    console.log(this.taxiRegistrationForm)

    if (!this.isFormValid()) {
      this.isSubmitted = true
      return
    }
    this.taxiService.registerTaxi(this.taxiRegistrationForm).subscribe((res) => {
        console.log(res)
        if (res.success) {
          alert("Successfully added");
          this.router.navigate(['/airport-taxi/home']);
        }
      })
  }

  ngOnInit(): void {
    this.loadDropdowns()
    this.initialiseForm()
  }

  loadDropdowns() {
    forkJoin({
      countries: this.commonService.GetAllCountryList(),
      fleet: this.taxiService.GetAllTaxiFleetsizesList(),
      types: this.taxiService.GetAllTaxiVechiletypesList(),
      //add master/dropdown data apis
    }).subscribe((res) => {
      this.countries = res.countries
      this.fleet = res.fleet
      this.types = res.types
      //bind here
    })
  }

  loadState(countryId: number) {
    this.commonService.GetStateByCountryId(countryId).subscribe((res) => {
      this.states = res
    })
    this.loadCurrencies(countryId);
  }
  loadCity(stateId: number) {
    this.commonService.GetCityByStateId(stateId).subscribe((res) => {
      this.cities = res
    })

  }

  isFormValid(): boolean {
    const isValid =
      this.taxiRegistrationForm.countryId > 0 &&
      this.taxiRegistrationForm.stateId > 0 &&
      this.taxiRegistrationForm.cityId > 0 &&
      this.taxiRegistrationForm.operatingAirport.trim() !== ''

    //add remaining validations here

    return isValid
  }

  steps = [
    { id: 1, label: 'Location' },
    { id: 2, label: 'Contact Information' },
    { id: 3, label: 'Vehicle Details' },
  ]

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
  ]

  availabilityStatusList = [
    { value: 'Available', label: 'Available' },
    { value: 'Busy', label: 'Busy' },
    { value: 'Under Maintenance', label: 'Under Maintenance' },
    { value: 'Inactive', label: 'Inactive' },
  ]

  currencies:any = [
    { id: 0, name: 'Select Currency' },
    ]
  loadCurrencies(countryId: any) 
  {
    this.commonService.GetCurrencyBycountryId(countryId).subscribe((res) => {
      this.currencies=res
    })
  }
  goToStep(stepId: number): void {
    this.currentStep = stepId
  }
}
