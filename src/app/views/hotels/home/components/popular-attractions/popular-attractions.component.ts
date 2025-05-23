import { Component, inject } from '@angular/core';
import { featuredHotelsData, featuredPropertiesData } from '../../data'
import { currency } from '@/app/store'
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from '@angular/router';
import { StaysService } from '@/app/core/services/api/stays.service';
import { HotelSearchService } from '@/app/core/services/hotel-search.service';

@Component({
  selector: 'home-popular-attractions',
  standalone: true,
  imports: [NgbTooltip, RouterLink],
  templateUrl: './popular-attractions.component.html',
  styleUrl: './popular-attractions.component.scss'
})
export class PopularAttractionsComponent {
  properties: any[] = [];
  currencyType :any

  private staysService = inject(StaysService);
  private hotelSearchService = inject(HotelSearchService)
  constructor(private router: Router) {}

  filteredProperties = this.properties;
  selectedLocation: string | null = null; 
  locationFilters: string[] = [];
  cities: string[] = []; 
  selectedCity: string = '';
  ngOnInit() {
    // this.selectedLocation = this.properties[0].location;
    // this.filterProperties(this.selectedLocation)
    // this.extractUniqueLocations()
    this.loadPopularHotels()
  }

  filterProperties(cityName: string): void {
    this.selectedCity = cityName;
    const cityData = this.properties.find(hotel => hotel.cityName === cityName);
    this.filteredProperties = cityData ? cityData.properties : [];
  }

  roundOff(rating: number): number {
    if (!rating || rating < 0) return 0; 
    return Math.floor(rating); 
  }
  loadPopularHotels(): void {
    this.staysService.GetPopularAttraction().subscribe((res: any[]) => {
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

  goToHotelDetail(hotelId: number) {
    const availabilityData = {
      cityId: hotelId}
 this.hotelSearchService.updateAvailabilityWithPriceRange(availabilityData);
    this.router.navigate(['/hotels/list']);
  }

}
