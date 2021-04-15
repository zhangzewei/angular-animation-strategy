import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface OverlayStyleConfig {
  color: string,
  left: number,
  top: number,
  width: number,
  height: number
}

@Injectable({
  providedIn: 'root'
})
export class RouterAnimationService {
  routerAnimationStatus = 'start';
  routerAnimationSubject: BehaviorSubject<string>;
  routerOverlayEle?: ElementRef<HTMLElement>;
  constructor() {
    this.routerAnimationSubject = new BehaviorSubject<string>(this.routerAnimationStatus);
  }

  getBehaviorSubject() {
    return this.routerAnimationSubject;
  }

  setOverlayEle(ele?: ElementRef<HTMLElement>) {
    this.routerOverlayEle = ele;
  }

  setOverlayStyle({ color, top, left, width, height }: OverlayStyleConfig) {
    this.routerOverlayEle!.nativeElement.style.backgroundColor = color;
    this.routerOverlayEle!.nativeElement.style.left = `${left}px`;
    this.routerOverlayEle!.nativeElement.style.top = `${top}px`;
    this.routerOverlayEle!.nativeElement.style.width = `${width}px`;
    this.routerOverlayEle!.nativeElement.style.height = `${height}px`;
  }

  playAnimation(styles: OverlayStyleConfig, cb: () => void) {
    this.setOverlayStyle(styles);
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
