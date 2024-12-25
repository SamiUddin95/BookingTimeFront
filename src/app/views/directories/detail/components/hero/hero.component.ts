import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import { Component, ViewChild } from '@angular/core'
import { LightgalleryModule } from 'lightgallery/angular'
import lgZoom from 'lightgallery/plugins/zoom'
import { TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'detail-hero',
  standalone: true,
  imports: [TinySliderComponent, LightgalleryModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  @ViewChild('heroDetail', { static: false }) bannerSlider: any

  settings = {
    counter: false,
    download: false,
    selector: 'a',
  }

  heroDetailSliderSettings: TinySliderSettings = {
    autoplayButton: false,
    autoplayButtonOutput: false,
    autoplay: true,
    controls: true,
    edgePadding: 0,
    items: 3,
    gutter: 0,
    nav: false,
    controlsText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      1: {
        items: 1,
      },
      576: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  }
}
