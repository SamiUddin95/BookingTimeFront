import { Component, inject } from '@angular/core';
import { featuredHotelsData, featuredPropertiesData, claims } from '../../data'
import { currency } from '@/app/store'
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StaysService } from '@/app/core/services/api/stays.service';


@Component({
  selector: 'home-feature-properties',
  standalone: true,
  imports: [NgbTooltip, CommonModule, RouterLink],
  templateUrl: './home-feature-properties.component.html',
  styleUrl: './home-feature-properties.component.scss'
})
export class HomeFeaturePropertiesComponent {
  properties: any[] = [];
  currencyType = currency
  claims = claims

  filteredProperties = this.properties;
  selectedLocation: string = '';
  locationFilters: string[] = [];

  ngOnInit() {
    this.loadFeaturedHotels();
  }

  filterProperties(location: string) {
    this.selectedLocation = location;
    this.filteredProperties = this.properties.filter(
      (property) => property.cityName === location
    );
  }

  extractUniqueLocations() {
    this.locationFilters = [...new Set(this.properties.map(p => p.cityName))];
  }

  roundOff(value: number) {
    return Math.round(value)
  }

  private staysService = inject(StaysService);

  loadFeaturedHotels() {
    this.staysService.GetFeaturedHotel().subscribe((res => {
      this.properties = res;
      console.log(res)
      this.extractUniqueLocations();
      this.filterProperties(res[0].cityName) //defaults the ver first location initially
    }))
  }


}
