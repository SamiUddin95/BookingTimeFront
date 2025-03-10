import { Component, inject, Input, OnInit } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import Stepper from 'bs-stepper'
import { CommonModule } from '@angular/common'

import { CommonService } from '@/app/core/services/api/common.service'

@Component({
  selector: 'add-listing-step-2',
  standalone: true,
  imports: [ FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './step-2.component.html',
})
export class Step2Component implements OnInit {
  @Input() stepperInstance?: Stepper

  private commonService = inject(CommonService);

  ngOnInit(): void {
    this.loadAmneties();
  }

  amenities: any[] = [];
  selectedAmenities: any[] = [];

  loadAmneties() {
    this.commonService.GetAllAmenitiesList().subscribe((res)=> {
      this.amenities = res;
    })
  }

  onAmenityChange(event: any, amenity: any) {
    if (event.target.checked) {
      this.selectedAmenities.push({ amenitiesId: amenity.id });
    } else {
      this.selectedAmenities = this.selectedAmenities.filter(item => item.amenitiesId !== amenity.id);
    }
  }

  goToNext() {
    console.log(this.selectedAmenities)
  }

}
