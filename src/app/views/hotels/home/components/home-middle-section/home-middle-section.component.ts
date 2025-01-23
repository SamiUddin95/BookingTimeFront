import { Component } from '@angular/core';
import { middlesctionData, featuredPropertiesData } from '../../data'
import { currency } from '@/app/store'

@Component({
  selector: 'app-home-middle-section',
  standalone: true,
  imports: [],
  templateUrl: './home-middle-section.component.html',
  styleUrl: './home-middle-section.component.scss'
})
export class HomeMiddleSectionComponent {
  properties = middlesctionData
  currencyType = currency
}
