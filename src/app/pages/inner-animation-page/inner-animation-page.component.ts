import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inner-animation-page',
  templateUrl: './inner-animation-page.component.html',
  styleUrls: ['./inner-animation-page.component.scss']
})
export class InnerAnimationPageComponent {
  constructor(
    private router: Router,
  ) { }

  back() {
    this.router.navigate(['/']);
  }
}
