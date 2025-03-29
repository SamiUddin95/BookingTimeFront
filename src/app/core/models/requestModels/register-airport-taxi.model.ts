export interface RegisterTaxiForm {
    countryId: number,
    stateId: number,
    cityId: number,
    airportName: string,

    firstName: string,
    lastName: string,
    email: string,
    contactNo: string,

    maxBookingsPerDay: number,
    fleetSizeId: number,
    vehicleTypeIds: string //comma seperated ids

}