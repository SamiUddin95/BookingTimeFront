import { Component } from '@angular/core'
import { featuredHotelsData } from '../../data'
import { currency } from '@/app/store'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'home-feture-hotel',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './feture-hotel.component.html',
  styleUrl: `./feture-hotel.component.scss`,
})
export class FetureHotelComponent {
  hotels = featuredHotelsData.slice(0, 4)
  currencyType = currency
}
