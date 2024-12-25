import { Component } from '@angular/core'
import { hotel } from '../../data'
import { LightgalleryModule } from 'lightgallery/angular'
import { CommonModule } from '@angular/common'
import { currency } from '@/app/store'

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [LightgalleryModule, CommonModule],
  templateUrl: './hotel-detail.component.html',
  styleUrl: './hotel-detail.component.scss',
})
export class HotelDetailComponent {
  hotelData = hotel
  currencyType = currency
  setting = {
    download: false,
    counter: false,
    loop: true,
    selector: 'a',
  }
}
