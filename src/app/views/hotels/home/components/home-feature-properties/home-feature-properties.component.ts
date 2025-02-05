import { Component } from '@angular/core';
import { featuredHotelsData, featuredPropertiesData, claims } from '../../data'
import { currency } from '@/app/store'
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'home-feature-properties',
  standalone: true,
  imports: [NgbTooltip, CommonModule],
  templateUrl: './home-feature-properties.component.html',
  styleUrl: './home-feature-properties.component.scss'
})
export class HomeFeaturePropertiesComponent {
  properties = featuredHotelsData
  currencyType = currency
  claims = claims

  filteredProperties = this.properties;
  selectedLocation: string | null = null;
  locationFilters: string[] = [];

  ngOnInit() {
    this.selectedLocation = this.properties[0].location;
    this.filterProperties(this.selectedLocation)
    this.extractUniqueLocations()
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
