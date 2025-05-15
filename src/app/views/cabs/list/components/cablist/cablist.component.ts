import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  type TemplateRef,
} from '@angular/core'
import { CablistfilterComponent } from '../cablistfilter/cablistfilter.component'
import { CabalertComponent } from '../cabalert/cabalert.component'
import {
  NgbOffcanvas,
  NgbOffcanvasModule,
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'
import { StickyDirective } from '@/app/directives/sticky.directive'
import { CabCategoriesComponent } from "../cab-categories/cab-categories.component";
import { CommonModule } from '@angular/common'
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider'
import { CarResponse } from '@/app/core/models/cars/car.model'

@Component({
  selector: 'cab-list',
  standalone: true,
  imports: [
    CablistfilterComponent,
    CabalertComponent,
    NgbPaginationModule,
    NgbRatingModule,
    NgbOffcanvasModule,
    RouterModule,
    StickyDirective,
    CabCategoriesComponent,
    CommonModule,
    NgxSliderModule
  ],
  templateUrl: './cablist.component.html',
  styles: `
    :host(cab-list) {
      display: contents !important;
    }
  `,
})
export class CablistComponent implements OnChanges {

  sliderOptions!: Options;

  filters = {
    passengerSeats: new Set<number>(),
    makes: new Set<number>(),
    odometerReadings: new Set<number>(),
    categories: new Set<number>(),
    priceRange: {
      min: 0,
      max: 0
    }
  };

  originalData!: CarResponse;
  filteredData: any[] = [];
  selectedCategoryId: number = 0;

  @Input() data!: CarResponse;

  public renderer = inject(Renderer2)
  public eleRef = inject(ElementRef)
  private offcanvasService = inject(NgbOffcanvas)

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['data'] && this.data) {
      this.originalData = this.data;
      this.filteredData = [...this.originalData.cars];
    }

    this.bindPriceRange();
    this.clearAllFilters();
  }

  openFilter(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' })
  }

  selectCategory(id: number): void {

    if (this.selectedCategoryId === id) {
      this.selectedCategoryId = 0;
      this.filters.categories.clear();
    } else {

      this.selectedCategoryId = id;
      this.filters.categories.clear();
      this.filters.categories.add(id);
    }
    this.applyFilters();
  }


  bindPriceRange() {
    this.filters.priceRange.min = this.data.priceRange.lowestPrice;
    this.filters.priceRange.max = this.data.priceRange.highestPrice;

    this.sliderOptions = {
      floor: this.filters.priceRange.min,
      ceil: this.filters.priceRange.max,
      step: 10
    };
  }

  onCheckboxChange(filterKey: keyof typeof this.filters, value: any, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const set = this.filters[filterKey] as Set<any>;

    if (checkbox.checked) {
      set.add(value);
    } else {
      set.delete(value);
    }

    this.applyFilters();
  }

  applyFilters(): void {
    const { passengerSeats, makes, odometerReadings, priceRange, categories } = this.filters;

    this.filteredData = this.originalData.cars.filter((car: any) => {
      const matchSeats = passengerSeats.size === 0 || passengerSeats.has(car.passengerCapacity);
      const matchMakes = makes.size === 0 || makes.has(car.makeId);
      const matchOdometer = odometerReadings.size === 0 || odometerReadings.has(car.odometerId);
      const matchPrice = car.totalRent >= priceRange.min && car.totalRent <= priceRange.max;
      const matchCategory = categories.size === 0 || categories.has(car.categoryId);

      return matchSeats && matchMakes && matchOdometer && matchPrice && matchCategory;
    });
  }

  clearAllFilters() {
    this.filters.passengerSeats.clear();
    this.filters.makes.clear();
    this.filters.odometerReadings.clear();
    this.filters.categories.clear();
    this.selectedCategoryId = 0;
    this.filters.priceRange.min = this.sliderOptions.floor!;
    this.filters.priceRange.max = this.sliderOptions.ceil!;

    this.applyFilters();
  }

}
