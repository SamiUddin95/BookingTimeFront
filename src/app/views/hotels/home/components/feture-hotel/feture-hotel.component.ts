import { Component, OnInit, inject } from '@angular/core'
import { bestHotelProviderThumbnails } from '../../data'
import { currency } from '@/app/store'
import { RouterModule } from '@angular/router'
import { StaysService } from '@/app/core/services/api/stays.service'

@Component({
  selector: 'home-feture-hotel',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './feture-hotel.component.html',
  styleUrl: `./feture-hotel.component.scss`,
})
export class FetureHotelComponent {
  hotels = bestHotelProviderThumbnails.slice(0, 4)
  currencyType = currency
}
