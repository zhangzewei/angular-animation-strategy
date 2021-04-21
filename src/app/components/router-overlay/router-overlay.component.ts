import { AfterViewInit, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  constructor() { }

  ngOnInit() {
    this.expandAnimationName = '';
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
    elementRef.nativeElement.style.left = `${left}px`;
    elementRef.nativeElement.style.top = `${top}px`;
    elementRef.nativeElement.style.width = `${width}px`;
    elementRef.nativeElement.style.height = `${height}px`;
  }

}
