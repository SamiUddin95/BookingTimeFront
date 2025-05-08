import { Component, inject, OnInit } from '@angular/core'
/* import { TopbarComponent } from './components/topbar/topbar.component' */
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
import { HeroComponent } from '../home/components/hero/hero.component'

import { AttractionService } from '@/app/core/services/api/attraction.service'
import { CommonModule } from '@angular/common'

import { TopbarComponent } from '../home/components/top-nav/top-nav.component'

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
    NgbRatingModule,
    HeroComponent,
    CommonModule,
    TopbarComponent
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
  selectedCityIds: number[] = [];
  selectedCategoryIds: number[] = [];

  constructor(private route: ActivatedRoute) { }

  private attractionService = inject(AttractionService);

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
    this.attractionService.GetAllAttractionCategories().subscribe((res) => {
      this.categories = res;
      console.log(res)
    })
  }

  filterAttractions() {
    const payload = {
      cityIds: this.selectedCityIds,
      categoryIds: this.selectedCategoryIds
    };

    console.log("the payload: ", payload)

    this.attractionService.GetAttractionsByFilter(payload).subscribe(res => {
      this.attractions = res;
    });
  }

  onCityChange(event: any, cityId: number) {
    const id = cityId;
    if (event.target.checked) {
      this.selectedCityIds.push(id);
    } else {
      this.selectedCityIds = this.selectedCityIds.filter(x => x !== id);
    }
    this.filterAttractions();
  }
  
  onCategoryChange(event: any, categoryId: number) {
    const id = categoryId;
    if (event.target.checked) {
      this.selectedCategoryIds.push(id);
    } else {
      this.selectedCategoryIds = this.selectedCategoryIds.filter(x => x !== id);
    }
    this.filterAttractions();
  }
}
