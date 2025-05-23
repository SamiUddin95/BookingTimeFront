import { DateFormInputDirective } from '@/app/components/form/date-form-input.directive'
import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { propertydetailsmodel } from '@/app/core/models/requestModels/property-details-model'
import { CommonService } from '@/app/core/services/api/common.service'
import { HotelSearchService } from '@/app/core/services/hotel-search.service'
import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { Options } from 'flatpickr/dist/types/options';
import { Router } from '@angular/router';


type AvailabilityFormType = {
  location: string
  stayFor: Date | Array<Date>
  guests: {
    adults: number
    children: number
    rooms: number
  }
}

@Component({
  selector: 'home-availability-filter',
  standalone: true,
  imports: [
    DateFormInputDirective,
    NgbDropdownModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './availability-filter.component.html',
})
export class AvailabilityFilterComponent implements OnInit {
 
  ngOnInit(): void {
    var cityId=this.hotelSearchService.getCityId();
    if(cityId!=undefined||cityId!=null||cityId!="")
    {
      this.hotelFilter.details.cityId=cityId
    }
   
    const savedDates = this.hotelSearchService.GetCheckInOutDates();

  if (savedDates && savedDates.checkIn && savedDates.checkOut) {
    this.dateRange = [
      new Date(savedDates.checkIn),
      new Date(savedDates.checkOut)
    ];

    this.flatpickrOptions = {
      ...this.flatpickrOptions,
      defaultDate: this.dateRange,
    };
  }

    this.loadCities()
  }

  private commonService = inject(CommonService)
  private hotelSearchService = inject(HotelSearchService);

  constructor(private router: Router) {}
  hotelFilter :propertydetailsmodel = {
    details: {
      cityId: null,
      checkIn: null as Date | null,
      checkOut: null as Date | null,
      priceRangeFrom: null,
      priceRangeTo: null,
      ratingId: null,
      hotelTypes: [] as { hotelTypeId: number }[],
      amenities: [] as { amenitiesId: number }[],
      beachAccess: [] as { id: number }[],
      entirePlaces: [] as { id: number }[],
      facilities: [] as { id: number }[],
      funThingsToDo: [] as { id: number }[],
      popularFilter: [] as { id: number }[],
      propertyType: [] as { id: number }[],
      propertyAccessibility: [] as { id: number }[],
      roomAccessibility: [] as { id: number }[],
      roomFacilities: [] as { id: number }[],
        },
    paginationInfo: {
      page: 0,
      rowsPerPage: 10,
    },
  }

  cities: any[] = []
  dateRange: Date[] = [];

  flatpickrOptions: Partial<Options> = {
    mode: 'range',
    dateFormat: 'd M Y',
    defaultDate: [],
    onChange: (selectedDates: Date[]) => {
      this.onDateRangeChange(selectedDates);
    }
  };
  
  loadCities() {
    this.commonService.GetCityAndCountryList().subscribe((res) => {
      this.cities = res
    })
  }

  formValue: AvailabilityFormType = {
    location: '',
    stayFor: [],
    guests: {
      adults: 0,
      rooms: 0,
      children: 0,
    },
  };
  

  onDateRangeChange(dates: Date[]) {
  
    if (dates && dates.length === 2) {
      this.hotelFilter.details.checkIn = dates[0];
      this.hotelFilter.details.checkOut = dates[1];
      // var a = this.hotelSearchService.GetPriceRange()?.from;
      // var b = this.hotelSearchService.GetPriceRange()?.to;

      const availabilityData = {
        cityId: this.hotelFilter.details.cityId,
        checkIn: this.hotelFilter.details.checkIn,
        checkOut:this.hotelFilter.details.checkOut,
        guests: this.formValue.guests,
        priceRangeFrom: this.hotelSearchService.GetPriceRange()?.from,
        priceRangeTo: this.hotelSearchService.GetPriceRange()?.to,
        ratingId: this.hotelSearchService.getratingId(),
      };
    
     this.hotelSearchService.updateAvailabilityWithPriceRange(availabilityData);
    } else {
      this.hotelFilter.details.checkIn = null;
      this.hotelFilter.details.checkOut = null;
    }
  

  }
  

  updateGuests = (
    type: keyof AvailabilityFormType['guests'],
    increase: boolean = true
  ) => {
    const val = this.formValue.guests[type]
    this.formValue = {
      ...this.formValue,
      guests: {
        ...this.formValue.guests,
        [type]: increase ? val + 1 : val > 1 ? val - 1 : 0,
      },
    }
  }

  getGuestsValue = (): string => {
    let value = ''
    const guests = this.formValue.guests
    if (guests.adults || guests.children) {
      value +=
        guests.adults +
        guests.children +
        (guests.adults > 1 ? ' Guests ' : ' Guest ')
    }
    if (guests.rooms) {
      value += guests.rooms + (guests.rooms > 1 ? ' Rooms ' : ' Room ')
    }
    return value
  }

  searchHotels() {
    if (!this.hotelFilter.details.cityId) {
      alert('Please select a city.');
      return;
    }
    const availabilityData = {
      cityId: this.hotelFilter.details.cityId,
      checkIn: this.hotelSearchService.GetCheckInOutDates()?.checkIn??this.hotelFilter.details.checkIn,
      checkOut: this.hotelSearchService.GetCheckInOutDates()?.checkOut??this.hotelFilter.details.checkOut,
      guests: this.formValue.guests,
      priceRangeFrom: this.hotelSearchService.GetPriceRange()?.from,
      priceRangeTo: this.hotelSearchService.GetPriceRange()?.to,
      ratingId: this.hotelSearchService.getratingId(),
    };
    this.hotelSearchService.updateAvailabilityWithPriceRange(availabilityData);
    const isCheckInCheckOutValid = this.hotelSearchService.CheckInCheckOutValid()
    if (!isCheckInCheckOutValid) {
      alert('Please ensure the check-in date is before the check-out date.')
      return
    }
    if (this.router.url === '/hotels/home') {
      this.router.navigate(['/hotels/list']);
    }
    
    this.hotelSearchService.updateAvailability(availabilityData);

  }
  
  onLocationChange(): void {
    
    const availabilityData = {
      cityId: this.hotelFilter.details.cityId,
      checkIn: this.hotelSearchService.GetCheckInOutDates()?.checkIn,
      checkOut: this.hotelSearchService.GetCheckInOutDates()?.checkOut,
      priceRangeFrom: this.hotelSearchService.GetPriceRange()?.from,
      priceRangeTo: this.hotelSearchService.GetPriceRange()?.to,
      ratingId: this.hotelSearchService.getratingId(),
      guests: this.formValue.guests,
    };
    // Update the shared service
    this.hotelSearchService.updateAvailabilityWithCity(availabilityData);
  }

  
}
