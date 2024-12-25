import { Component } from '@angular/core'
import { AvailabilityFilterComponent } from '../availability-filter/availability-filter.component'
import { LightgalleryModule } from 'lightgallery/angular'
import lgVideo from 'lightgallery/plugins/video'

@Component({
  selector: 'home-hero',
  standalone: true,
  imports: [AvailabilityFilterComponent, LightgalleryModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  settings = {
    counter: false,
    download: false,
    controls: false,
    dynamic: false,
    plugins: [lgVideo],
    selector: 'a',
  }
}
