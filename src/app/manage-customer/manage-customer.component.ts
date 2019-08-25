import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import Swal from 'sweetalert2'

import { Customer } from '../models/customer.model';

declare interface DataTable {
  headerRow: string[];
  dataRows: Customer[];
}

declare const $: any;

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent implements OnInit, AfterViewInit {

  public dataTable: DataTable;
  listCustomer: Customer[];
  addForm: FormGroup;
  isUpdate: boolean;
  hide: boolean;

  constructor() { }

  ngOnInit() {
    this.listCustomer = [
      {
        id: 1,
        fullname: 'Trần Thị Minh',
        image: '',
        phone: '096936396',
        username: 'ttm',
        email: 'minh@yopmail.com',
        password: '12345678',
        address: 'Ngõ 165, phố chợ Khâm Thiên, Đống Đa, Hà Nội',
        active: true
      },
      {
        id: 2,
        fullname: 'Trần Thị Huyền',
        image: '',
        phone: '096936396',
        username: 'ttm',
        email: 'huyen@yopmail.com',
        password: '12345678',
        address: 'Ngõ 165, phố chợ Khâm Thiên, Đống Đa, Hà Nội',
        active: false
      }
    ]
    this.dataTable = {
      headerRow: [
        'Mã khách hàng', 'Họ và tên', 'Tên đăng nhập', 'Email', 'Địa chỉ', 'SĐT', 'Trạng thái', ''
      ],
      dataRows: this.listCustomer
    };
  }

  ngAfterViewInit() {
    $('#datatables').DataTable({
      'pagingType': 'full_numbers',
      'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
      'order': [[0, 'desc']],
      'columnDefs': [{
        'targets': [1, 2, 3, 4, 5, 6, 7], /* column index */
        'orderable': false, /* true or false */
      },
    ],
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
        search: '_INPUT_',
        searchPlaceholder: 'Tìm kiếm khách hàng',
        emptyTable: 'Không có dữ liệu',
        lengthMenu: 'Hiển thị _MENU_ bản ghi',
        zeroRecords: 'Không có bản ghi nào phù hợp'
      }
    });
  }
}
