export interface RegisterTaxiForm {
    companyName: string,
    countryId: number, // Fixed from string to number
    stateId: number,
    cityId: number,
    operatingAirport: string,
    firstName: string,
    lastName: string,
    email: string,
    contactNumber: string, // Changed from contactNo to match C# model
    bookingPerDay: number,
    website: string,
    capacity: number,
    basePrice: number,
    currency: number,
    availabilityStatus: string | null,
    description: string | null,
    image: File | null, // Matches C# IFormFile
    fleetSize: number,
    status: string,
    vehicleType: string // Comma-separated IDs
}

export interface AirportTaxiDetailsRequestModel {
    detail: TaxiDetail;
    paginationInfo: PaginationInfo;
  }
  
  export interface TaxiDetail {
    taxiId?: number;
    pickUpDate?: Date;
    pickUpTime?: string; 
    cityId?: number;
    dropCityId?: number;
    priceFrom?: number;
    priceTo?: number;
  }
  
  export interface PaginationInfo {
    page?: number;
    pageSize?: number;
  }
  

  export interface VehicleType {
    id: number;
    name: string;
  }
  
  export interface TaxiDetails {
    id: number;
    country: string;
    city: string;
    state: string;
    companyName: string;
    operatingAirport: string;
    bookingPerDay: number;
    fleetSizeName: string;
    website: string;
    capacity: number;
    basePrice: number;
    currency: string;
    symbol: string;
    availabilityStatus: string;
    description: string;
    imageUrl: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
    status: string;
    vehicleTypes: VehicleType[];
  }
  
  export interface TaxiResponse {
    taxidetails: TaxiDetails[];
    totalCount: number;
  }
