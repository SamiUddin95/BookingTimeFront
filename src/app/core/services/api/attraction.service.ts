import { Injectable } from "@angular/core";
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AttractionService extends BaseHttpService {

    GetTopDestinationsByAttraction(): Observable<any> {
        return this.get('Attractions/all-destinations');
    }

    GetAllDestinationsByAttraction(): Observable<any> {
        return this.get('Attractions/all-destinations');
    }

    GetAllAttractionCateogories(): Observable<any> {
        return this.get('Attractions/all-attraction-categories');
    }

    GetAttractionsByCity(cityId: Number): Observable<any> {
        return this.get(`Attractions/by-city/${cityId}`);
    }

    GetAttractionsById(id: Number): Observable<any> {
        return this.get(`Attractions/${id}`);
    }

    GetAttractionsByFilter(requestPayload: any): Observable<any> {
        return this.post('Attractions/filter', requestPayload);
    }





}