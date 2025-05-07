import { Component, ElementRef, Input, ViewChild, viewChild } from '@angular/core'
import { LightgalleryModule } from 'lightgallery/angular'
import { NgxSplideComponent, NgxSplideModule } from 'ngx-splide'
import { galleryImages, thumbNailImages } from '../../data'
import lgVideo from 'lightgallery/plugins/video'
import lgZoom from 'lightgallery/plugins/zoom'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { PricingComponent } from '../pricing/pricing.component'

@Component({
  selector: 'detail-hero',
  standalone: true,
  imports: [NgxSplideModule, LightgalleryModule, NgbDropdownModule, PricingComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  galleryImages = galleryImages
  thumbNailImages = thumbNailImages
  selectedImageIndex = 1
  @ViewChild('mainSplide') mainSplide!: NgxSplideComponent

  settings = {
    counter: false,
    plugins: [lgVideo],
    download: false,
    selector: 'a',
  }

  @Input() attraction: any;
}
