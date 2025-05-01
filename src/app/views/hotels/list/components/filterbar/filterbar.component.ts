import { currency } from '@/app/store'
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonService } from '@/app/core/services/api/common.service'
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { StaysService } from '@/app/core/services/api/stays.service'

@Component({
  selector: 'list-filterbar',
  standalone: true,
  imports: [NgbCollapseModule, FormsModule, ReactiveFormsModule],
  templateUrl: './filterbar.component.html',
  styles: ``,
})
export class FilterbarComponent implements OnInit{


  @Output() hotelFilterEmit = new EventEmitter<any>(); 

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


  hotelFilter = {
    details: {
      priceRangeFrom: 0,
      priceRangeTo: 2000,
      ratingId: 0,
      hotelTypes: [] as { hotelTypeId: number }[],
      amenities: [] as { amenitiesId: number }[],
      BeachAccess: [] as { id: number }[],
      EntirePlaces: [] as { id: number }[],
      Facilities: [] as { id: number }[],
      FunThingsToDo: [] as { id: number }[],
      PopularFilter: [] as { id: number }[],
      PropertyType: [] as { id: number }[],
      PropertyAccessibility: [] as { id: number }[],
      roomAccessibility: [] as { id: number }[],
      roomFacilities: [] as { id: number }[]
    },
    paginationInfo: {
      page: 0,
      rowsPerPage: 10
    }
  };
  
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
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.hotelFilter.details.hotelTypes.push({ hotelTypeId });
    } else {
      this.hotelFilter.details.hotelTypes = this.hotelFilter.details.hotelTypes.filter(
        (        ht: { hotelTypeId: number }) => ht.hotelTypeId !== hotelTypeId
      );
    }
  }

  onRatingChange(ratingId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.hotelFilter.details.ratingId = ratingId;
    } else {
      this.hotelFilter.details.ratingId = 0;
    }
  }

  onAmenityChange(amenityId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.hotelFilter.details.amenities.push({ amenitiesId: amenityId });
    } else {
      this.hotelFilter.details.amenities = this.hotelFilter.details.amenities.filter(
        (        a: { amenitiesId: number }) => a.amenitiesId !== amenityId
      );
    }
  }

  isItemChecked(list: any[], id: any): boolean {
    return list?.some(x => x === id || x.id === id);
  }
  

  clearAll() {
    this.hotelFilter = {
      details: {
        priceRangeFrom: 0,
        priceRangeTo: 2000,
        ratingId: 0,
        hotelTypes: [],
        amenities: [],
        BeachAccess:[],
        EntirePlaces:[],
        FunThingsToDo:[],
        Facilities:[],
        PopularFilter:[],
        PropertyType:[],
        PropertyAccessibility:[],
        roomAccessibility:[],
        roomFacilities:[],
      },
      paginationInfo: {
        page: 0,
        rowsPerPage: 0
      }
    };
  }

  applyFilter() {
    this.hotelFilterEmit.emit(this.hotelFilter); 
  }



}
