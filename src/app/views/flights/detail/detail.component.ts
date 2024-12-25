import { Component } from '@angular/core'
import { CancellationChargesComponent } from './components/cancellation-charges/cancellation-charges.component'
import { FareSummaryComponent } from './components/fare-summary/fare-summary.component'
import { FlightDetailsComponent } from './components/flight-details/flight-details.component'
import { FlightInformationComponent } from './components/flight-information/flight-information.component'
import { TopbarComponent } from './components/topbar/topbar.component'
import { Footer1Component } from './components/footer1/footer1.component'

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    TopbarComponent,
    CancellationChargesComponent,
    FareSummaryComponent,
    FlightDetailsComponent,
    FlightInformationComponent,
    Footer1Component,
  ],
  templateUrl: './detail.component.html',
  styles: ``,
})
export class DetailComponent {}
