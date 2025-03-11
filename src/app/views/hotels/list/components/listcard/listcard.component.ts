import { Component, OnInit, ViewChild, inject } from '@angular/core'
import { hotels } from '../../data'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import type { TinySliderSettings } from 'tiny-slider'
import {
  NgbDropdownModule,
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'
import { currency } from '@/app/store'

import { StaysService } from '@/app/core/services/api/stays.service'
import { PropertyDetail } from '@/app/core/models/property-detail.model'

@Component({
  selector: 'list-card',
  standalone: true,
  imports: [
    TinySliderComponent,
    NgbRatingModule,
    NgbDropdownModule,
    NgbPaginationModule,
    RouterModule,
  ],
  templateUrl: './listcard.component.html',
  styles: ``,
})
export class ListcardComponent implements OnInit {
  //hotelList = hotels
  currencyType = currency
  @ViewChild('listSlider', { static: false }) listSlider: any

  listSliderSettings: TinySliderSettings = {
    arrowKeys: true,
    controlsText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    controls: true,
    items: 1,
  }

  ngOnInit(): void {
    this.loadHotels();
  }

  private staysService = inject(StaysService);

  hotelList: any[] = [];

  loadHotels() {
    this.staysService.GetAllProperties().subscribe((res)=> {
      this.hotelList = res;
      console.log(res)
    })
  }
}
