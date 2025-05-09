import {
  Component,
  inject,
  ViewChild,
  type TemplateRef,
  Input,
} from '@angular/core'
import { hotelRooms, type HotelsRoomType } from '../../data'
import { TinySliderComponent } from '@/app/components/tiny-slider/tiny-slider.component'
import type { TinySliderSettings } from 'tiny-slider'
import { CommonModule } from '@angular/common'
import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap'
import { currency } from '@/app/store'
import {
  PropertyDetailsModelResponseModel,
  RoomDetailModel,
} from '@/app/core/models/property-detail-model.model'

@Component({
  selector: 'detail-room',
  standalone: true,
  imports: [
    TinySliderComponent,
    CommonModule,
    SelectFormInputDirective,
    NgbModalModule,
  ],
  templateUrl: './room.component.html',
  styles: `
    :host(detail-room) {
      display: contents !important;
    }
  `,
})
export class RoomComponent {
  @Input() data: PropertyDetailsModelResponseModel = {
    rooms: [],
  }
  expandedFacilities: { [roomId: number]: boolean } = {}
  @ViewChild('roomDetail', { static: true }) roomDetail!: TemplateRef<any>

  get roomList() {
    return this.data?.rooms || []
  }
  currencyType = currency
  hotelroomDetail: RoomDetailModel | null = null

  getRoomImages(roomId: number) {
    return this.data?.roomImageList?.filter((img) => img.roomId === roomId) || []
  }
  
 

  getRoomfacilities(roomId: number) {
    return (
      this.data?.roomFacilities?.filter(
        (facility) => facility.roomId === roomId
      ) || []
    )
  }

  getroomAccessibility(roomId: number) {
    return (
      this.data?.roomAccessibility?.filter(
        (access) => access.roomId === roomId
      ) || []
    )
  }

  toggleFacilities(roomId: number): void {
    this.expandedFacilities[roomId] = !this.expandedFacilities[roomId]
  }

  isExpanded(roomId: number): boolean {
    return this.expandedFacilities[roomId]
  }

  private modalService = inject(NgbModal)

  roomSliderStting: TinySliderSettings = {
    autoplay: true,
    nav: false,
    items: 1,
    controls: true,
    controlsText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
  }

  openDetail(content: TemplateRef<any>, roomId: number) {
    this.hotelroomDetail =
      this.data?.rooms.find((room) => room.id === roomId) || null
    if (this.hotelroomDetail) {
      this.modalService.open(content, { centered: true })
    }
  }
}
