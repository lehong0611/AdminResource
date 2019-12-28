import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsModule } from 'app/components/components.module';
import { MaterialModule } from '../material.module';
import { ManageOrderComponent } from './manage-order.component';

const routes: Routes = [
  {
    path: '',
    component: ManageOrderComponent
  }
];

@NgModule({
  declarations: [ManageOrderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    NgbModule,
    ComponentsModule,
    MaterialModule
  ]
})
export class ManageOrderModule { }
