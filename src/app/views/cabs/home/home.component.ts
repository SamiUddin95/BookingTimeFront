import { Component, inject } from '@angular/core'
import { TopbarComponent } from './components/topbar/topbar.component'
import { BannerComponent } from './components/banner/banner.component'
import { VehiclesComponent } from './components/vehicles/vehicles.component'
import { WhychooseComponent } from './components/whychoose/whychoose.component'
import { FaqsComponent } from './components/faqs/faqs.component'
import { ClientComponent } from './components/client/client.component'
import { ActionBoxComponent } from './components/action-box/action-box.component'
import { Footer1Component } from '../../hotels/home/components/footer1/footer1.component'
import { TopNavHeaderComponent } from "../../../components/top-nav-header/top-nav-header.component";
import { CablistComponent } from "../list/components/cablist/cablist.component";
import { CarRentalsService } from '@/app/core/services/api/car-rentals.service'
import { ActivatedRoute, Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { CommonModule } from '@angular/common'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { DateFormInputDirective } from '@/app/components/form/date-form-input.directive'


@Component({
  selector: 'cab-home',
  standalone: true,
  imports: [
    TopbarComponent,
    BannerComponent,
    VehiclesComponent,
    WhychooseComponent,
    FaqsComponent,
    ClientComponent,
    ActionBoxComponent,
    Footer1Component,
    TopNavHeaderComponent,
    CablistComponent,
    FormsModule,
    NgbNavModule,
    CommonModule,
    DateFormInputDirective,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styles: ``,
})
export class HomeComponent {
  showDropoffLocation = false;
  showList = false;
  private router = inject(Router);
  private route = inject(ActivatedRoute)


  private carService = inject(CarRentalsService)

  locations: any
  carFilter: any
  carList: any

  ngOnInit(): void {
    this.initFilterform();
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
    this.carService.FilteredCarList(this.carFilter).subscribe((res) => {
      this.carList = res;
      this.showList = true
    });
  }
}
