import { Component, Input, OnInit, ViewChild, inject } from '@angular/core'
import { hotels } from '../../data'
import type { TinySliderSettings } from 'tiny-slider'
import {
  NgbDropdownModule,
  NgbPaginationModule,
  NgbRatingModule,
} from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'
import { currency } from '@/app/store'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'list-card',
  standalone: true,
  imports: [
    NgbRatingModule,
    NgbDropdownModule,
    NgbPaginationModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './listcard.component.html',
  styles: ``,
})
export class ListcardComponent {

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
  
  @Input() hotelList: any = {};


}
