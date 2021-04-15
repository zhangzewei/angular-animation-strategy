import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InnerAnimationPageComponent } from './pages/inner-animation-page/inner-animation-page.component';
import { OutterAnimationPageComponent } from './pages/outter-animation-page/outter-animation-page.component';

const routes: Routes = [
  { path: 'inner-animation', component: InnerAnimationPageComponent, data: { animation: 'slideInOutRight', hideMenu: true } },
  { path: 'outter-animation', component: OutterAnimationPageComponent, data: { hideMenu: true } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
