import { Component, inject } from '@angular/core';
import { featuredHotelsData, featuredPropertiesData, claims } from '../../data'
import { currency } from '@/app/store'
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { StaysService } from '@/app/core/services/api/stays.service';
import { HotelSearchService } from '@/app/core/services/hotel-search.service';


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
  cities: string[] = []; 
  selectedCity: string = '';

  ngOnInit() {
    this.loadFeaturedHotels();
  }

  // filterProperties(location: string) { 
  //   if (!this.properties.length) return; // Ensure properties is loaded before filtering
  //   this.selectedLocation = location;
  //   this.filteredProperties = this.properties.filter(
  //     (property) => property.cityName === location
  //   );
  // }
  

  extractUniqueLocations() {
    this.locationFilters = [...new Set(this.properties.map(p => p.cityName))];
  }

  roundOff(rating: number): number {
    if (!rating || rating < 0) return 0; 
    return Math.floor(rating); 
  }
  

  private staysService = inject(StaysService);
  private hotelSearchService = inject(HotelSearchService)
  constructor(private router: Router) {}

  loadFeaturedHotels(): void {
    this.staysService.GetFeaturedHotel().subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.properties = res;
        this.extractCities(); 
        this.filterProperties(this.cities[0]); 
      }
    });
  }

  extractCities(): void {
    this.cities = [...new Set(this.properties.map(hotel => hotel.cityName))]; 
  }

  filterProperties(cityName: string): void {
    this.selectedCity = cityName;
    const cityData = this.properties.find(hotel => hotel.cityName === cityName);
    this.filteredProperties = cityData ? cityData.properties : [];
  }
  
  goToHotelDetail(hotelId: number) {
    const availabilityData = {
      cityId: hotelId}
 this.hotelSearchService.updateAvailabilityWithPriceRange(availabilityData);
    this.router.navigate(['/hotels/list']);
  }

}
