import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import { Component, ViewChild } from '@angular/core'
import { LightgalleryModule } from 'lightgallery/angular'
import type { TinySliderSettings } from 'tiny-slider'

@Component({
  selector: 'room-gallery',
  standalone: true,
  imports: [TinySliderComponent, LightgalleryModule],
  templateUrl: './roomgallery.component.html',
  styleUrl: './roomgallery.component.scss',
})
export class RoomgalleryComponent {
  galleryList = [
    'assets/images/gallery/13.jpg',
    'assets/images/gallery/16.jpg',
    'assets/images/gallery/11.jpg',
    'assets/images/gallery/14.jpg',
  ]

  @ViewChild('gallerySlider', { static: false }) gallerySlider: any

  settings = {
    counter: false,
    selector: 'a',
    download: false,
  }

  gallerysliderSetting: TinySliderSettings = {
    autoplay: true,
    edgePadding: 0,
    items: 2,
    controlsText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    controls: true,
    autoplayDirection: 'forward',
    nav: false,
    gutter: 30,
    responsive: {
      1: {
        items: 1,
        gutter: 30,
      },
      768: {
        items: 2,
        gutter: 30,
      },
    },
  }
}
