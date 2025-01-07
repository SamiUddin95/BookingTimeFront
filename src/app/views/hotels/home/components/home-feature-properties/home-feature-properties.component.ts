import { Component } from '@angular/core';
import { featuredHotelsData, featuredPropertiesData } from '../../data'
import { currency } from '@/app/store'

@Component({
  selector: 'app-home-feature-properties',
  standalone: true,
  imports: [],
  templateUrl: './home-feature-properties.component.html',
  styleUrl: './home-feature-properties.component.scss'
})
export class HomeFeaturePropertiesComponent {
  properties = featuredHotelsData
  currencyType = currency
}
