import { DateFormInputDirective } from '@/app/components/form/date-form-input.directive'
import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { AirportTaxiDetailsRequestModel, RegisterTaxiForm } from '@/app/core/models/requestModels/register-airport-taxi.model'
import { AirportTaxiFilterService } from '@/app/core/services/airport-taxi-filter.service'
import { CommonService } from '@/app/core/services/api/common.service'
import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { Options } from 'flatpickr/dist/types/options';

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
export class BannerComponent implements OnInit {
 
  activeTab = 'one-way'
  private commonService = inject(CommonService)
  private filterService = inject(AirportTaxiFilterService);
  cities: any[] = []

  requestModel!: AirportTaxiDetailsRequestModel


  flatpickrOptions: Partial<Options> = {
    dateFormat: 'Y-m-d', 
    altInput: true,      
    altFormat: 'd M Y',  
    minDate: new Date()
  };

  ngOnInit(): void {
    this.loadCities();
    this.initializeRequestModel();
  }

  changeTab(tab: string) {
    this.activeTab = tab
  }

  swapCities() {
    if (
      this.requestModel.detail.cityId != null &&
      this.requestModel.detail.dropCityId != null &&
      this.requestModel.detail.cityId !== -1 &&
      this.requestModel.detail.dropCityId !== -1
    ) {
      const temp = this.requestModel.detail.cityId;
      this.requestModel.detail.cityId = this.requestModel.detail.dropCityId;
      this.requestModel.detail.dropCityId = temp;
    }
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
        priceTo: undefined
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
  
    // Check pickUpDate is not in the past
    const today = new Date();
    const pickupDate = new Date(detail.pickUpDate ?? '');
    today.setHours(0, 0, 0, 0);
    pickupDate.setHours(0, 0, 0, 0);
   
    if (detail.cityId === undefined || detail.dropCityId === undefined) {
      errors.push('Both pickup and drop city are required.');
    } 
  
    if (!detail.pickUpDate) {
      errors.push('Please select pick-up Date.');
    } else if (pickupDate < today) {
      errors.push('Pick-up date cannot be in the past.');
    }
  
    if (detail.pickUpTime == undefined || detail.pickUpTime == '') {
      errors.push('Please select valid time.');
    } 
  
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
    this.filterService.updateFilter(this.requestModel);
  }

}
