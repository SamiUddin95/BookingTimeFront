import { DateFormInputDirective } from '@/app/components/form/date-form-input.directive'
import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { CommonModule } from '@angular/common'
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { CarRentalsService } from '@/app/core/services/api/car-rentals.service'
import { Router } from '@angular/router'

@Component({
  selector: 'home-banner',
  standalone: true,
  imports: [
    SelectFormInputDirective,
    NgbNavModule,
    CommonModule,
    DateFormInputDirective,
    FormsModule
  ],
  templateUrl: './banner.component.html',
  styles: ``,
})
export class BannerComponent implements OnInit {
  activeTab = 'one-way'
  showDropoffLocation = false;
  private router = inject(Router);

  changeTab(tab: string) {
    this.activeTab = tab
  }

  private carService = inject(CarRentalsService)

  locations: any
  @Input() carFilter: any
  @Output() carList = new EventEmitter<any>(); 

  ngOnInit(): void {
    this.loadCities();
  }

  initFilterform() {
    this.carFilter = {
      pickupLocation: 0,
      dropoffLocation: 0,
      pickupDate: '',
      pickupTime: '',
      dropoffDate: '',
      dropoffTime: ''
    };
  }

  loadCities() {
    this.carService.GetCitiesHavingCars().subscribe((res => {
      this.locations = res;
    }))
  }

  search() {
    this.carService.FilteredCarList(this.carFilter).subscribe((res=> {
      this.carList.emit(res);
    }))

  }
}
