export interface CarResponse {
  cars: {
    id: number;
    name: string;
    passengerCapacity: number;
    categoryId: number;
    makeId: number;
    odometerId: number;
    days: number;
    totalRent: number;
    mileageLimit: number;
    transmission: string;
    carImage: string;
    carImageBase64: string | null;
    pickupLocation: string;
    dropoffLocation: string | null;
    currency: string;
  }[];
  categories: {
    id: number;
    name: string;
    icon: string;
    count: number;
  }[];
  makes: {
    id: number;
    name: string;
    count: number;
  }[];
  odometerReadings: {
    id: number;
    name: string;
    count: number;
  }[];
  passengerSeats: {
    seats: number;
    count: number;
  }[];
  priceRange: {
    lowestPrice: number;
    highestPrice: number;
  };
}
