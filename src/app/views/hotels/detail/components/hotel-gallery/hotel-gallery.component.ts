import { PropertyDetailsModelResponseModel } from '@/app/core/models/property-detail-model.model'
import { Component, inject, Input, type TemplateRef } from '@angular/core'
import { CommonModule } from '@angular/common';
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
    CommonModule,
    NgbModalModule,
  ],
  templateUrl: './hotel-gallery.component.html',
  styleUrl: './hotel-gallery.component.scss',
})
export class HotelGalleryComponent {
  staticAlert = true

  private modalService = inject(NgbModal)

  @Input() data: PropertyDetailsModelResponseModel = {
    rooms: []
  };

  settings = {
    counter: false,
    download: false,
    selector: 'a',
    loop: false,
  }

  getThumbnail() {
    return this.data?.thumbnail || []
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'lg', centered: true })
  }
  
}
