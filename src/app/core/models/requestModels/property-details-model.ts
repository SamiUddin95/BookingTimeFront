export interface propertydetailsmodel {
    details: {
        cityId?: number | null;
        priceRangeFrom?: number | null;
        priceRangeTo?: number | null;
        ratingId?: number | null;
        checkIn?: Date | null;
        checkOut?: Date | null;
        hotelTypes?: { hotelTypeId: number  }[] | null;
        amenities?: { amenitiesId: number  }[] | null;
        beachAccess?: { id: number }[] | null;
        entirePlaces?: { id: number  }[] | null;
        facilities?: { id: number  }[] | null;
        funThingsToDo?: { id: number  }[] | null;
        popularFilter?: { id: number  }[] | null;
        propertyType?: { id: number  }[] | null;
        propertyAccessibility?: { id: number  }[] | null;
        roomAccessibility?: { id: number }[] | null;
        roomFacilities?: { id: number  }[] | null;
      };
    paginationInfo: {
      page: number;
      rowsPerPage: number;
    };
  }
  