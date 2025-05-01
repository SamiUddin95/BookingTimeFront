import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Stepper from 'bs-stepper';
import { CommonModule } from '@angular/common';

import { CommonService } from '@/app/core/services/api/common.service';
import { PropertyFormDataService } from '@/app/core/services/property-form-data.service';
import { StaysService } from '@/app/core/services/api/stays.service';

@Component({
  selector: 'add-listing-step-2',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './step-2.component.html',
})
export class Step2Component implements OnInit {
  @Input() stepperInstance?: Stepper;

  private commonService = inject(CommonService);
  private propertyService = inject(StaysService);


  constructor(private formDataService: PropertyFormDataService) {}

  listingForm: any = {
    amenities: [],
    beachAccess: [],
    entirePlaces: [],
    facilities: [],
    funThingsToDo: [],
    popularFilter: [],
    propertyType: [],
    propertyAccessibility: [],
    totalFloor: '',
    totalRoom: '',
    roomArea: '',
    rooms: [
      {
        roomName: '',
        roomPrice: '',
        discount: '',
        additionalInfo: '',
        roomAccessibility: [],
        roomFacilities: []
      }
    ]
  };

  amenities: any[] = [];
  beaches: any[] = [];
  entirePlaces: any[] = [];
  facility: any[] = [];
  funThings: any[] = [];
  popular: any[] = [];
  roomAccess: any[] = [];
  roomFacility: any[] = [];
  propertyAccess: any[] = [];
  propertyType: any[] = [];
  additionalInfoList: any[] = [];

  ngOnInit(): void {
    this.loadDropDowns();

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

  onRoomCheckboxChange(event: any, list: any[], item: any) {
    if (event.target.checked) {
      list.push(item);
    } else {
      const index = list.findIndex(x => x.id === item.id);
      if (index !== -1) {
        list.splice(index, 1);
      }
    }
  }
  

  isItemChecked(list: any[], id: any): boolean {
    return list?.some(x => x.id === id);
  }
  
  loadDropDowns() {
    this.commonService.GetAllAmenitiesList().subscribe((res) => {
      this.amenities = res;
    });

    this.propertyService.GetAllBeachAccessList().subscribe((res) => {
      this.beaches = res;
    });

    this.propertyService.GetAllEntirePlacesList().subscribe((res) => {
      this.entirePlaces = res;
    });

    this.propertyService.GetAllFacilityList().subscribe((res) => {
      this.facility = res;
    });

    this.propertyService.GetAllFunThingsToDoList().subscribe((res) => {
      this.funThings = res;
    });

    this.propertyService.GetAllPopularFiltersList().subscribe((res) => {
      this.popular = res;
    });

    this.propertyService.GetAllPropertyAccessibilitiesList().subscribe((res) => {
      this.propertyAccess = res;
    });

    this.propertyService.GetAllPropertyTypeList().subscribe((res) => {
      this.propertyType = res;
    });

    this.propertyService.GetAllRoomAccessList().subscribe((res) => {
      this.roomAccess = res;
    });

    this.propertyService.GetAllRoomFacilityList().subscribe((res) => {
      this.roomFacility = res;
    });

    this.commonService.GetAllAdditionalInfoList().subscribe((res) => {
      this.additionalInfoList = res
    })
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

  onBeachChange(event: any, item: any) {
    if (!Array.isArray(this.listingForm.beachAccess)) {
      this.listingForm.beachAccess = [];
    }

    if (event.target.checked) {
      if (!this.listingForm.beachAccess.includes(item.id)) {
        this.listingForm.beachAccess = [...this.listingForm.beachAccess, item.id];
      }
    } else {
      this.listingForm.amenities = this.listingForm.amenities.filter((id: number) => id !== item.id);
    }
  }

  isBeachSelected(itemId: number): boolean {
    return Array.isArray(this.listingForm.beachAccess) && this.listingForm.beachAccess.includes(itemId);
  }

  onCheckboxChange(event: any, item: any, formField: string) {
    if (!Array.isArray(this.listingForm[formField])) {
      this.listingForm[formField] = [];
    }
  
    if (event.target.checked) {
      const exists = this.listingForm[formField].some((x: any) => x.id === item.id);
      if (!exists) {
        this.listingForm[formField] = [...this.listingForm[formField], { id: item.id }];
      }
    } else {
      this.listingForm[formField] = this.listingForm[formField].filter((x: any) => x.id !== item.id);
    }
  }
  
  
  isItemSelected(itemId: number, formField: string): boolean {
    return Array.isArray(this.listingForm[formField]) &&
           this.listingForm[formField].some((x: any) => x.id === itemId);
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
      image: null,
      roomAccessibility: [],
      roomFacilities: []
    });
  }

  removeRoom(index: number) {
    if (this.listingForm.rooms.length > 1) {
      this.listingForm.rooms.splice(index, 1);
    }
  }
}
