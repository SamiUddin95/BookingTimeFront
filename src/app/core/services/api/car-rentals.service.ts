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

    AddCarDetails(postBody: any, thumbnailImage: File | undefined, carImages: File[] | undefined): Observable<any> {
        const formData = new FormData();

        for (const key in postBody) {
            if (postBody.hasOwnProperty(key)) {
                formData.append(key, postBody[key]);
            }
        }

        if (carImages && carImages.length > 0) {
            carImages.forEach((file, index) => {
                formData.append(`carImages`, file); 
            });
        }

        if(thumbnailImage) {
            formData.append('image', thumbnailImage)
        }

        return this.post('AddCarDetails', formData);
    }

    GetCarDetailsList(reqBody: any): Observable<any> {
        return this.post('GetCarDetailsList', reqBody);
    }
    
    GetCitiesHavingCars(): Observable<any> {
        return this.get('cities/having-cars');
    }

    FilteredCarList(reqBody: any): Observable<any> {
        return this.post('filter-cars-list', reqBody);
    }

    GetAllCarCategories(): Observable<any> {
        return this.get('car-categories');
    }

    
}