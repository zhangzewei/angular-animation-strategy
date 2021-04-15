import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterAnimationService {
  routerAnimationStatus = 'start';
  routerAnimationSubject: BehaviorSubject<string>
  constructor() {
    this.routerAnimationSubject = new BehaviorSubject<string>(this.routerAnimationStatus);
  }

  getBehaviorSubject() {
    return this.routerAnimationSubject;
  }

  playAnimation(cb: () => void) {
    new Observable(subscriber => {
      subscriber.next();
    }).pipe(
      tap(() => {
        this.routerAnimationStatus = "expand";
        this.routerAnimationSubject.next(this.routerAnimationStatus);
      }),
      delay(300),
      tap(() => cb())
    ).subscribe();
  }

  closeOverlay() {
    new Observable(subscriber => {
      subscriber.next();
    }).pipe(
      delay(300),
      tap(() => {
        this.routerAnimationStatus = "end";
        this.routerAnimationSubject.next(this.routerAnimationStatus);
      }),
      delay(300),
      tap(() => {
        this.routerAnimationStatus = "start";
        this.routerAnimationSubject.next(this.routerAnimationStatus);
      }),
    ).subscribe();
  }
}
