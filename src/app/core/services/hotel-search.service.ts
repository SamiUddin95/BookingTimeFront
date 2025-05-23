import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { propertydetailsmodel } from '../models/requestModels/property-details-model'

@Injectable({
  providedIn: 'root',
})
export class HotelSearchService {
  constructor() {}

  private currentState: {
    availability:
      | (Partial<propertydetailsmodel['details']> & {
          paginationInfo?: { page: number; rowsPerPage: number }
        })
      | null
    sidebar:
      | (Partial<propertydetailsmodel['details']> & {
          paginationInfo?: { page: number; rowsPerPage: number }
        })
      | null
  } = {
    availability: null,
    sidebar: null,
  }

  public filterSubject = new BehaviorSubject<propertydetailsmodel | null>(null)
  public filter$ = this.filterSubject.asObservable()
  private hotelCount: number = -1

  updateAvailability(availabilityData: any) {
    this.currentState.availability = availabilityData
    this.emitCombined()
  }

  updateSidebar(sidebarFilter: any) {
    this.currentState.sidebar = sidebarFilter
    this.emitCombined()
  }

  // private emitCombined() {
  //   const combined = {
  //     ...this.currentState.sidebar,
  //     availability: this.currentState.availability,
  //   };
  //   this.filterSubject.next(combined);
  // }

  updateAvailabilityWithCity(availabilityData: any): void {
    this.currentState.availability = availabilityData
    const c: any = this.currentState.availability
    const cityId = 0
    if (c) {
      cityId == c.cityId
    } else {
      c.cityId = 0
    }
  }

  updateAvailabilityWithPriceRange(availabilityData: any): void {
    const dt = this.currentState.availability
        const data = {
      cityId:  availabilityData.cityId,
      checkIn: availabilityData.checkIn,
      checkOut:  availabilityData.checkOut,
      // guests: dt?.guests??availabilityData.guests,
      priceRangeFrom:  availabilityData.priceRangeFrom,
      priceRangeTo:  availabilityData.priceRangeTo,
      ratingId:  availabilityData.ratingId,
    }
    this.currentState.availability = data
  }
  GetPriceRange(): { from: number; to: number } | null {
    const availability = this.currentState.availability ?? {}
    const from = availability.priceRangeFrom
    const to = availability.priceRangeTo

    if (typeof from === 'number' && typeof to === 'number' && from >= 0 && to >= 0) {
      return { from, to }
    }

    return null
  }

  getCityId(): number | null {
    const availability: any = this.currentState.availability ?? null
    if (!availability) {
      return null // If availability or details are not present, return null
    }
    return availability.cityId ?? null
  }

  CheckInCheckOutValid(): boolean {
    const availability: any = this.currentState.availability ?? {}
    const checkIn = availability.checkIn
    const checkOut = availability.checkOut

    if (!checkIn || !checkOut) {
      return false
    }

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return false
    }

    if (checkInDate >= checkOutDate) {
      return false
    }

    return true
  }

  GetCheckInOutDates(): { checkIn: Date; checkOut: Date } | null {
    const availability: any = this.currentState.availability ?? {}
    const checkIn = availability.checkIn
    const checkOut = availability.checkOut

    if (!checkIn || !checkOut) {
      return null
    }

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return null
    }

    if (checkInDate >= checkOutDate) {
      return null
    }

    return { checkIn: checkInDate, checkOut: checkOutDate }
  }

  getCurrentFilter(): propertydetailsmodel | null {
    return this.filterSubject.value
  }

  setHotelCount(count: number) {
    this.hotelCount = count
  }

  getHotelCount(): number {
    return this.hotelCount
  }
  getratingId(): any {
    return this.currentState.availability?.ratingId
  }
  emitCombined() {
    const sidebar: any = this.currentState.sidebar ?? {}
    const availability = this.currentState.availability ?? {}
    const sidebarDetails = sidebar.details ?? {}
    const availabilityRoomFacilities = availability.roomFacilities ?? []

    const details: propertydetailsmodel['details'] = {
      checkIn: availability.checkIn ?? null,
      checkOut: availability.checkOut ?? null,
      priceRangeFrom: availability.priceRangeFrom ?? null,
      priceRangeTo: availability.priceRangeTo ?? null,
      ratingId: availability.ratingId ?? null,
      cityId: availability.cityId ?? null,

      hotelTypes: [...(sidebarDetails.hotelTypes ?? [])],
      amenities: [...(sidebarDetails.amenities ?? [])],
      beachAccess: [...(sidebarDetails.beachAccess ?? [])],
      entirePlaces: [...(sidebarDetails.entirePlaces ?? [])],
      facilities: [...(sidebarDetails.facilities ?? [])],
      funThingsToDo: [...(sidebarDetails.funThingsToDo ?? [])],
      popularFilter: [...(sidebarDetails.popularFilter ?? [])],
      propertyType: [...(sidebarDetails.propertyType ?? [])],
      propertyAccessibility: [...(sidebarDetails.propertyAccessibility ?? [])],
      roomAccessibility: [...(sidebarDetails.roomAccessibility ?? [])],
      roomFacilities: [
        ...(sidebarDetails.roomFacilities ?? []),
        ...availabilityRoomFacilities,
      ],
    }

    const paginationInfo = availability.paginationInfo ??
      sidebar.paginationInfo ?? {
        page: 0,
        rowsPerPage: 10,
      }

    const combined: propertydetailsmodel = {
      details,
      paginationInfo,
    }

    this.filterSubject.next(combined)
  }
}
