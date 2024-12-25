import { Component } from '@angular/core'
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { directoryDeals, sliderItems } from '../../data'
import { LightgalleryModule } from 'lightgallery/angular'
import { CommonModule } from '@angular/common'
import { currency } from '@/app/store'

@Component({
  selector: 'detail-tab',
  standalone: true,
  imports: [NgbNavModule, LightgalleryModule, CommonModule, NgbDropdownModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
})
export class TabComponent {
  sliderItems = sliderItems
  directoryDeals = directoryDeals
  currencyType = currency
  settings = {
    counter: false,
    download: false,
    selector: 'a',
  }
}
