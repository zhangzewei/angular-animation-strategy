import {
  Injectable,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  ComponentFactory
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { RouterOverlayComponent } from './router-overlay.component';
import { ROUTER_ANIMATION_STATUS } from '../../animations';

export interface OverlayStyleConfig {
  color: string,
  left: string,
  top: string,
  width: string,
  height: string
}

@Injectable({
  providedIn: 'root'
})
export class RouterAnimationService {
  routerAnimationStatus = '';
  routerAnimationSubject: BehaviorSubject<string>;
  routerOverlayComponent?: ComponentRef<RouterOverlayComponent> | null;
  rootViewContainer?: ViewContainerRef;
  componentFactory?: ComponentFactory<RouterOverlayComponent>;
  constructor(
    private factoryResolver: ComponentFactoryResolver
  ) {
    this.routerOverlayComponent = null;
    this.routerAnimationSubject = new BehaviorSubject<string>(this.routerAnimationStatus);
  }

  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addDynamicComponent(overlayStyleConfig: OverlayStyleConfig) {
    this.componentFactory = this.factoryResolver.resolveComponentFactory(RouterOverlayComponent);
    if (this.rootViewContainer) {
      this.routerOverlayComponent = this.componentFactory.create(this.rootViewContainer.injector);
      this.routerOverlayComponent.instance.data = { overlayStyleConfig };
      this.rootViewContainer?.insert(this.routerOverlayComponent?.hostView);
    }
  }

  getBehaviorSubject() {
    return this.routerAnimationSubject;
  }

  setOverlayStyle(overlayStyleConfig: OverlayStyleConfig) {
    this.addDynamicComponent(overlayStyleConfig);
  }

  setAnimationName(name: string) {
    this.routerAnimationStatus = name;
    this.routerAnimationSubject.next(this.routerAnimationStatus);
  }

  removeDynamicComponent() {
    this.routerOverlayComponent?.destroy();
  }

  playExpadingAnimation(styles: OverlayStyleConfig, cb: () => void) {
    this.setOverlayStyle(styles);
    new Observable(subscriber => {
      subscriber.next();
    }).pipe(
      tap(() => this.setAnimationName(ROUTER_ANIMATION_STATUS.expanding)),
      delay(300),
      tap(() => cb())
    ).subscribe();
  }

  closeExpandingOverlay() {
    new Observable(subscriber => {
      subscriber.next();
    }).pipe(
      delay(300),
      tap(() => this.setAnimationName(ROUTER_ANIMATION_STATUS.expandEnd)),
      delay(300),
      tap(() => { this.removeDynamicComponent(); })
    ).subscribe();
  }

  playBackAnimation(styles: OverlayStyleConfig, cb: () => void) {
    this.setOverlayStyle(styles);
    new Observable(subscriber => {
      subscriber.next();
    }).pipe(
      tap(() => this.setAnimationName(ROUTER_ANIMATION_STATUS.startLeavingPage)),
      delay(300),
      tap(() => { cb(); }),
      delay(300),
      tap(() => { this.closeBackAnimation(); }),
    ).subscribe();
  }

  closeBackAnimation() {
    new Observable(subscriber => {
      subscriber.next();
    }).pipe(
      tap(() => this.setAnimationName(ROUTER_ANIMATION_STATUS.leftPage)),
      delay(500),
      tap(() => { this.removeDynamicComponent(); })
    ).subscribe();
  }
}
