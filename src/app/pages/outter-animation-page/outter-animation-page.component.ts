import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterAnimationService } from 'src/app/services/router-animation.service';

@Component({
  selector: 'app-outter-animation-page',
  templateUrl: './outter-animation-page.component.html',
  styleUrls: ['./outter-animation-page.component.scss']
})
export class OutterAnimationPageComponent implements OnInit {

  constructor(
    private router: Router,
    private routerAnimationService: RouterAnimationService,
  ) { }

  ngOnInit() {
    // 模拟网络请求延迟
    setTimeout(() => {
      this.routerAnimationService.closeOverlay();
    }, 3000);
  }

  back() {
    this.router.navigate(['/']);
  }
}
