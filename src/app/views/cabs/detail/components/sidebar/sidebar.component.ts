import { StickyDirective } from '@/app/directives/sticky.directive'
import { currency } from '@/app/store'

import { Component, Input } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'detail-sidebar',
  standalone: true,
  imports: [RouterModule, StickyDirective],
  templateUrl: './sidebar.component.html',
  styles: `
    :host(detail-sidebar) {
      display: contents !important;
    }
  `,
})
export class SidebarComponent {

  @Input() deal: any
  
  currencyType = currency
}
