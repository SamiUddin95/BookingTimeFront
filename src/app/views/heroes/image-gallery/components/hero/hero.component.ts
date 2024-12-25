import { Component } from '@angular/core'
import { LightgalleryModule } from 'lightgallery/angular'
import lgVideo from 'lightgallery/plugins/video'

@Component({
  selector: 'image-gallery-hero',
  standalone: true,
  imports: [LightgalleryModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  settings = {
    counter: false,
    download: false,
    selector: 'a',
    loop: false,
    plugins: [lgVideo],
  }
}
