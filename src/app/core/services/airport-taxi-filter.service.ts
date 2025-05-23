import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AirportTaxiDetailsRequestModel } from '@/app/core/models/requestModels/register-airport-taxi.model';

@Injectable({
  providedIn: 'root'
})
export class AirportTaxiFilterService {
  private requestModelSubject = new BehaviorSubject<AirportTaxiDetailsRequestModel | null>(null);
  requestModel$ = this.requestModelSubject.asObservable();

  updateFilter(model: AirportTaxiDetailsRequestModel): void {
    this.requestModelSubject.next(model);
  }
}
