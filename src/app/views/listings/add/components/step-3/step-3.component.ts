import { Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import Stepper from 'bs-stepper'
import { QuillEditorComponent } from 'ngx-quill'
import { AppServiceService } from '@/app/services/app-service.service'
import { CommonModule } from '@angular/common'
import { CommonService } from '@/app/core/services/api/common.service'
import { PropertyFormDataService } from '@/app/core/services/property-form-data.service'
import { StaysService } from '@/app/core/services/api/stays.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'add-listing-step-3',
  standalone: true,
  imports: [CommonModule, QuillEditorComponent, FormsModule],
  templateUrl: './step-3.component.html',
  styles: ``,
})
export class Step3Component {
  private sub!: Subscription;
  constructor(
    private app: AppServiceService,
    private router: Router,
    private commonService: CommonService,
    private api: StaysService,
    private formDataService: PropertyFormDataService
  ) {}

  @Input() stepperInstance?: Stepper

  ngOnInit(): void {

    this.loadRating()
    const storedData = this.formDataService.getFormData().page3
    if (storedData) {
      this.category = storedData
    }else{
      this.category.discount=0;
    }
    this.sub = this.formDataService.countryChanged$.subscribe((countryId) => {
      if (countryId) {
        this.loadCurrencies(countryId);
      }
    });

  }
  category = {
    currencyId: 0,
    basePrice: 0,
    discount: 0,
    ratingId: 0,
    policyDesc: '',
  }
  loadCurrencies(countryId: any) 
  {
    this.commonService.GetCurrencyBycountryId(countryId).subscribe((res) => {
      this.currencies=res
    })
  }
  currencies:any = [
    { id: 0, name: 'Select Currency' },
  ]

  editorConfig = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['color', 'background'],
      ['code-block'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  }

  isFormValid: boolean = false

  validateForm() {
    this.isFormValid =
      this.category.currencyId !== 0 &&
      this.category.basePrice !== null &&
      this.category.basePrice > 0 &&
      this.category.discount !== null &&
      this.category.discount >= 0 &&
      this.category.ratingId !== 0
  }

  states: any[] = []
  rating: any[] = []

  loadRating() {
    this.commonService.GetAllRatingsList().subscribe((res) => {
      this.rating = res
      this.rating = res.map((item: any) => ({
        id: item.id,
        name:
          '★'.repeat(Number(item.ratings)) +
          '☆'.repeat(5 - Number(item.ratings)),
      }))
    })


  }

