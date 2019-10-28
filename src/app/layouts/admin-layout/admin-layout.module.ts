import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ManageAgencyComponent } from '../../manage-agency/manage-agency.component';
import { ManageCustomerComponent } from '../../manage-customer/manage-customer.component';
import { ManageEmployeeComponent } from '../../manage-employee/manage-employee.component';
import { ManageOrderComponent } from '../../manage-order/manage-order.component';
import { StatisticComponent } from '../../statistic/statistic.component';
import { ManageFeeComponent } from '../../manage-fee/manage-fee.component';
import { ManageShipperComponent } from '../../manage-shipper/manage-shipper.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ChartsModule,
    NgxSpinnerModule,
    MaterialModule,
    NgbModule,
    MomentModule
  ],
  declarations: [
    UserProfileComponent,
    ManageAgencyComponent,
    ManageEmployeeComponent,
    ManageCustomerComponent,
    ManageOrderComponent,
    StatisticComponent,
    ManageFeeComponent,
    ManageShipperComponent
  ],
})

export class AdminLayoutModule {}
