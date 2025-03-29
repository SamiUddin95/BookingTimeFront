import { Injectable } from "@angular/core";
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';
import { RegisterTaxiForm } from "../../models/requestModels/register-airport-taxi.model";

@Injectable({
    providedIn: 'root'
})

export class AirportTaxisService extends BaseHttpService { 

    registerTaxi(reqBody: RegisterTaxiForm): Observable<any> {
        return this.post('dummyRegisterTaxiRoute', reqBody);
    }
}