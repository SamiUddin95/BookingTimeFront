import { Component } from '@angular/core';
import { featuredHotelsData, featuredPropertiesData } from '../../data'
import { currency } from '@/app/store'
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'home-popular-attractions',
  standalone: true,
  imports: [NgbTooltip],
  templateUrl: './popular-attractions.component.html',
  styleUrl: './popular-attractions.component.scss'
})
export class PopularAttractionsComponent {
  properties = featuredHotelsData
  currencyType = currency

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
}
