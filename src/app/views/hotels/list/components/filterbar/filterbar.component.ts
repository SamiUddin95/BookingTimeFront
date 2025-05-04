import { currency } from '@/app/store'
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonService } from '@/app/core/services/api/common.service'
import { HotelSearchService } from '@/app/core/services/hotel-search.service'
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StaysService } from '@/app/core/services/api/stays.service'
import { propertydetailsmodel } from '@/app/core/models/requestModels/property-details-model'

@Component({
  selector: 'list-filterbar',
  standalone: true,
  imports: [NgbCollapseModule, FormsModule, ReactiveFormsModule],
  templateUrl: './filterbar.component.html',
  styles: ``,
})
export class FilterbarComponent implements OnInit{


  @Output() hotelFilterEmit = new EventEmitter<any>(); 

  private hotelSearchService = inject(HotelSearchService);

  currencyType = currency
  hotelTypes: any;
  ratings:any;
  amenities: any;
  beaches: any[] = [];
  entirePlaces: any[] = [];
  facility: any[] = [];
  funThings: any[] = [];
  popular: any[] = [];
  roomAccess: any[] = [];
  roomFacility: any[] = [];
  propertyAccess: any[] = [];
  propertyType: any[] = [];
  additionalInfoList: any[] = [];


  hotelFilter :propertydetailsmodel = {
    details: {
      cityId: 0,
      checkIn: null as Date | null,
      checkOut: null as Date | null,
      priceRangeFrom: 0,
      priceRangeTo: 0,
      ratingId: 0,
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
  private commonService = inject(CommonService);
  private propertyService = inject(StaysService);

  ngOnInit(): void {
      this.loadHotelTypes();
      this.loadRatings();
      this.loadAmenities();
      this.loadDropDowns();
  }

  loadHotelTypes() {
    this.commonService.GetAllHotelTypesList().subscribe((res => {
      this.hotelTypes = res;
    }))
  }

  loadRatings() {
    this.commonService.GetAllRatingsList().subscribe((res=> {
      this.ratings = res;
    }))
  }

  loadAmenities() {
    this.commonService.GetAllAmenitiesList().subscribe((res=>{
      this.amenities = res;
    }))
  }

  loadDropDowns() {

    this.propertyService.GetAllBeachAccessList().subscribe((res) => {
      this.beaches = res;
    });

    this.propertyService.GetAllEntirePlacesList().subscribe((res) => {
      this.entirePlaces = res;
    });

    this.propertyService.GetAllFacilityList().subscribe((res) => {
      this.facility = res;
    });

    this.propertyService.GetAllFunThingsToDoList().subscribe((res) => {
      this.funThings = res;
    });

    this.propertyService.GetAllPopularFiltersList().subscribe((res) => {
      this.popular = res;
    });

    this.propertyService.GetAllPropertyAccessibilitiesList().subscribe((res) => {
      this.propertyAccess = res;
    });

    this.propertyService.GetAllPropertyTypeList().subscribe((res) => {
      this.propertyType = res;
    });

    this.propertyService.GetAllRoomAccessList().subscribe((res) => {
      this.roomAccess = res;
    });

    this.propertyService.GetAllRoomFacilityList().subscribe((res) => {
      this.roomFacility = res;
    });

    this.commonService.GetAllAdditionalInfoList().subscribe((res) => {
      this.additionalInfoList = res
    })
  }

  
  onHotelTypeChange(hotelTypeId: number, event: Event) {
    const cityId = this.hotelSearchService.getCityId();
    if (!cityId) {
      alert('Please select a city.');
      (event.target as HTMLInputElement).checked = false; 
      return;
    }

    const isCheckInCheckOutValid = this.hotelSearchService.CheckInCheckOutValid();
  if (!isCheckInCheckOutValid) {
    alert('Please ensure the check-in date is before the check-out date.');
    (event.target as HTMLInputElement).checked = false;  
    return;
  }

    if (!this.hotelFilter.details.hotelTypes) {
      this.hotelFilter.details.hotelTypes = [];
    }
  
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.hotelFilter.details.hotelTypes.push({ hotelTypeId });
    } else {
      this.hotelFilter.details.hotelTypes = this.hotelFilter.details.hotelTypes.filter(
        (        ht: { hotelTypeId: number }) => ht.hotelTypeId !== hotelTypeId
      );
    }
    this.applyFilter();
  }

  onRatingChange(ratingId: number, event: Event) {
    const cityId = this.hotelSearchService.getCityId();
    if (!cityId) {
      alert('Please select a city.');
      (event.target as HTMLInputElement).checked = false; 
      return;
    }

    
    const isCheckInCheckOutValid = this.hotelSearchService.CheckInCheckOutValid();
  if (!isCheckInCheckOutValid) {
    alert('Please ensure the check-in date is before the check-out date.');
    (event.target as HTMLInputElement).checked = false;  
    return;
  }


    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.hotelFilter.details.ratingId = ratingId;
    } else {
      this.hotelFilter.details.ratingId = 0;
    }
    this.applyFilter();
  }

