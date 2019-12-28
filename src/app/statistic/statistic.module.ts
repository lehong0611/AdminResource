import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'app/components/components.module';
import { MaterialModule } from '../material.module';
import { StatisticComponent } from './statistic.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticComponent
  }
];

@NgModule({
  declarations: [StatisticComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    ComponentsModule,
    MaterialModule,
  ]
})
export class StatisticModule { }
