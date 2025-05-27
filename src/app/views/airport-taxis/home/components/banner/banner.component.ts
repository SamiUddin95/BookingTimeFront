import { DateFormInputDirective } from '@/app/components/form/date-form-input.directive'
import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { AirportTaxiDetailsRequestModel, RegisterTaxiForm } from '@/app/core/models/requestModels/register-airport-taxi.model'
import { AirportTaxiFilterService } from '@/app/core/services/airport-taxi-filter.service'
import { CommonService } from '@/app/core/services/api/common.service'
import { CommonModule } from '@angular/common'
import { Component, inject, OnInit , AfterViewInit, ViewChild, ElementRef, NgZone} from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { Options } from 'flatpickr/dist/types/options';
declare const google: any;

@Component({
  selector: 'home-banner',
  standalone: true,
  imports: [
    SelectFormInputDirective,
    NgbNavModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DateFormInputDirective,
  ],
  templateUrl: './banner.component.html',
  styles: ``,
})
export class BannerComponent implements AfterViewInit,OnInit {


  pickupPlace: google.maps.places.PlaceResult | null = null;
  dropPlace: google.maps.places.PlaceResult | null = null;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.initPickupAutocomplete();
    this.initDropAutocomplete();
  }
  activeTab = 'one-way'
  private commonService = inject(CommonService)
  private filterService = inject(AirportTaxiFilterService);
  cities: any[] = []

  @ViewChild('pickupInput') pickupInput!: ElementRef;
  @ViewChild('dropInput') dropInput!: ElementRef;
  requestModel!: AirportTaxiDetailsRequestModel
  // requestModel!: AirportTaxiDetailsRequestModel
cityName:any=''

  flatpickrOptions: Partial<Options> = {
    dateFormat: 'Y-m-d H:i',
    enableTime:true,
    // altInput: true,      
    // altFormat: 'd M Y H:i',  
    minDate: new Date()
  };
  flatpickrOptionsReturn = {
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
    minDate: new Date()
  };
  ngOnInit(): void {
    this.loadCities();
    this.initializeRequestModel();
    if (this.pickupInput?.nativeElement) {
      this.pickupInput.nativeElement.value = '';
    }
    if (this.dropInput?.nativeElement) {
      this.dropInput.nativeElement.value = '';
    }
  }


  initPickupAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.pickupInput.nativeElement, {
      types: ['geocode']
    });

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autocomplete.getPlace();
        this.pickupPlace = place;
        this.requestModel.detail.cityId = place.formatted_address;
        const cityComponent = place.address_components?.find((component: { types: string | string[] }) =>
          component.types.includes('locality') || component.types.includes('administrative_area_level_1')
        );
  
        const cityName = cityComponent ? cityComponent.long_name : place.formatted_address;
        this.cityName=cityName
      });
    });
  }

  initDropAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.dropInput.nativeElement, {
      // types: ['geocode'] 
    });
  
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autocomplete.getPlace();
        this.dropPlace = place;  
        this.requestModel.detail.dropCityId = place.formatted_address;
      });
    });
  
    this.dropInput.nativeElement.addEventListener('focus', () => {
      if (this.pickupPlace?.geometry?.viewport) {
        autocomplete.setBounds(this.pickupPlace.geometry.viewport);
      } else if (this.pickupPlace?.geometry?.location) {
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(this.pickupPlace.geometry.location);
        autocomplete.setBounds(bounds);
      }
    });
  }
  
  

  

  swapCities() {
    const pickup = this.requestModel.detail.cityId;
    const drop = this.requestModel.detail.dropCityId;
  
    if (pickup && drop) {
      this.requestModel.detail.cityId = drop;
      this.requestModel.detail.dropCityId = pickup;
  
      const tempPlace = this.pickupPlace;
      this.pickupPlace = this.dropPlace;
      this.dropPlace = tempPlace;
  
      if (this.pickupInput && this.dropInput) {
        this.pickupInput.nativeElement.value = this.pickupPlace?.formatted_address || '';
        this.dropInput.nativeElement.value = this.dropPlace?.formatted_address || '';
      }
    }
  }
  
  
  changeTab(tab: string) {
    this.activeTab = tab
  }

  initializeRequestModel() {
    this.requestModel = {
      detail: {
        taxiId: undefined,
        pickUpDate: undefined,
        pickUpTime: '',
        cityId: undefined,
        dropCityId: undefined,
        priceFrom: undefined,
        priceTo: undefined,
        tripType:"oneWay"
      },
      paginationInfo: {
        page: 1,
        pageSize: 10
      }
    };
  }
  
  loadCities() {
    this.commonService.GetCityAndCountryList().subscribe((res: any) => {
      this.cities = res
    })
  }

  validateRequestModel(): string[] {
    const errors: string[] = [];
    const detail = this.requestModel.detail;
  

    const today = new Date();
    const pickupDate = new Date(detail.pickUpDate ?? '');
    today.setHours(0, 0, 0, 0);
    pickupDate.setHours(0, 0, 0, 0);
   
    if (this.cityName == undefined ) {
      errors.push('Both pickup and drop city are required.');
    } 
  
    if (!detail.pickUpDate) {
      errors.push('Please select pick-up Date.');
    } else if (pickupDate < today) {
      errors.push('Pick-up date cannot be in the past.');
    }
  
    // if (detail.pickUpTime == undefined || detail.pickUpTime == '') {
    //   errors.push('Please select valid time.');
    // } 
  
    return errors;
  }


  searchTaxis() {
    const errors = this.validateRequestModel();
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }
    if (this.requestModel.detail.pickUpTime && this.requestModel.detail.pickUpTime.length === 5) {
      this.requestModel.detail.pickUpTime += ':00';
    }
    debugger
    const city=String(this.cityName)
    this.filterService.updateCityName(city);
  }

}
