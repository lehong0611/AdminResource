import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageCustomerComponent } from './manage-customer.component';
import { ComponentsModule } from 'app/components/components.module';
import { MaterialModule } from '../material.module';

const routes: Routes = [
  {
    path: '',
    component: ManageCustomerComponent
  }
];

@NgModule({
  declarations: [ManageCustomerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MaterialModule
  ]
})
export class ManageCustomerModule { }
