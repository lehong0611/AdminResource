import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from '../../material.module';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ManageAgencyComponent } from '../../manage-agency/manage-agency.component';
import { ManageCustomerComponent } from '../../manage-customer/manage-customer.component';
import { ManageEmployeeComponent } from '../../manage-employee/manage-employee.component';
import { ManageOrderComponent } from '../../manage-order/manage-order.component';
import { StatisticComponent } from '../../statistic/statistic.component';
import { ManageFeeComponent } from '../../manage-fee/manage-fee.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ChartsModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    MapsComponent,
    NotificationsComponent,
    ManageAgencyComponent,
    ManageEmployeeComponent,
    ManageCustomerComponent,
    ManageOrderComponent,
    StatisticComponent,
    ManageFeeComponent
  ],
})

export class AdminLayoutModule {}
