import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private urlBase = "https://localhost:7087/api/";
  //private urlBase = "http://45.59.163.15:4100/api/";
  private auth: string = '';

  constructor(private http: HttpClient) {}

  setAuthToken() {
    this.auth = localStorage.getItem('token') || '';
  }

  post(url: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.auth
    });

    return this.http.post(this.urlBase + url, data, { headers }).pipe(
      map((res: any) => res)
    );
  }

  get(url: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.auth
    });
    return this.http.get(this.urlBase + url, { headers }).pipe(
      map((res: any) => res)
    );
  }
}
