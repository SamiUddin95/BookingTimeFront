import { Injectable } from "@angular/core";
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CarRentalsService extends BaseHttpService {

    GetAllFuelTypeList(): Observable<any> {
        return this.get('GetAllFuelTypeList');
    }

    GetAllOdometerReadingList(): Observable<any> {
        return this.get('GetAllOdometerReadingList');
    }

    GetAllSeatbeltTypeList(): Observable<any> {
        return this.get('GetAllSeatbeltTypeList');
    }

    GetAllVehicleConditionList(): Observable<any> {
        return this.get('GetAllVehicleConditionList');
    }

    GetAllVehicleMakeList(): Observable<any> {
        return this.get('GetAllVehicleMakeList');
    }

    GetAllVehicleYearList(): Observable<any> {
        return this.get('GetAllVehicleYearList');
    }

    AddCarDetails(postBody: any): Observable<any> {
        return this.post('AddCarDetails', postBody);
    }

    GetCarDetailsList(reqBody: any): Observable<any> {
        return this.post('GetCarDetailsList', reqBody);
    }

    
}