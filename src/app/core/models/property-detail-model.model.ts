// export interface PropertyDetailsModelResponseModel {
//     id: number;
//     shortDesc: string | null;
//     policyDesc: string | null;
//     thumbnail: string[];           
//     roomImages: string[];          
//     amenities: string[];
//     facilities: string[];
//     roomFacilities: string[];
//     roomAccessibility: string[];
//   }

  export interface PropertyDetailsModelResponseModel {
    id?: number;
    shortDesc?: string;
    policyDesc?: string;
    thumbnail?: string[];
    roomImageList?: RoomImageModel[];
    amenities?: string[];
    facilities?: string[];
    roomFacilities?: RoomFacilityModel[];
    roomAccessibility?: RoomAccessibilityModel[];
    rooms: RoomDetailModel[];
  }

  export interface RoomDetailModel {
    id: number;
    propertyId: number;
    name: string;
    price: number;
    discount: number;
    additionalInfoId: number;
    image: string;
  }

  export interface RoomImageModel {
    id: number;
    roomId: number;
    imageUrl: string;
  }
  export interface RoomFacilityModel {
    roomId: number; 
    facility: string;
  }
  
  export interface RoomAccessibilityModel {
    roomId: number; 
    accessibility: string;
  }
  