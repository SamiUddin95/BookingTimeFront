import { Component, ViewChild } from '@angular/core'
import { testimonialReviewSlides } from '../../data'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import type { TinySliderSettings } from 'tiny-slider'
import { LightgalleryModule } from 'lightgallery/angular'

@Component({
  selector: 'resort-gallery',
  standalone: true,
  imports: [TinySliderComponent, LightgalleryModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  testimonialReviewSlides = testimonialReviewSlides

  imageList = [
    'assets/images/category/hotel/resort/06.jpg',
    'assets/images/category/hotel/resort/05.jpg',
    'assets/images/category/hotel/resort/06.jpg',
  ]

  @ViewChild('gallerySlider', { static: false }) gallerySlider: any
  @ViewChild('testimonialSlider', { static: false }) testimonialSlider: any

  testimonialSliderSettings: TinySliderSettings = {
    arrowKeys: true,
    controlsText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    autoplay: true,
    controls: true,
    items: 1,
    autoplayDirection: 'forward',
    gutter: 2,
  }

  gallerySliderSettings: TinySliderSettings = {
    arrowKeys: true,
    controlsText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    controls: true,
    items: 1,
    gutter: 2,
  }

  settings = {
    counter: false,
    selector: 'a',
    download: false,
  }
}
