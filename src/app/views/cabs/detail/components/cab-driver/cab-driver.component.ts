import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import { currency } from '@/app/store'
import { Component, ViewChild } from '@angular/core'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'
import { LightgalleryModule } from 'lightgallery/angular'
import type { TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'detail-cab-driver',
  standalone: true,
  imports: [LightgalleryModule, TinySliderComponent, NgbAlertModule],
  templateUrl: './cab-driver.component.html',
  styleUrl: './cab-driver.component.scss',
})
export class CabDriverComponent {
  @ViewChild('carSlider', { static: false }) carSlider: any
  currencyType = currency
  carSliderSetting: TinySliderSettings = {
    arrowKeys: true,
    autoplayButton: false,
    autoplayButtonOutput: false,
    nested: 'inner',
    controlsText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    autoplay: true,
    controls: true,
    edgePadding: 2,
    items: 3,
    autoplayDirection: 'forward',
    nav: false,
    responsive: {
      1: {
        items: 2,
        gutter: 10,
      },
      768: {
        items: 3,
        gutter: 30,
      },
      992: {
        items: 3,
        gutter: 30,
      },
      1200: {
        items: 3,
        gutter: 30,
      },
    },
  }

  setting = {
    download: false,
    counter: false,
    loop: false,
    selector: 'a',
  }
}
