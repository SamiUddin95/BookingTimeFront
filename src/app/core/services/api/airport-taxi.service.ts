import { Injectable } from "@angular/core";
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';
import { RegisterTaxiForm } from "../../models/requestModels/register-airport-taxi.model";

@Injectable({
    providedIn: 'root'
})

export class AirportTaxisService extends BaseHttpService { 

    registerTaxi(reqBody: any): Observable<any> {
        const formData = new FormData();
      
        Object.keys(reqBody).forEach(key => {
          if (reqBody[key] !== null) {
            formData.append(key, reqBody[key] as any);  
          }
        });
      
        if (reqBody.image) {
          formData.append('image', reqBody.image);
        }
      
        return this.post('AddAirportTaxiDetail', formData);
      }
      
    
    GetAllTaxiFleetsizesList(): Observable<any> {
        return this.get('GetAllTaxiFleetsizesList');
    }
    GetAllTaxiVechiletypesList(): Observable<any> {
        return this.get('GetAllTaxiVechiletypesList');
    }
}