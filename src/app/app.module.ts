import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InnerAnimationPageComponent } from './pages/inner-animation-page/inner-animation-page.component';
import { OutterAnimationPageComponent } from './pages/outter-animation-page/outter-animation-page.component';

@NgModule({
  declarations: [
    AppComponent,
    InnerAnimationPageComponent,
    OutterAnimationPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
