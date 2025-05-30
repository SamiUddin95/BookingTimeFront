import { TopNavHeaderComponent } from '@/app/components/top-nav-header/top-nav-header.component'
import { Component, inject } from '@angular/core'
import { Footer1Component } from '../../about-us/about/components/footer1/footer1.component'
import { AirportTaxiListComponent } from '../airport-taxi-list/airport-taxi-list.component'
import { BannerComponent } from '../home/components/banner/banner.component'
import { TopbarComponent } from '../home/components/topbar/topbar.component'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { CountryISO } from 'ngx-intl-tel-input'
import { SearchCountryField, NgxIntlTelInputModule } from 'ngx-intl-tel-input'
// import { SearchCountryField } from 'ngx-intl-tel-input';
import { AirportTaxiFilterService } from '@/app/core/services/airport-taxi-filter.service'

@Component({
  selector: 'app-taxi-detail',
  standalone: true,
  imports: [
    Footer1Component,
    TopNavHeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    FormsModule,
    BannerComponent,
    TopbarComponent,
    AirportTaxiListComponent,
  ],
  templateUrl: './taxi-detail.component.html',
  styleUrl: './taxi-detail.component.scss',
})
export class TaxiDetailComponent {
  private filterService = inject(AirportTaxiFilterService)
  CountryISO = CountryISO
  SearchCountryField = SearchCountryField
  searchFields: SearchCountryField[] = [
    SearchCountryField.Name,
    SearchCountryField.Iso2,
  ]
  selectedJourney: 'outbound' | 'return' = 'outbound'
  isTripTypeReturn: boolean = true
  fare1 = 0
  fare2 = 0
  totalFare = 0
  currencySymbol: string = ''
  form: any = {}

  outbound: any = {
    date: '',
    time: '',
    pickup: '',
    dropDate: '',
    dropTime: '',
    dropoff: '',
    duration: '',
  }

  returnTrip: any = {
    date: '',
    time: '',
    pickup: '',
    dropDate: '',
    dropTime: '',
    dropoff: '',
    duration: '',
  }

  taxi: any
  ngOnInit(): void {
    this.filterService.taxiData$.subscribe((data) => {
      if (data) {
        this.taxi = data.taxi
        this.currencySymbol = data.taxi.currencySymbol || ''
        this.outbound = data.outbound
        this.returnTrip = data.returnTrip
        this.isTripTypeReturn = !!this.returnTrip?.date?.trim()
        this.fare1 = Math.round(data.fare.fare1)
        this.fare2 = Math.round(data.fare.fare2)
        this.totalFare = this.fare1 + this.fare2
      }
    })
  }
}
