import { AfterViewInit, ElementRef, Input } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { expandtAnimation } from 'src/app/animations';
import { OverlayStyleConfig, RouterAnimationService } from './router-animation.service';

@Component({
  selector: 'app-router-overlay',
  templateUrl: './router-overlay.component.html',
  styleUrls: ['./router-overlay.component.scss'],
  animations: [expandtAnimation]
})
export class RouterOverlayComponent implements OnInit, AfterViewInit {
  @Input() data!: {
    overlayStyleConfig: OverlayStyleConfig;
  };
  @ViewChild('routerAnimationOverlay') routerAnimationOverlayEle!: ElementRef<HTMLElement>;
  expandAnimationName: string | undefined;
  routerAnimationStatusSubject: BehaviorSubject<string>;
  constructor(
    private routerAnimationService: RouterAnimationService,
  ) {
    this.routerAnimationStatusSubject = this.routerAnimationService.getBehaviorSubject();
  }

  ngOnInit() {
    this.routerAnimationStatusSubject.subscribe((status) => {
      this.expandAnimationName = status;
    });
  }

  ngAfterViewInit() {
    this.setOverlayStyle(
      this.data.overlayStyleConfig,
      this.routerAnimationOverlayEle
    );
  }

  setOverlayStyle(
    { color, top, left, width, height }: OverlayStyleConfig,
    elementRef: ElementRef<HTMLElement>
  ) {
    elementRef.nativeElement.style.backgroundColor = color;
    elementRef.nativeElement.style.left = left;
    elementRef.nativeElement.style.top = top;
    elementRef.nativeElement.style.width = width;
    elementRef.nativeElement.style.height = height;
  }
}
