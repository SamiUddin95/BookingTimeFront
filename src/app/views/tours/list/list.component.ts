import { Component, inject, OnInit } from '@angular/core'
import { TopbarComponent } from './components/topbar/topbar.component'
import { BannerComponent } from './components/banner/banner.component'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'
import { ListcardComponent } from './components/listcard/listcard.component'
import { FilterOffcanvasComponent } from './components/filter-offcanvas/filter-offcanvas.component'
import { FilterbarComponent } from './components/filterbar/filterbar.component'
//import { Footer1Component } from './components/footer1/footer1.component'
import { ActivatedRoute, RouterModule } from '@angular/router'

import { TopNavHeaderComponent } from '../../../components/top-nav-header/top-nav-header.component'
import { AvailabilityFilterComponent } from '../home/components/availability-filter/availability-filter.component'
import { Footer1Component } from '../../hotels/home/components/footer1/footer1.component'

import { AttractionService } from '@/app/core/services/api/attraction.service'

import {
  NgbDropdownModule,
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    TopbarComponent,
    BannerComponent,
    NgbAlertModule,
    ListcardComponent,
    FilterbarComponent,
    FilterOffcanvasComponent,
    Footer1Component,
    RouterModule,
    TopNavHeaderComponent,
    AvailabilityFilterComponent,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbRatingModule
  ],
  templateUrl: './list.component.html',
  styles: ``,
})
export class ListComponent implements OnInit {
  staticAlertClosed = true;
  attractions: any
  cityId: any;
  locations: any
  categories: any

  constructor(private route: ActivatedRoute) { }

  private attractionService = inject(AttractionService);

  searchHotel(e: Event) {
    console.log(e)
    // this.staysService.GetListingPropertyList(e).subscribe((res=> {
    //   this.hotelList = res;
    //   console.log(res)
    // }))
  }

  ngOnInit(): void {
    this.cityId = this.route.snapshot.paramMap.get('id');
    this.loadAttractions(this.cityId);
    this.loadLocations();
    this.loadCategories();
  }

  loadAttractions(cityId: number) {
    this.attractionService.GetAttractionsByCity(cityId).subscribe((res) => {
      this.attractions = res;
      console.log(res)
    })
  }

  loadLocations() {
    this.attractionService.GetAllDestinationsByAttraction().subscribe((res) => {
      this.locations = res;
      console.log(res)
    })
  }

  loadCategories() {
    this.attractionService.GetAllAttractionCateogories().subscribe((res) => {
      this.categories = res;
      console.log(res)
    })
  }
}
