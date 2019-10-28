import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ManageAgencyComponent } from '../../manage-agency/manage-agency.component';
import { ManageCustomerComponent } from '../../manage-customer/manage-customer.component';
import { ManageEmployeeComponent } from '../../manage-employee/manage-employee.component';
import { ManageOrderComponent } from '../../manage-order/manage-order.component';
import { StatisticComponent } from '../../statistic/statistic.component';
import { ManageFeeComponent } from '../../manage-fee/manage-fee.component';
import { ManageShipperComponent } from '../../manage-shipper/manage-shipper.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'manage-agency',    component: ManageAgencyComponent },
    { path: 'manage-employee',  component: ManageEmployeeComponent },
    { path: 'manage-customer',  component: ManageCustomerComponent },
    { path: 'manage-order',     component: ManageOrderComponent },
    { path: 'statistic',        component: StatisticComponent },
    { path: 'manage-fee',       component: ManageFeeComponent },
    { path: 'manage-shipper',       component: ManageShipperComponent },
    { path: 'user-profile',     component: UserProfileComponent },
];
