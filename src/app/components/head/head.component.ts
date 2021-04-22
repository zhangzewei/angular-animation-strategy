import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterAnimationService } from 'src/app/components/router-overlay/router-animation.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent {
  constructor(
    private router: Router,
    private routerAnimationService: RouterAnimationService,
  ) { }

  back() {
    this.routerAnimationService.playBackAnimation(
      {
        color: '#004d40',
        top: '0',
        left: '0',
        width: '100%',
        height: '0',
      },
      () => this.router.navigate(['/']));
  }
}
