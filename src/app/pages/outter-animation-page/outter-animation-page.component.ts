import { Component, OnInit } from '@angular/core';
import { RouterAnimationService } from 'src/app/services/router-animation.service';

@Component({
  selector: 'app-outter-animation-page',
  templateUrl: './outter-animation-page.component.html',
  styleUrls: ['./outter-animation-page.component.scss']
})
export class OutterAnimationPageComponent implements OnInit {

  constructor(
    private routerAnimationService: RouterAnimationService,
  ) { }

  ngOnInit() {
    // 模拟网络请求延迟
    setTimeout(() => {
      this.routerAnimationService.closeOverlay();
    }, 1000);
  }
}
