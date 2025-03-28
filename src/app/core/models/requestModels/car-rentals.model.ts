export interface CarRegistrationForm {
    countryId: number,
    cityId: number,
    stateId: number,
    street: string,
    VIN: string,
    yearId: number,
    makeId: number,
    model: string,
    odometerId: number,
    transmission: string,
    vehicleValue: number,
    vehicleConditionId: number,
    haveSeatbelts: boolean,
    seatbeltTypeId: number,
    mobileNumber1: number,
    mobileNumber2: number,
    startDate: string
    endDate: string,
    mileageLimit: number,
    fuelTypeId: number,
    features: string,
    additionalInfo: string
}

export interface CarRegistrationFormIncorrect { //this model is currently inuse but has imperfections due to backend model limitations
    countryId: number,
    cityId: number,
    stateId: number,
    street: string,


    location: string; // Mapped from countryId, cityId, stateId, street
    vin: number; // Changed to number (long in C#)
    yearId: number;
    makeId: number;
    model?: string; // Nullable
    odometerId: number;
    vehicleValue?: string; // Changed from number to string
    vehicleConditionId: number;
    seatbelts: boolean; // Renamed from haveSeatbelts
    seatbeltTypeId?: number; // Nullable
    mobileNumber1: string; // Changed to string (nullable)
    mobileNumber2: string; // Changed to string (nullable)
    startDate?: string; // Nullable
    endDate?: string; // Nullable
    mileageLimit: number;
    fuelTypeId: number; // Nullable
    features?: string; // Nullable
    image?: File; // Matches IFormFile
    carImages?: File[]; // Matches List<IFormFile>

    transmission: string,
    additionalInfo: string
}

export interface CarRegistrationFormUpdated { 
    countryId: number;
  cityId: number;
  stateId: number;
  street: string;
  vin: number;
  yearId: number;
  makeId: number;
  capacityId:number
  model?: string;
  basePrice?: number;
  odometerId: number;
  vehicleValue?: string;
  vehicleConditionId: number;
  seatbelts: boolean;
  seatbeltTypeId?: number;
  mobileNumber1?: string;
  mobileNumber2?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  mileageLimit: number;
  fuelTypeId: number;
  features?: string;
  transmission: string;
  additionalInfo: string;
  image?: File;
  carImages?: File[];
}
