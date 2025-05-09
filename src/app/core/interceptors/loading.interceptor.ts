import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private progress: NgProgress) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.progress.ref().start();

    return next.handle(req).pipe(finalize(() => {
      setTimeout(() => {
        this.progress.ref().complete();
      }, 300);
    }));
  }
}
