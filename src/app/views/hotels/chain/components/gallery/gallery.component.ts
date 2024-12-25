import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import { Component, ViewChild } from '@angular/core'
import { LightgalleryModule } from 'lightgallery/angular'
import type { TinySliderSettings } from 'tiny-slider'
import { gallerydata } from '../../data'
import lgVideo from 'lightgallery/plugins/video'

@Component({
  selector: 'chain-gallery',
  standalone: true,
  imports: [TinySliderComponent, LightgalleryModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  imagesList = gallerydata

  @ViewChild('gallerySlider', { static: false }) offerSlider: any

  settings = {
    counter: false,
    plugins: [lgVideo],
    selector: 'a',
  }

  gallerySliderSettings: TinySliderSettings = {
    controlsText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    // autoplay: true,
    controls: true,
    items: 6,
    autoplayDirection: 'forward',
    nav: false,
    responsive: {
      1: {
        items: 2,
        gutter: 10,
      },
      768: {
        items: 4,
        gutter: 10,
      },
      992: {
        items: 4,
        gutter: 30,
      },
      1200: {
        items: 6,
        gutter: 30,
      },
    },
  }
}
