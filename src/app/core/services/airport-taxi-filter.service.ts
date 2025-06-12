import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { AirportTaxiDetailsRequestModel } from '@/app/core/models/requestModels/register-airport-taxi.model'

@Injectable({
  providedIn: 'root',
})
export class AirportTaxiFilterService {
  private requestModelSubject =
    new BehaviorSubject<AirportTaxiDetailsRequestModel | null>(null)
  requestModel$ = this.requestModelSubject.asObservable()

  private isRemoveReturnSubject = new BehaviorSubject<boolean>(false)
  isRemoveReturn$ = this.isRemoveReturnSubject.asObservable()

  private showNotFoundErrorSubject = new BehaviorSubject<boolean>(false)
  showNotFoundError$ = this.showNotFoundErrorSubject.asObservable()

  private taxiDataSource = new BehaviorSubject<any>(null)
  taxiData$ = this.taxiDataSource.asObservable()

  private returnJourneySource = new BehaviorSubject<any>(null);
  returnJourney$ = this.returnJourneySource.asObservable();

  duration: any = null
  distance: any = null
  tripType: any = null
  journeyRequestModel: any = {}
  isRemoveReturn: boolean = false
  showNotFoundError: boolean = false
  updateFilter(model: AirportTaxiDetailsRequestModel): void {
    this.requestModelSubject.next(model)
  }

  private cityNameSubject = new BehaviorSubject<string | null>(null)
  cityName$ = this.cityNameSubject.asObservable()

  updateCityName(cityName: string): void {
    this.cityNameSubject.next(cityName)
  }

  setDurationAndDistance(duration: string, distance: string): void {
    this.duration = duration
    this.distance = distance
  }

  getDurationAndDistance(): [string, string] {
    return [this.duration, this.distance]
  }

  setTripType(type: string) {
    this.tripType = type
  }

  getTripType() {
    return this.tripType
  }

  setModel(model: any = {}) {
    this.journeyRequestModel = model
  }

  getModel() {
    return this.journeyRequestModel
  }

  setRemoveReturn(value: boolean): void {
    this.isRemoveReturnSubject.next(value)
  }

  setshowNotFoundError(value: boolean): void {
    this.showNotFoundErrorSubject.next(value)
  }

  setTaxiData(data: any) {
    this.taxiDataSource.next(data)
  }

  clearData() {
    this.taxiDataSource.next(null)
  }

  sendReturnJourney(date: Date) {
    this.returnJourneySource.next(date);
  }
}
