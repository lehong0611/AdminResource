import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { OrderService } from 'app/services/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { AgencyService } from 'app/services/agency.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class StatisticComponent implements OnInit {
  dtTable: any;
  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartLabels: Label[] = [];
  public pieChartRevenue: SingleDataSet = [];
  public pieChartOrder: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  searchMonthValue: FormGroup;
  report: any;
  isShowReport: boolean;
  role: any;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private agencyService: AgencyService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.isShowReport = false;
    this.searchMonthValue = this.fb.group({
      toDate: ['', Validators.required],
      fromDate: ['', Validators.required]
    });
  }

  getReport() {
    this.orderService.getReport(this.searchMonthValue.value).subscribe((res: any) => {
      if (res.status === 1) {
        this.isShowReport = true;
        this.report = res.results;
      }
    });
  }

  getReportAllAgency() {
    this.agencyService.getReportAllAgency(this.searchMonthValue.value).subscribe((res: any) => {
      if (res.status === 1) {
        this.isShowReport = true;
        res.results.forEach(ele => {
          this.pieChartLabels.push(ele.agencyName);
          this.pieChartRevenue.push(ele.totalRevenue);
          this.pieChartOrder.push(ele.totalOrders);
        });
      }
    })
  }
}
