import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChild,
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
import { NgSelectModule } from '@ng-select/ng-select'
declare var bootstrap: any
declare const google: any

@Component({
  selector: 'app-register-taxi',
  standalone: true,
  imports: [
    Footer1Component,
    CommonModule,
    DateFormInputDirective,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    DropzoneModule,
  ],
  templateUrl: './register-taxi.component.html',
  styleUrl: './register-taxi.component.scss',
})
export class RegisterTaxiComponent implements AfterViewInit, OnInit {
  @ViewChildren(NgModel) formFields!: QueryList<NgModel>
  @ViewChild('modalRef') modalElementRef!: ElementRef

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
      country: '',
      city: '',
      state: '',
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

  cityPrice: any = {
    CityName: '',
    price: 0,
    currencyId: 0,
  }

  private commonService = inject(CommonService)
  private taxiService = inject(AirportTaxisService)

  modalInstance: any

  ngAfterViewInit() {
    if (this.modalElementRef) {
      this.modalInstance = new bootstrap.Modal(
        this.modalElementRef.nativeElement
      )
    }

    this.initAutocomplete()
  }

  initAutocomplete(): void {
    const autocompleteInput = document.getElementById(
      'autocomplete'
    ) as HTMLInputElement

    if (!autocompleteInput) return

    const autocomplete = new google.maps.places.Autocomplete(
      autocompleteInput,
      {
        types: ['geocode'],
        componentRestrictions: { country: [] }, // optional country restriction
      }
    )

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (!place.address_components) return

      this.extractAddressComponents(place.address_components)
    })
  }

  extractAddressComponents(components: any[]): void {
    this.taxiRegistrationForm.country = ''
    this.taxiRegistrationForm.state = ''
    this.taxiRegistrationForm.city = ''

    for (const component of components) {
      const types = component.types

      if (types.includes('country')) {
        this.taxiRegistrationForm.country = component.long_name
      } else if (types.includes('administrative_area_level_1')) {
        this.taxiRegistrationForm.state = component.long_name
      } else if (types.includes('locality')) {
        this.taxiRegistrationForm.city = component.long_name
      } else if (
        types.includes('administrative_area_level_2') &&
        !this.taxiRegistrationForm.city
      ) {
        // Fallback if "locality" isn't available
        this.taxiRegistrationForm.city = component.long_name
      }
    }
  }
  saveCityPrice() {
    if (!this.cityPrice.CityName || this.cityPrice.CityName.trim() === '') {
      alert('City Name is required.')
      return
    }

    if (!this.cityPrice.price || this.cityPrice.price <= 0) {
      alert('Valid Price is required.')
      return
    }

    if (!this.cityPrice.currencyId || this.cityPrice.currencyId === 0) {
      alert('Please select a currency.')
      return
    }
    this.taxiService.AddCitytaxiBasePrice(this.cityPrice).subscribe({
      next: (res) => {
        alert(res.message)

        this.cityPrice = {
          CityName: '',
          price: 0,
          currencyId: null,
        }

        if (this.modalInstance) {
          this.modalInstance.hide()
        }
      },
      error: (err) => {
        console.error('Error saving data:', err)
      },
    })
  }

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
  selectedVehicleTypes: number[] = []
  onVehicleTypeChange(event: Event, vehicleId: number) {
    const isChecked = (event.target as HTMLInputElement).checked
    if (isChecked) {
      this.selectedVehicleTypes.push(vehicleId)
    } else {
      this.selectedVehicleTypes = this.selectedVehicleTypes.filter(
        (id) => id !== vehicleId
      )
    }
  }

  submit() {
    var vechileType = this.selectedVehicleTypes
    this.taxiRegistrationForm.vehicleType = String(vechileType)
    console.log(this.taxiRegistrationForm)

    if (!this.isFormValid()) {
      this.isSubmitted = true
      return
    }
    this.taxiService
      .registerTaxi(this.taxiRegistrationForm)
      .subscribe((res) => {
        console.log(res)
        if (res.success) {
          alert('Successfully added')
          this.router.navigate(['/airport-taxi/home'])
        }
      })
  }

  ngOnInit(): void {
    this.loadDropdowns()
    this.initialiseForm()
    this.loadCurrencies(0)
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
    this.loadCurrencies(countryId)
  }
  loadCity(stateId: number) {
    this.commonService.GetCityByStateId(stateId).subscribe((res) => {
      this.cities = res
    })
  }

  isFormValid(): boolean {
    const isValid =
      // this.taxiRegistrationForm.countryId > 0 &&
      // this.taxiRegistrationForm.stateId > 0 &&
      // this.taxiRegistrationForm.cityId > 0 &&
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

  currencies: any = []
  loadCurrencies(countryId: any) {
    this.commonService
      .GetCurrencyBycountryId(countryId)
      .subscribe((res: any[]) => {
        this.currencies = [{ id: 0, name: 'Select Currency' }, ...res]
      })
  }
  goToStep(stepId: number): void {
    this.currentStep = stepId
  }
}