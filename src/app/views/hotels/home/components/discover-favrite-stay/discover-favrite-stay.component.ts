import { Component, ViewChild } from '@angular/core';
import { discoverStay } from '../../data'
import { currency } from '@/app/store'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import type { TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'app-discover-favrite-stay',
  standalone: true,
  imports: [TinySliderComponent],
  templateUrl: './discover-favrite-stay.component.html',
  styleUrl: './discover-favrite-stay.component.scss'
})
export class DiscoverFavriteStayComponent {
  properties = discoverStay
  currencyType = currency

  @ViewChild('testimonialSlider', { static: false }) testimonialSlider: any

  testimonialSliderSettings: TinySliderSettings = {
    arrowKeys: true,
    controlsText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    controls: true,
    items: 4,
    autoplay: true,
  }
}
