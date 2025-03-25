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

@Component({
  selector: 'add-listing-step-3',
  standalone: true,
  imports: [CommonModule, QuillEditorComponent, FormsModule],
  templateUrl: './step-3.component.html',
  styles: ``,
})
export class Step3Component {
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
    }
  }
  category = {
    currencyId: 0,
    basePrice: 0,
    discount: 0,
    ratingId: 0,
    policyDesc: '',
  }

  currencies = [
    { id: 0, name: 'Select Currency' },
    { id: 1, name: 'USD' },
    { id: 2, name: 'EURO' },
    { id: 3, name: 'VND' },
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
    console.log(this.category, 'data')
    this.api.AddListingProperty(formData).subscribe({
      next: (res) => {
        if (res.success === true) {
          alert("Successfully Created"); 
          this.formDataService.resetFormData();
          // this.router.navigate(['listings/added']);
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

    if (Array.isArray(formDataJson.page2?.amenities)) {
      formDataJson.page2.amenities.forEach((amenityId: any, index: number) => {
        formData.append(`Amenities[${index}].AmenitiesId`, String(amenityId))
      })
    }

    if (Array.isArray(formDataJson.page2?.rooms)) {
      formDataJson.page2.rooms.forEach((room: any, index: number) => {
        formData.append(`Rooms[${index}].name`, room.roomName?.trim() || '')
        formData.append(`Rooms[${index}].price`, String(room.roomPrice))
        formData.append(`Rooms[${index}].discount`, String(room.discount))
        formData.append(
          `Rooms[${index}].additionalInfoId`,
          room.additionalInfo?.trim() || ''
        )

        const roomImage = this.formDataService.getRoomImage(index)
        if (roomImage) {
          formData.append(`Rooms[${index}].image`, roomImage, roomImage.name)
        }
      })
    }

    console.log('FormData:', formData)

    return formData
  }
}