  onAmenityChange(amenityId: number, event: Event) {
    const cityId = this.hotelSearchService.getCityId();
    if (!cityId) {
      alert('Please select a city.');
      (event.target as HTMLInputElement).checked = false; 
      return;
    }


    const isCheckInCheckOutValid = this.hotelSearchService.CheckInCheckOutValid();
  if (!isCheckInCheckOutValid) {
    alert('Please ensure the check-in date is before the check-out date.');
    (event.target as HTMLInputElement).checked = false;  
    return;
  }

    if (!this.hotelFilter.details.amenities) {
      this.hotelFilter.details.amenities = [];
    }
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.hotelFilter.details.amenities.push({ amenitiesId: amenityId });
    } else {
      this.hotelFilter.details.amenities = this.hotelFilter.details.amenities.filter(
        (        a: { amenitiesId: number }) => a.amenitiesId !== amenityId
      );
    }
    this.applyFilter();
  }



  onCheckBoxChanges(
    filterKey:
      | 'beachAccess'
      | 'entirePlaces'
      | 'facilities'
      | 'funThingsToDo'
      | 'popularFilter'
      | 'propertyType'
      | 'propertyAccessibility'
      | 'roomAccessibility'
      | 'roomFacilities',
    id: number,
    event: Event
  ) {
    const cityId = this.hotelSearchService.getCityId();
    if (!cityId) {
      alert('Please select a city.');
      (event.target as HTMLInputElement).checked = false; 
      return;
    }

    
    const isCheckInCheckOutValid = this.hotelSearchService.CheckInCheckOutValid();
  if (!isCheckInCheckOutValid) {
    alert('Please ensure the check-in date is before the check-out date.');
    (event.target as HTMLInputElement).checked = false;  
    return;
  }

    const isChecked = (event.target as HTMLInputElement).checked;
  
    if (!this.hotelFilter.details[filterKey]) {
      this.hotelFilter.details[filterKey] = [];
    }
  
    const array = this.hotelFilter.details[filterKey] as { id: number }[];
  
    if (isChecked) {
      array.push({ id });
    } else {
      this.hotelFilter.details[filterKey] = array.filter((item) => item.id !== id);
    }
  
    this.applyFilter();
  }
  
  
  applyFilter() {
    const cityId = this.hotelSearchService.getCityId();
    if (!cityId) {
      alert('Please select a city.');
      return;
    }
    
    const isCheckInCheckOutValid = this.hotelSearchService.CheckInCheckOutValid();
  if (!isCheckInCheckOutValid) {
    alert('Please ensure the check-in date is before the check-out date.');    
    return;
  }
    this.hotelSearchService.updateSidebar(this.hotelFilter);
  }

  isItemChecked(list: any[], id: any): boolean {
    return list?.some(x => x === id || x.id === id);
  }
  

  onPriceRangeChange(): void {
    const cityId = this.hotelSearchService.getCityId();
    if (!cityId) {
      alert('Please select a city.');
      return;
    }
    
    const isCheckInCheckOutValid = this.hotelSearchService.CheckInCheckOutValid();
  if (!isCheckInCheckOutValid) {
    alert('Please ensure the check-in date is before the check-out date.');    
    return;
  }

    const availabilityData = {
      cityId: this.hotelFilter.details.cityId,
      checkIn: this.hotelFilter.details.checkIn,
      checkOut: this.hotelFilter.details.checkOut,
    //  guests: this.formValue.guests,
      priceRangeFrom: this.hotelFilter.details.priceRangeFrom,
      priceRangeTo: this.hotelFilter.details.priceRangeTo,
    };
  
    this.hotelSearchService.updateAvailability(availabilityData);
  }

  clearAll() {
    this.hotelFilter = {
      details: {
        checkIn: null as Date | null,
        checkOut: null as Date | null,
        cityId:null,
        priceRangeFrom: null,
        priceRangeTo: null,
        ratingId: null,
        hotelTypes: [],
        amenities: [],
        beachAccess:[],
        entirePlaces:[],
        funThingsToDo:[],
        facilities:[],
        popularFilter:[],
        propertyType:[],
        propertyAccessibility:[],
        roomAccessibility:[],
        roomFacilities:[],
      },
      paginationInfo: {
        page: 0,
        rowsPerPage: 0
      }
    };
  }

  
  



}
