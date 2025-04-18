import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';
import { PropertyDetail } from '../../models/property-detail.model';
import { ReviewRequest, AddReviewRequest } from '../../models/requestModels/review.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseHttpService{

    GetListingPropertyById(propertyId: number): Observable<PropertyDetail> {
      return this.get(`GetListingPropertyById?id=${propertyId}`);
    }

    GetAllUserList():Observable<any> {
      return this.get(`GetAllUserList`);
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
}
