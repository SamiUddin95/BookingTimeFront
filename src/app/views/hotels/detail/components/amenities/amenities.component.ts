import { Component, Input } from '@angular/core'
import { amenities } from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'detail-amenities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amenities.component.html',
  styles: `
    :host(detail-amenities) {
      display: contents !important;
    }
  `,
})
export class AmenitiesComponent {

  @Input() data: any = {}; 
}
