import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';
import { PropertyDetail } from '../../models/property-detail.model';

@Injectable({
  providedIn: 'root'
})
export class StaysService extends BaseHttpService{

    GetAllProperties(): Observable<PropertyDetail[]> {
      return this.get('GetListOFProperty');
    }
}
