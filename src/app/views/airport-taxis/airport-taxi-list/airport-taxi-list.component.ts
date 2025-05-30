import {
  AirportTaxiDetailsRequestModel,
  TaxiResponseModel,
} from '@/app/core/models/requestModels/register-airport-taxi.model'
import { AirportTaxiFilterService } from '@/app/core/services/airport-taxi-filter.service'
import { AirportTaxisService } from '@/app/core/services/api/airport-taxi.service'
import { CommonService } from '@/app/core/services/api/common.service'
import { CommonModule } from '@angular/common'
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-airport-taxi-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './airport-taxi-list.component.html',
  styleUrl: './airport-taxi-list.component.scss',
})
export class AirportTaxiListComponent implements OnInit {
  private taxiService = inject(AirportTaxisService)
  private filterService = inject(AirportTaxiFilterService)
  @Output() bookNow = new EventEmitter<any>()
  constructor(private router: Router) {}
  taxis: TaxiResponseModel[] = []
  currentPage = 1
  totalCount = 0
  pageSize = 10
  duration: any = null
  distance: any = null
  isTripTypeReturn: boolean = false
  selectedJourney: 'outbound' | 'return' = 'outbound'
  fare1 = 0
  fare2 = 0
  outbound = {
    date: '',
    time: '',
    pickup: '',
    duration: '',
    dropDate: '',
    dropTime: '',
    dropoff: '',
  }

  returnTrip = {
    date: '',
    time: '',
    pickup: '',
    duration: '',
    dropDate: '',
    dropTime: '',
    dropoff: '',
  }

  // ngOnInit(): void {
  //   this.filterService.requestModel$.subscribe(model => {
  //     if (model) {
  //       this.currentPage = model.paginationInfo.page ?? 1;
  //       this.pageSize = model.paginationInfo.pageSize ?? 10;
  //       this.loadTaxis(model);
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.filterService.cityName$.subscribe((cityName: any) => {
      if (cityName) {
        this.loadTaxis(cityName)
      }
    })
  }

  onBookNow(taxi: any) {
    this.getFareForDetails(taxi)
    const outbound = { ...this.outbound, distance: this.distance }
    const returnTrip = { ...this.returnTrip, distance: this.distance }
    const fare = { fare1: this.fare1, fare2: this.fare2 }
    this.filterService.setTaxiData({ taxi, outbound, returnTrip, fare })
    this.router.navigate(['/airport-taxi/taxi-detail'])
  }


  loadTaxis(requestModel: any): void {
    this.taxiService.GetAirportTaxisList(requestModel).subscribe((response) => {
      this.taxis = response
      const [duration, distance] = this.filterService.getDurationAndDistance()
      this.duration = duration
      this.distance = distance
      this.isTripTypeReturn = this.filterService.getTripType() === 'return'
      const model = this.filterService.getModel()

      this.outbound = {
        date: this.formatDate(model.pickUpDateTime),
        time: this.formatTime(model.pickUpDateTime),
        pickup: model.cityId,
        duration: this.duration,
        dropDate: this.formatDate(model.pickUpDateTime),
        dropTime: this.addMinutesToTime(model.pickUpDateTime, this.duration),
        dropoff: model.dropCityId,
      }

      if (model.tripType === 'return' && model.returnDateTime) {
        this.returnTrip = {
          date: this.formatDate(model.returnDateTime),
          time: this.formatTime(model.returnDateTime),
          pickup: model.dropCityId,
          duration: this.duration,
          dropDate: this.formatDate(model.returnDateTime),
          dropTime: this.addMinutesToTime(model.returnDateTime, this.duration),
          dropoff: model.cityId,
        }
      }
    })
  }

  getTaxiImageById(taxiId: number): string {
    const imageMap: { [key: number]: string } = {
      1: 'assets/images/Cars/standard.jpg',
      2: 'assets/images/Cars/exe-sedan.jpg',
      4: 'assets/images/Cars/lux-sedan.jpg',
      5: 'assets/images/Cars/people-carrier.jpg',
      6: 'assets/images/Cars/people-carrier.jpg',
      7: 'assets/images/Cars/exe-people.jpg',
      8: 'assets/images/Cars/minibus.jpg',
    }

    return imageMap[taxiId] || 'assets/images/Cars/standard.jpg'
  }

  vehicleTypeMultipliers: { [key: string]: number } = {
    'Standard Sedan': 0.9,
    'Executive Sedan': 1.0,
    'Luxury Sedan': 1.4,
    'People Carrier': 1.1,
    'Large People Carrier': 1.2,
    'Executive People Carrier': 1.5,
    Minibus: 1.3,
  }

  getFareForDetails(taxi: any): void {
    const distance = parseFloat(this.distance)
    const baseRate = taxi.basePrice
    const multiplier = this.vehicleTypeMultipliers[taxi.name] || 1

    const oneWayFare = baseRate * distance * multiplier
    this.fare1 = oneWayFare
    if (this.isTripTypeReturn) {
      const returnFare = oneWayFare * 0.9
      this.fare2 = returnFare
    }
  }

  getFare(taxi: any): number {
    const distance = parseFloat(this.distance)
    const baseRate = taxi.basePrice
    const multiplier = this.vehicleTypeMultipliers[taxi.name] || 1

    const oneWayFare = baseRate * distance * multiplier
    if (this.isTripTypeReturn) {
      const returnFare = oneWayFare * 0.9
      return Math.round(oneWayFare + returnFare)
    }

    return Math.round(oneWayFare)
  }
  formatDate(datetime: string): string {
    const date = new Date(datetime)
    return date.toDateString()
  }

  formatTime(datetime: string): string {
    const date = new Date(datetime)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  addMinutesToTime(datetime: string, duration: string): string {
    const date = new Date(datetime)
    const match = duration.match(/\d+/) // extract the number of minutes
    const minutes = match ? parseInt(match[0], 10) : 0
    date.setMinutes(date.getMinutes() + minutes)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  removeReturnTrip(): void {
    this.filterService.setRemoveReturn(true)

    this.selectedJourney = 'outbound'
  }
  goToPage(page: number) {
    this.currentPage = page
    this.filterService.requestModel$.subscribe((model) => {
      if (model) {
        const updatedModel = {
          ...model,
          paginationInfo: {
            ...model.paginationInfo,
            page: this.currentPage,
          },
        }
        this.filterService.updateFilter(updatedModel)
      }
    })
  }

  onImageError(event: Event) {
    ;(event.target as HTMLImageElement).src = 'assets/images/Cars/standard.jpg'
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize)
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1)
  }
}
