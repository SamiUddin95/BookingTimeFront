import { Component, inject, type TemplateRef } from '@angular/core'
import {
  NgbAlertModule,
  NgbDropdownModule,
  NgbModal,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap'
import { LightgalleryModule } from 'lightgallery/angular'

@Component({
  selector: 'detail-hotel-gallery',
  standalone: true,
  imports: [
    NgbDropdownModule,
    NgbAlertModule,
    LightgalleryModule,
    NgbModalModule,
  ],
  templateUrl: './hotel-gallery.component.html',
  styleUrl: './hotel-gallery.component.scss',
})
export class HotelGalleryComponent {
  staticAlert = true

  private modalService = inject(NgbModal)

  settings = {
    counter: false,
    download: false,
    selector: 'a',
    loop: false,
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'lg', centered: true })
  }
}
