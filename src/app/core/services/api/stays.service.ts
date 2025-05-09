import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';
import { PropertyDetail } from '../../models/property-detail.model';
import { ReviewRequest, AddReviewRequest } from '../../models/requestModels/review.model';

@Injectable({
  providedIn: 'root'
})
export class StaysService extends BaseHttpService{

    GetListingPropertyById(propertyId: number): Observable<PropertyDetail> {
      return this.get(`GetListingPropertyById?id=${propertyId}`);
    }

    GetReviewList(reqBody: ReviewRequest):Observable<any> {
      return this.post(`GetReviewList`, reqBody);
    }

    AddPropertyReview(reqBody: AddReviewRequest):Observable<any> {
      return this.post(`AddPropertyReview`, reqBody);
    }

    GetPropertyRatingPercentage(propertyId: number):Observable<any> {
      return this.get(`GetPropertyRatingPercentage/${propertyId}`);
    }

    GetFeaturedHotel():Observable<any> {
      return this.get(`GetFeaturedHotel`);
    }

    AddListingProperty(reqBody:any):Observable<any> {
      return this.post(`AddListingProperty`,reqBody);
    }

   
    GetListingPropertyList(reqBody: any):Observable<any> {
      return this.post('GetListingPropertyList', reqBody)
    }


    GetAllBeachAccessList():Observable<any> {
      return this.get(`GetAllBeachAccessList`);
    }
    GetAllEntirePlacesList():Observable<any> {
      return this.get(`GetAllEntirePlacesList`);
    
    }
    GetAllFacilityList():Observable<any> {
      return this.get(`GetAllFacilityList`);
    }
    GetAllFunThingsToDoList():Observable<any> {
      return this.get(`GetAllFunThingsToDoList`);
    }
    GetAllPopularFiltersList():Observable<any> {
      return this.get(`GetAllPopularFiltersList`);
    }
    GetAllRoomAccessList():Observable<any> {
      return this.get(`GetAllRoomAccessList`);
    }
    GetAllRoomFacilityList():Observable<any> {
      return this.get(`GetAllRoomFacilityList`);
    }
    GetAllPropertyAccessibilitiesList():Observable<any> {
      return this.get(`GetAllPropertyAccessibilitiesList`);
    }
    GetAllPropertyTypeList():Observable<any> {
      return this.get(`GetAllPropertyTypeList`);
    }

}
