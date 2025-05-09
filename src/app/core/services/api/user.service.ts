import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpService{

  login(reqBody:any):Observable<any> {
       return this.post(`loginRequest`,reqBody);
     }
}
