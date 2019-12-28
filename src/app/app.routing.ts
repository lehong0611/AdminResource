import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    // loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'manage-agency',
    // loadChildren: () => import('./manage-agency/manage-agency.module').then(m => m.ManageAgencyModule),
    loadChildren: './manage-agency/manage-agency.module#ManageAgencyModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-employee',
    loadChildren: './manage-employee/manage-employee.module#ManageEmployeeModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-customer',
    loadChildren: './manage-customer/manage-customer.module#ManageCustomerModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-fee',
    loadChildren: './manage-fee/manage-fee.module#ManageFeeModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-order',
    loadChildren: './manage-order/manage-order.module#ManageOrderModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-shipper',
    loadChildren: './manage-shipper/manage-shipper.module#ManageShipperModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'statistic',
    loadChildren: './statistic/statistic.module#StatisticModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'user-profile',
    loadChildren: './user-profile/user-profile.module#UserProfileModule',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
