import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { BasicLayoutComponent } from './containers/basicLayout/basicLayout.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopNavbarComponent } from './components/topnavbar/topnavbar.component';

export const COMPONENTS = [
  BasicLayoutComponent,
  FooterComponent,
  TopNavbarComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: COMPONENTS,
})

export class LayoutModule {
}
