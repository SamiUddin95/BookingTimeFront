import { Component, Input, OnInit, ViewChild, inject } from '@angular/core'
import { hotels } from '../../data'
import type { TinySliderSettings } from 'tiny-slider'
import {
  NgbDropdownModule,
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'
import { currency } from '@/app/store'
import { CommonModule } from '@angular/common'
import { HotelSearchService } from '@/app/core/services/hotel-search.service'
import { StaysService } from '@/app/core/services/api/stays.service'

@Component({
  selector: 'list-card',
  standalone: true,
  imports: [
    NgbRatingModule,
    NgbDropdownModule,
    NgbPaginationModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './listcard.component.html',
  styles: ``,
})
export class ListcardComponent implements OnInit {

  currencyType = currency
  @ViewChild('listSlider', { static: false }) listSlider: any
  private hotelSearchService = inject(HotelSearchService);
  private staysService = inject(StaysService);

  listSliderSettings: TinySliderSettings = {
    arrowKeys: true,
    controlsText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    controls: true,
    items: 1,
  }

  hotelList:any=[]
  
  currentPage = 1;
pageSize = 10;
totalCount = 0;
  ngOnInit() {
    this.hotelSearchService.filter$.subscribe((filter: any) => {
      if (filter) {
        this.callApiWith(filter);
      }
    });
  }

  // hotelList = {
  //   propertydetails: [
  //     {
  //       id: 1,
  //       thumbnail: 'https://via.placeholder.com/250x150.png?text=Hotel+1',
  //       rating: 4.5,
  //       listName: 'Grand Palace Hotel',
  //       street: '123 Main St, ',
  //       city: 'Metropolis, ',
  //       country: 'USA',
  //       postalCode: '10001',
  //       features: ['Free Wi-Fi', 'Pool', 'Gym', 'Spa'],
  //       schemes: ['Free Cancellation', 'Breakfast Included'],
  //       basePrice: 120,
  //       sale: true
  //     },
  //     {
  //       id: 2,
  //       thumbnail: 'https://via.placeholder.com/250x150.png?text=Hotel+2',
  //       rating: 3.7,
  //       listName: 'Ocean View Resort',
  //       street: '456 Beach Rd, ',
  //       city: 'Laguna, ',
  //       country: 'Philippines',
  //       postalCode: '5200',
  //       features: ['Beachfront', 'Bar', 'Airport Shuttle'],
  //       schemes: ['Free Cancellation'],
  //       basePrice: 95,
  //       sale: false
  //     },
  //     {
  //       id: 3,
  //       thumbnail: 'https://via.placeholder.com/250x150.png?text=Hotel+3',
  //       rating: 5,
  //       listName: 'Mountain Lodge',
  //       street: '789 Hilltop Dr, ',
  //       city: 'Aspen, ',
  //       country: 'USA',
  //       postalCode: '81611',
  //       features: ['Ski Access', 'Hot Tub', 'Fireplace'],
  //       schemes: null, // Non-refundable fallback
  //       basePrice: 180,
  //       sale: true
  //     }
  //   ]
  // };
  
//  currencyType = '$';
  
// loadHotels() {
//   // this.staysService.GetListingPropertyList(this.hotelFilter).subscribe((res)=> {
//   //   this.hotelList = res;
//   //   console.log(res)
//   // })
//   debugger
//   this.hotelSearchService.filter$.subscribe((filter: any) => {
//     if (filter) {
//      this.callApiWith(filter);
//     }
//   });
// }
onPageChange(page: number) {
  this.currentPage = page;
  this.hotelSearchService.filter$.subscribe((filter: any) => {
    if (filter) {
      this.callApiWith(filter);
    }
  });
}


callApiWith(filter: any) {
  const payload = {
    details: filter.details,
    paginationInfo: {
      page: this.currentPage,
      pageSize: this.pageSize
    }
  };

  this.staysService.GetListingPropertyList(payload).subscribe((res) => {
    const mappedHotelList = res.propertydetails.map((property: any) => {
      return {
        id: property.id,
        thumbnail: property.thumbnail || '', 
        rating: parseFloat(property.rating), 
        listName: property.listName,
        street: '', 
        city: property.cityName, 
        country: property.countryName,
        postalCode: '', 
        features: (property.amenities ?? []).map((amenity: any) => amenity.name), 
        schemes: property.shortDesc ||'', 
        basePrice: property.basePrice,
        sale: property.discount > 0 
      };
    });

    this.hotelList = {
      propertydetails: mappedHotelList
    };

    this.totalCount = res.totalCount || 0;
  });
}





}