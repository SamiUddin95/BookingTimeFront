export interface ListingBasicInfo {
    listingTypeId: number | null;
    listingName: string;
    guestOption: string | null;
    description: string;
    countryId: number | null;
    stateId: number | null;
    cityId: number | null;
    postalNumber: string | null;
    street: string|null;
    thumbnail: File | null;
    latitude: number | null;
    longitude: number | null;
  }

  export interface ListingDetailedInfo {


  }
  