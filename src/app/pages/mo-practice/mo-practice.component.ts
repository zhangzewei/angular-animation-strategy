import { AfterViewInit, Component, OnInit } from '@angular/core';
import mojs from '@mojs/core'
import { RouterAnimationService } from 'src/app/components/router-overlay/router-animation.service';

@Component({
  selector: 'app-mo-practice',
  templateUrl: './mo-practice.component.html',
  styleUrls: ['./mo-practice.component.scss']
})
export class MoPracticeComponent implements OnInit, AfterViewInit {

  constructor(
    private routerAnimationService: RouterAnimationService,
  ) { }

  ngOnInit() {
    this.routerAnimationService.closeExpandingOverlay();
  }

  ngAfterViewInit() {
    const bouncyCircle = new mojs.Shape({
      parent: '#bouncyCircle',
      shape: 'circle',
      fill: { '#F64040': '#FC46AD' },
      radius: { 20: 80 },
      duration: 2000,
      isYoyo: true,
      isShowStart: true,
      easing: 'elastic.inout',
      repeat: 999,
    });

    bouncyCircle.play()
  }

}
