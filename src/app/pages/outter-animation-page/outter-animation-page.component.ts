import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outter-animation-page',
  templateUrl: './outter-animation-page.component.html',
  styleUrls: ['./outter-animation-page.component.scss']
})
export class OutterAnimationPageComponent {

  constructor(
    private router: Router,
  ) { }

  back() {
    this.router.navigate(['/']);
  }
}
