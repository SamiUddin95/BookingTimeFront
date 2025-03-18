export interface PropertyDetail {
    id: number;
    listTypeId?: number | null;
    listName: string;
    usageType?: string | null;
    shortDesc?: string | null;
    countryId?: number | null;
    stateId?: number | null;
    cityId?: number | null;
    postalCode?: string | null;
    street?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    amenities?: any[] | null;
    longDesc?: string | null;
    totalFloor?: number | null;
    totalRoom?: number | null;
    roomArea?: number | null;
    currencyId?: number | null;
    basePrice: number;
    discount?: number | null;
    policyDesc?: string | null;
    cancellationOption?: string | null;
    charges?: any | null;
    thumbnail?: string | null;
    amenitiesId?: number | null;
    ratingId?: number | null;
    city?: string | null;
    country?: string | null;
    listType?: string | null;
    rating?: number | null;
    state?: string | null;
  }
  