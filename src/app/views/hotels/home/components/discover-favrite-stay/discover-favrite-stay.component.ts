import { Component } from '@angular/core';
import { featuredHotelsData } from '../../data'
import { currency } from '@/app/store'

@Component({
  selector: 'app-discover-favrite-stay',
  standalone: true,
  imports: [],
  templateUrl: './discover-favrite-stay.component.html',
  styleUrl: './discover-favrite-stay.component.scss'
})
export class DiscoverFavriteStayComponent {
  properties = featuredHotelsData
  currencyType = currency
}