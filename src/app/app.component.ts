import { Component, DoCheck, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { slideInOutAnimation, expandtAnimation } from './animations';
import { RouterAnimationService } from './services/router-animation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInOutAnimation, expandtAnimation]
})
export class AppComponent implements OnInit, DoCheck, OnDestroy {
  title = 'angular-animation-strategy';
  needMenu = true;
  expandAnimationName: string | undefined;
  routeConfig = [
    {
      path: '/inner-animation', name: '自身带有动画效果的页面',
    },
    {
      path: '/outter-animation', name: '全局遮盖动画效果的页面', color: '#00e5ff'
    },
    {
      path: '/outter-animation', name: '全局遮盖动画效果的页面', color: '#ffa726'
    },
    {
      path: '/outter-animation', name: '全局遮盖动画效果的页面', color: '#1de9b6'
    },
  ];
  routerAnimationStatusSubject: BehaviorSubject<string>;

  @ViewChild('routerOutlet') routerOutlet: any;
  @ViewChild('routerAnimationOverlay') routerAnimationOverlay?: ElementRef<HTMLElement>;

  constructor(
    private router: Router,
    private routerAnimationService: RouterAnimationService,
  ) {
    this.routerAnimationStatusSubject = this.routerAnimationService.getBehaviorSubject();
  }

  ngOnInit() {
    this.routerAnimationStatusSubject.subscribe((status) => {
      this.expandAnimationName = status;
    });
  }

  ngDoCheck() {
    const needMenu = !(
      this.routerOutlet
      && this.routerOutlet.activatedRouteData
      && this.routerOutlet.activatedRouteData.hideMenu
    );
    if (needMenu) {
      setTimeout(() => {
        this.needMenu = needMenu;
      }, 300);
    } else {
      this.needMenu = needMenu;
    }
  }

  ngOnDestroy() {
    this.routerAnimationStatusSubject.unsubscribe();
  }

  setStyle(color?: string) {
    if (color) {
      return {
        backgroundColor: color
      }
    }
    return null;
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  goToPage(path: string, color?: string, $event?: any) {
    if (color) {
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = $event?.target;
      return this.playRouterOverlayAnimation(color, {
        left: offsetLeft,
        top: offsetTop,
        width: offsetWidth,
        height: offsetHeight
      }, () => this.router.navigate([path]));
    }
    return this.router.navigate([path]);
  }

  playRouterOverlayAnimation(color: string, {
    left,
    top,
    width,
    height
  }: {
    left: number,
    top: number,
    width: number,
    height: number
  }, cb: any) {
    this.routerAnimationOverlay!.nativeElement.style.backgroundColor = color;
    this.routerAnimationOverlay!.nativeElement.style.left = `${left}px`;
    this.routerAnimationOverlay!.nativeElement.style.top = `${top}px`;
    this.routerAnimationOverlay!.nativeElement.style.width = `${width}px`;
    this.routerAnimationOverlay!.nativeElement.style.height = `${height}px`;
    this.routerAnimationService.playAnimation(cb);
    setTimeout(() => {
      this.routerAnimationService.closeOverlay();
    }, 3000);
  }
}

