import { Routes } from '@angular/router';

import { NotFoundPageComponent } from './core/containers/not-found-page/not-found-page.component';
import { BasicLayoutComponent } from './layout/containers/basicLayout/basicLayout.component';
export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
    ]
  },
  { path: '**', component: NotFoundPageComponent }
];
