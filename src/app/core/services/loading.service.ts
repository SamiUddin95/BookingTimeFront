import { Injectable } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);

  readonly loading$ = this._loading.asObservable();

  constructor(private progress: NgProgress) {}

  private loadingCount = 0;

  start() {
    this.loadingCount++;
    this._loading.next(true);
    this.progress.ref().start();
  }

  stop() {
    setTimeout(() => {
      this.loadingCount = Math.max(0, this.loadingCount - 1);
      if (this.loadingCount === 0) {
        this._loading.next(false);
        this.progress.ref().complete();
      }
    }, 500);
  }
}
