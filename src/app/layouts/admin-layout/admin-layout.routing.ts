import { Routes } from '@angular/router';

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

export const AdminLayoutRoutes: Routes = [
    { path: 'manage-agency',    component: ManageAgencyComponent },
    { path: 'manage-employee',  component: ManageEmployeeComponent },
    { path: 'manage-customer',  component: ManageCustomerComponent },
    { path: 'manage-order',     component: ManageOrderComponent },
    { path: 'statistic',        component: StatisticComponent },
    { path: 'manage-fee',       component: ManageFeeComponent },
    { path: 'dashboard',        component: DashboardComponent },
    { path: 'user-profile',     component: UserProfileComponent },
    { path: 'table-list',       component: TableListComponent },
    { path: 'typography',       component: TypographyComponent },
    { path: 'maps',             component: MapsComponent },
    { path: 'notifications',    component: NotificationsComponent },
    { path: 'upgrade',          component: UpgradeComponent },
];
