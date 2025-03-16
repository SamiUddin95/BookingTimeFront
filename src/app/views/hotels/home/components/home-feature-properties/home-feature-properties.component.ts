import { Component } from '@angular/core';
import { featuredHotelsData, featuredPropertiesData, claims } from '../../data'
import { currency } from '@/app/store'
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AppServiceService } from '@/app/services/app-service.service'
import { RouterLink } from '@angular/router';


@Component({
  selector: 'home-feature-properties',
  standalone: true,
  imports: [NgbTooltip, CommonModule, RouterLink],
  templateUrl: './home-feature-properties.component.html',
  styleUrl: './home-feature-properties.component.scss'
})
export class HomeFeaturePropertiesComponent {
  constructor(private app: AppServiceService) { }
  properties: any[] = [];
  //properties = featuredHotelsData
  currencyType = currency
  claims = claims

  filteredProperties = this.properties;
  selectedLocation: string = '';
  locationFilters: string[] = [];

  ngOnInit() {
    if (this.properties.length > 0 && this.properties[0].location) {
      this.selectedLocation = this.properties[0].location;
      this.filterProperties(this.selectedLocation);
      this.extractUniqueLocations();
    }
    this.app.get("GetListingPropertyList").subscribe(res => {
      this.filteredProperties = res.slice(0, 4).map((e: any) => ({
        location: 'New York',
        image: 'assets/images/category/hotel/01.jpg',
        name: e.listName,
        price: e.basePrice,
        ratings: 3.2,
        reviews: 128
      }));
    });
  }

  filterProperties(location: string) {
    this.selectedLocation = location;
    this.filteredProperties = this.properties.filter(
      (property) => property.location === location
    );
  }

  extractUniqueLocations() {
    this.locationFilters = [...new Set(this.properties.map(p => p.location))];
  }

  roundOff(value: number) {
    return Math.round(value)
  }


}
