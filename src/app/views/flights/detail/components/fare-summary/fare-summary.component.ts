import { StickyDirective } from '@/app/directives/sticky.directive'
import { currency } from '@/app/store'
import { Component } from '@angular/core'
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'detail-fare-summary',
  standalone: true,
  imports: [StickyDirective, NgbPopoverModule],
  templateUrl: './fare-summary.component.html',
  styles: ``,
})
export class FareSummaryComponent {
  currencyType = currency
}