  goToPrevious() {
    this.formDataService.updateFormData('page3', this.category)
    this.stepperInstance?.previous()
  }
  addDataStepThree() {
    if (!this.isFormValid) return
    this.formDataService.updateFormData('page3', this.category)
    const formData = this.prepareFormData()
    // for (const [key, value] of (formData as any).entries()) {
    //   console.log(`${key}:`, value);
    // }
    // console.log(this.category, 'data')
    this.api.AddListingProperty(formData).subscribe({
      next: (res) => {
        if (res.success === true) {
          alert("Successfully Created"); 
          this.formDataService.resetFormData();
          this.router.navigate(['hotels/list']);
        } else {
          alert(res.Message || "An unexpected issue occurred.");
        }
        console.log("Response:", res);
      },
      error: (err) => {
    
        if (err.status === 400 && err?.message) {
          alert(err.message);
        } else if (err.status === 500) {
          alert("Server Error: Please try again later.");
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      }
    });
    
  }
  prepareFormData(): FormData {
    const formData = new FormData()
    const formDataJson = this.formDataService.getFormData()

    console.log('Full formDataJson:', formDataJson)

    // Define requestData
    const requestData: any = {
      ListTypeId: Number(formDataJson.page1?.listingTypeId) || 0,
      ListName: formDataJson.page1?.listingName?.trim() || '',
      UsageType: formDataJson.page1?.guestOption?.trim() || '',
      ShortDesc: formDataJson.page1?.description?.trim() || '',
      CountryId: Number(formDataJson.page1?.countryId) || 0,
      StateId: Number(formDataJson.page1?.stateId) || 0,
      CityId: Number(formDataJson.page1?.cityId) || 0,
      PostalCode: formDataJson.page1?.postalNumber?.trim() || '',
      Street: formDataJson.page1?.street?.trim() || '',
      Latitude: formDataJson.page1?.latitude?.trim() || '',
      Longitude: formDataJson.page1?.longitude?.trim() || '',
      LongDesc: formDataJson.page1?.description?.trim() || '',
      TotalFloor: formDataJson.page2?.totalFloor?.trim() || '',
      TotalRoom: formDataJson.page2?.totalRoom?.trim() || '',
      RoomArea: formDataJson.page2?.roomArea?.trim() || '',
      CurrencyId: Number(formDataJson.page3?.currencyId) || 0,
      BasePrice: Number(formDataJson.page3?.basePrice) || 0,
      Discount: Number(formDataJson.page3?.discount) || 0,
      PolicyDesc: formDataJson.page3?.policyDesc?.trim() || '',
      CancellationOption: '1',
      Charges: 444,
      RatingId: Number(formDataJson.page3?.ratingId) || 0,
    }

    console.log('Prepared requestData:', requestData)

    Object.keys(requestData).forEach((key) => {
      formData.append(key, String(requestData[key]))
    })

    const thumbnailFile = this.formDataService.getThumbnail()
    if (thumbnailFile) {
      formData.append('Thumbnail', thumbnailFile, thumbnailFile.name)
    }

    if (Array.isArray(formDataJson.page2?.amenities)) {//
      formDataJson.page2.amenities.forEach((amenityId: any, index: number) => {
        formData.append(`Amenities[${index}].AmenitiesId`, String(amenityId))
      })
    }
debugger
    if (Array.isArray(formDataJson.page2?.beaches)) {
      formDataJson.page2.beaches.forEach((beach: any, index: number) => {
        formData.append(`BeachAccess[${index}].id`, String(beach.id));
      });
    }
  
    // Map entirePlaces
    if (Array.isArray(formDataJson.page2?.entirePlaces)) {//
      formDataJson.page2.entirePlaces.forEach((place: any, index: number) => {
        formData.append(`EntirePlaces[${index}].id`, String(place.id));
      });
    }
  
    // Map facilities
    if (Array.isArray(formDataJson.page2?.facility)) {//
      formDataJson.page2.facility.forEach((facility: any, index: number) => {
        formData.append(`Facilities[${index}].id`, String(facility.id));
      });
    }
  
    // Map funThingsToDo
    if (Array.isArray(formDataJson.page2?.funthing)) {//
      formDataJson.page2.funthing.forEach((thing: any, index: number) => {
        formData.append(`FunThingsToDo[${index}].id`, String(thing.id));
      });
    }
  
    // Map popularFilter
    if (Array.isArray(formDataJson.page2?.popular)) {//
      formDataJson.page2.popular.forEach((filter: any, index: number) => {
        formData.append(`PopularFilter[${index}].id`, String(filter.id));
      });
    }
  
    // Map propertyType
    if (Array.isArray(formDataJson.page2?.propertyType)) {//
      formDataJson.page2.propertyType.forEach((type: any, index: number) => {
        formData.append(`PropertyType[${index}].id`, String(type.id));
      });
    }
  
    // Map propertyAccessibility
    if (Array.isArray(formDataJson.page2?.propertyAccess)) {//
      formDataJson.page2.propertyAccess.forEach((accessibility: any, index: number) => {
        formData.append(`PropertyAccessibility[${index}].id`, String(accessibility.id));
      });
    }

    if (Array.isArray(formDataJson.page2?.rooms)) {
      formDataJson.page2.rooms.forEach((room: any, roomIndex: number) => {
        formData.append(`Rooms[${roomIndex}].name`, room.roomName?.trim() || '')
        formData.append(`Rooms[${roomIndex}].price`, String(room.roomPrice))
        formData.append(`Rooms[${roomIndex}].discount`, String(room.discount))
        formData.append(
          `Rooms[${roomIndex}].additionalInfoId`,
          room.additionalInfo?.trim() || ''
        )
        if (Array.isArray(room.roomAccessibility)) {
          room.roomAccessibility.forEach((access: any, index: number) => {//
            formData.append(`Rooms[${roomIndex}].roomAccessibility[${index}].id`, String(access.id));
          });
        }
  
        // Map room facilities
        if (Array.isArray(room.roomFacilities)) {
          room.roomFacilities.forEach((facility: any, index: number) => {//
            formData.append(`Rooms[${roomIndex}].roomFacilities[${index}].id`, String(facility.id));
          });
        }
        const roomImage = this.formDataService.getRoomImage(roomIndex)
        if (roomImage) {
          formData.append(`Rooms[${roomIndex}].image`, roomImage, roomImage.name)
        }
      })
    }
    return formData
  }
}
