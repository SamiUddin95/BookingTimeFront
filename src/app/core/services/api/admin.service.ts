import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';
import { PropertyDetail } from '../../models/property-detail.model';
import { ReviewRequest, AddReviewRequest } from '../../models/requestModels/review.model';

export interface UserRequest {
    groupId: number,
    userId: number,
    name: string,
    isVerified: boolean,
    email:string,
    fullName:string
}

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
    GetAllGroupList():Observable<any> {
      return this.get(`GetAllGroupList`);
    }
    GetUserDetailById(id:any):Observable<any> {
      return this.get(`GetUserDetailById?id=${id}`);
    }

    AddPropertyReview(reqBody: AddReviewRequest):Observable<any> {
      return this.post(`AddPropertyReview`, reqBody);
    }

    UpdateUser(reqBody: UserRequest):Observable<any> {
      debugger
      return this.post(`UpdateUser`, reqBody);
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
