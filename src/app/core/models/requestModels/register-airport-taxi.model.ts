export interface RegisterTaxiForm {
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
    currency: string,
    availabilityStatus: string | null,
    description: string | null,
    image: File | null, // Matches C# IFormFile
    fleetSize: number,
    status: string,
    vehicleType: string // Comma-separated IDs
}
