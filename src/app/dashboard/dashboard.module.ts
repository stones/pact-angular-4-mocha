import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from './containers/dashboard/dashboard-page.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DashboardPageComponent },
    ]),
  ],
  declarations: [
    DashboardPageComponent,
  ],
  providers: [],
})
export class DashboardModule {
}
