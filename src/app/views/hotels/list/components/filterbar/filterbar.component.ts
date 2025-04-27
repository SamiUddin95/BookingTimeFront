import { currency } from '@/app/store'
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core'
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonService } from '@/app/core/services/api/common.service'
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'list-filterbar',
  standalone: true,
  imports: [NgbCollapseModule, FormsModule, ReactiveFormsModule],
  templateUrl: './filterbar.component.html',
  styles: ``,
})
export class FilterbarComponent implements OnInit{

  @Output() hotelFilterEmit = new EventEmitter<any>(); 
  private commonService = inject(CommonService);

  currencyType = currency
  hotelTypes: any;
  ratings:any;
  amenities: any;
  // meals: any;
  // facilities: any;
  // funActivites: any;
  // policy: any;
  bedroom: any;
  bathroom: any;
  
  hotelFilter = {
    details: {
      priceRangeFrom: 0,
      priceRangeTo: 2000,
      bedrooms: 0,
      bathrooms: 0,
      ratingId: 0,
      hotelTypes: [] as { hotelTypeId: number }[],
      amenities: [] as { amenitiesId: number }[]
    },
    paginationInfo: {

    }
  };
  
meals:any=[
{Id:1,Name:"Kitchen facility"},
{Id:2,Name:"Breakfast included"},
{Id:3,Name:"All meal included"},
{Id:4,Name:"All-inclusive"},
{Id:5,Name:"Breakfast and lunch included"},
{Id:5,Name:"Breakfast and dinner included"}
]
facilities:any=[
{Id:1,Name:"Parking"},
{Id:2,Name:"Resturent"},
{Id:3,Name:"Pet friendly"},
{Id:4,Name:"Room service"},
{Id:5,Name:"24-hour front desk"}
]

funActivites:any=[
{Id:1,Name:"Beach"},
{Id:2,Name:"Hiking"},
{Id:3,Name:"Cycling"},
{Id:4,Name:"Golf course"},
{Id:5,Name:"Fishing"}
]
policy:any=[
{Id:1,Name:"Free cancellation"},
{Id:2,Name:"Book without credit card"}
]

  

  increase(type: string) {
    if (type === 'bedrooms') {
      this.hotelFilter.details.bedrooms++;
    } else if (type === 'bathrooms') {
      this.hotelFilter.details.bathrooms++;
    }
  }
  
  decrease(type: string) {
    if (type === 'bedrooms' && this.hotelFilter.details.bedrooms > 0) {
      this.hotelFilter.details.bedrooms--;
    } else if (type === 'bathrooms' && this.hotelFilter.details.bathrooms > 0) {
      this.hotelFilter.details.bathrooms--;
    }
  }
  ngOnInit(): void {
      this.loadHotelTypes();
      this.loadRatings();
      this.loadAmenities();
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

  clearAll() {
    this.hotelFilter = {
      details: {
        priceRangeFrom: 0,
        priceRangeTo: 2000,
        bedrooms: 0,
        bathrooms: 0,
        ratingId: 0,
        hotelTypes: [],
        amenities: []
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
