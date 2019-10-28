import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
import { CustomerService } from 'app/services/customer.service';

declare const $: any;

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent implements OnInit, OnDestroy {

  // Setting datatables
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild('img', { static: true }) img: TemplateRef<any>

  listCustomer: any[];
  addForm: FormGroup;
  isUpdate: boolean;
  hide: boolean;
  url: string;

  constructor(private cusService: CustomerService,
    private chRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllCustomer();
    this.initTable();
  }

  getAllCustomer() {
    this.cusService.getAllCus().subscribe((res: any) => {
      this.listCustomer = res.results;
      this.chRef.detectChanges();
      this.dtTrigger.next();
      console.log(this.listCustomer);
    }, err => {
      console.log(err);
    });
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first in the current context
      dtInstance.destroy();

      // Call the dtTrigger to rerender again
      this.dtTrigger.next();

    });
  }

  initTable() {
    this.dtOptions = {
      'pagingType': 'full_numbers',
      'lengthChange': false,
      'ordering': false,
      'createdRow': function (row, data, dataIndex) {
        if (data[6] === 'Active') {
          $(row).css('background-color', '#fff');
        } else {
          $(row).css('background-color', '#eee');
        }
      },
      'info': false,
      responsive: true,
      language: {
        search: 'Tìm kiếm',
        emptyTable: 'Không có dữ liệu',
        zeroRecords: 'Không có bản ghi nào được tìm thấy'
      }
    };
  }

  ngOnDestroy() {
    // Do not forget to unsubscribe
    this.dtTrigger.unsubscribe();
  }

  stopCustomer(cus) {
    this.spinner.show();
    const statusCus = {
      FullName: cus.FullName,
      UserName: cus.UserName,
      Phone: cus.Phone,
      Address: cus.Address,
      Active: !cus.Active,
      Password: cus.Password
    }
    this.cusService.updateCus(cus.CusId, statusCus).subscribe(res => {
      this.cusService.getAllCus().subscribe((updateList: any) => {
        this.spinner.hide();
        this.listCustomer = updateList.results;
        this.rerender();
      });
      console.log('Change status successfully!');
    }, err => {
      console.log('Update fail');
    });
  }

  viewEmpImg(image: string) {
    this.url = image;
    this.dialog.open(this.img, {
      width: '50%',
      height: '85%',
      autoFocus: true,
      disableClose: true
    });
  }

  closeModalImg() {
    this.dialog.closeAll();
  }
}
