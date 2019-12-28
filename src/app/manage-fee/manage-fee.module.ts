import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';
import { MaterialModule } from '../material.module';
import { ManageFeeComponent } from './manage-fee.component';

const routes: Routes = [
  {
    path: '',
    component: ManageFeeComponent
  }
];

@NgModule({
  declarations: [ManageFeeComponent],
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
export class ManageFeeModule { }
