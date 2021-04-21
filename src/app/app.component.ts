import { ViewContainerRef } from '@angular/core';
import { AfterViewInit, Component, DoCheck, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { slideInOutAnimation } from './animations';
import { OverlayStyleConfig, RouterAnimationService } from './components/router-overlay/router-animation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInOutAnimation]
})
export class AppComponent implements DoCheck, AfterViewInit {
  title = 'angular-animation-strategy';
  needMenu = true;
  routeConfig = [
    {
      path: '/inner-animation', name: '自身带有动画效果的页面',
    },
    {
      path: '/outter-animation', name: '全局遮盖动画效果的页面', color: '#00e5ff'
    },
    {
      path: '/mo-practice', name: 'Mo.js 动画效果的页面', color: '#ffa726'
    },
    {
      path: '/outter-animation', name: '全局遮盖动画效果的页面', color: '#1de9b6'
    },
  ];

  @ViewChild('routerOutlet') routerOutlet: any;

  constructor(
    private router: Router,
    private routerAnimationService: RouterAnimationService,
    public viewContainerRef: ViewContainerRef
  ) { }

  ngAfterViewInit() {
    this.routerAnimationService.setRootViewContainerRef(this.viewContainerRef);
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
      return this.playRouterOverlayAnimation({
        color,
        left: `${offsetLeft}px`,
        top: `${offsetTop}px`,
        width: `${offsetWidth}px`,
        height: `${offsetHeight}px`
      }, () => this.router.navigate([path]));
    }
    return this.router.navigate([path]);
  }

  playRouterOverlayAnimation(
    overlayStyleConfig: OverlayStyleConfig,
    cb: () => void
  ) {
    this.routerAnimationService.playExpadingAnimation(overlayStyleConfig, cb);
  }
}

