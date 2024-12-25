import { Component } from '@angular/core'
import { roomDetails } from '../../data'
import { LightgalleryModule } from 'lightgallery/angular'
import { SelectFormInputDirective } from '@/app/components/form/select-form-input.directive'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'room-selection',
  standalone: true,
  imports: [LightgalleryModule, SelectFormInputDirective, RouterModule],
  templateUrl: './roomselection.component.html',
  styleUrl: './roomselection.component.scss',
})
export class RoomselectionComponent {
  roomDetails = roomDetails

  settings = {
    counter: false,
    selector: 'a',
  }
}
