import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import { Component, ViewChild } from '@angular/core'
import { LightgalleryModule } from 'lightgallery/angular'
import lgVideo from 'lightgallery/plugins/video'
import { TinySliderSettings } from 'tiny-slider'
import { testimonialSlides } from '../../data'

@Component({
  selector: 'tour-stories',
  standalone: true,
  imports: [LightgalleryModule, TinySliderComponent],
  templateUrl: './tour-stories.component.html',
  styleUrl: './tour-stories.component.scss',
})
export class TourStoriesComponent {
  testimonialSlides = testimonialSlides
  settings = {
    counter: false,
    plugins: [lgVideo],
    selector: 'a',
    download: false,
  }

  @ViewChild('testimonialSlider', { static: false }) testimonialSlider: any

  testimonialSliderSettings: TinySliderSettings = {
    arrowKeys: true,
    controlsText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    controls: true,
    items: 1,
    autoplay: true,
  }
}
