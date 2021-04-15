import { Component, OnInit } from '@angular/core';
import { RouterAnimationService } from 'src/app/services/router-animation.service';

@Component({
  selector: 'app-mo-practice',
  templateUrl: './mo-practice.component.html',
  styleUrls: ['./mo-practice.component.scss']
})
export class MoPracticeComponent implements OnInit {

  constructor(
    private routerAnimationService: RouterAnimationService,
  ) { }

  ngOnInit() {
    this.routerAnimationService.closeOverlay();
  }

}
