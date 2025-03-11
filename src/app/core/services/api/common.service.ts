import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService extends BaseHttpService {

  GetAllCountryList(): Observable<any> {
    return this.get('GetAllCountryList');
  }

  GetStateByCountryId(countryId: number): Observable<any> {
    return this.get(`GetStateByCountryId/${countryId}`);
  }

  GetCityByCountryId(countryId: number): Observable<any> {
    return this.get(`GetCityByCountryId/${countryId}`);
  }

  GetAllAmenitiesList(): Observable<any> {
    return this.get('GetAllAmenitiesList');
  }

  GetAllRatingsList(): Observable<any> {
    return this.get('GetAllRatingsList');
  }

  GetAllHotelTypesList(): Observable<any> {
    return this.get('GetAllHotelTypesList');
  }
}
