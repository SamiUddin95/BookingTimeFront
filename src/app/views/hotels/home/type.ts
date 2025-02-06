export type NearbyPlaceType = {
  image: string
  name: string
  travelTime: string
}

export type FeaturedHotelType = {
  location: string
  image: string
  name: string
  price: number
  ratings: number
  reviews?: number
}
export type VacationPackageType = {
  title: string
  image: string
  location: string
  rating: string
  offer: number
  price: number
  fromDate: Date
  toDate: Date
}
export type FeaturedPropertiesType = {
  location: string
  image: string
  name: string
  price: number
  ratings: number
}

export type DiscoverStayType = {
  type: string
  image: string
  name: string
  price: number
  ratings: number
}

export type ClaimType = {
  icon: string
  title: string
  description: string
}
