import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material.module';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
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
    NgbModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ManageAgencyComponent,
    ManageEmployeeComponent,
    ManageCustomerComponent,
    ManageOrderComponent,
    StatisticComponent,
    ManageFeeComponent
  ],
})

export class AdminLayoutModule {}
