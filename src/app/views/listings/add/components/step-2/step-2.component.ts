import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Stepper from 'bs-stepper';
import { CommonModule } from '@angular/common';

import { CommonService } from '@/app/core/services/api/common.service';
import { PropertyFormDataService } from '@/app/core/services/property-form-data.service';

@Component({
  selector: 'add-listing-step-2',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './step-2.component.html',
})
export class Step2Component implements OnInit {
  @Input() stepperInstance?: Stepper;

  private commonService = inject(CommonService);

  constructor(private formDataService: PropertyFormDataService) {}

  listingForm: any = {
    amenities: [],
    totalFloor: '',
    totalRoom: '',
    roomArea: '',
    rooms: []
  };

  amenities: any[] = [];

  ngOnInit(): void {
    this.loadAmenities();

    const formData = this.formDataService.getFormData()?.page2;
    if (formData) {
      this.listingForm = { ...this.listingForm, ...formData };
    }

    if (!Array.isArray(this.listingForm.rooms) || this.listingForm.rooms.length === 0) {
      this.listingForm.rooms = [
        {
          roomName: '',
          roomPrice: 0,
          discount: 0,
          additionalInfo: '',
          image: null
        }
      ];
    }
  }

  loadAmenities() {
    this.commonService.GetAllAmenitiesList().subscribe((res) => {
      this.amenities = res;
    });
  }

  onAmenityChange(event: any, amenity: any) {
    if (!Array.isArray(this.listingForm.amenities)) {
      this.listingForm.amenities = [];
    }

    if (event.target.checked) {
      if (!this.listingForm.amenities.includes(amenity.id)) {
        this.listingForm.amenities = [...this.listingForm.amenities, amenity.id];
      }
    } else {
      this.listingForm.amenities = this.listingForm.amenities.filter((id: number) => id !== amenity.id);
    }
  }

  isAmenitySelected(amenityId: number): boolean {
    return Array.isArray(this.listingForm.amenities) && this.listingForm.amenities.includes(amenityId);
  }

  goToNext() {
    this.formDataService.updateFormData('page2', this.listingForm);
    this.stepperInstance?.next();
  }

  goToPrevious() {
    this.formDataService.updateFormData('page2', this.listingForm);
    this.stepperInstance?.previous();
  }

  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];

    if (file) {
      this.formDataService.setRoomImage(index, file);
    }
  }

  addRoom() {
    this.listingForm.rooms.push({
      roomName: '',
      roomPrice: 0,
      discount: 0,
      additionalInfo: '',
      image: null
    });
  }

  removeRoom(index: number) {
    if (this.listingForm.rooms.length > 1) {
      this.listingForm.rooms.splice(index, 1);
    }
  }
}
