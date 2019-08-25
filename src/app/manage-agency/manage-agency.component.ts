import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Agency } from '../models/agency.model';

declare interface DataTable {
  headerRow: string[];
  dataRows: Agency[];
}

declare const $: any;

@Component({
  selector: 'app-manage-agency',
  templateUrl: './manage-agency.component.html',
  styleUrls: ['./manage-agency.component.scss']
})
export class ManageAgencyComponent implements OnInit, AfterViewInit {

  @ViewChild('addAgency', { static: true }) addAgency: TemplateRef<any>;
  public dataTable: DataTable;
  addForm: FormGroup;
  isUpdate: boolean;
  listAgency: Agency[];
  listAdmin: User[];

  filteredOptions: User[];

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.listAdmin = [
      {
        id: 1,
        fullname: 'Nguyễn Văn Đức',
        image: '',
        phone: '0123456789',
        username: 'ducnv',
        email: 'nguyenvanduc@yopmail.com',
        password: '12345678',
        role: 'Admin',
        active: true,
        agencyId: 2
      },
      {
        id: 2,
        fullname: 'Đặng Văn Hoàn',
        image: '',
        phone: '0123456789',
        username: 'ducnv',
        email: 'nguyenvanhoan@yopmail.com',
        password: '12345678',
        role: 'Admin',
        active: true,
        agencyId: 2
      },
      {
        id: 3,
        fullname: 'Đặng Văn Quyết',
        image: '',
        phone: '0123456789',
        username: 'ducnv',
        email: 'nguyenvanhoan@yopmail.com',
        password: '12345678',
        role: 'Admin',
        active: true,
        agencyId: 2
      }
    ];
    this.listAgency = [
      {
        id: 1,
        name: 'Đại lý Hà Nội',
        address: 'số 1, Trung Hòa, Cầu giấy, Hà Nội',
        phone: '04 0233662',
        admin: 'Nguyễn Văn Đức',
        active: true
      },
      {
        id: 2,
        name: 'Đại lý Hà Nội',
        address: 'số 1, Trung Hòa, Cầu giấy, Hà Nội',
        phone: '04 0233662',
        admin: 'Nguyễn Văn Hoàn',
        active: true
      },
      {
        id: 3,
        name: 'Đại lý Hà Nội',
        address: 'số 1, Trung Hòa, Cầu giấy, Hà Nội',
        phone: '04 0233662',
        admin: 'Đặng Văn Quyết',
        active: false
      }
    ];
    this.dataTable = {
      headerRow: ['Mã đại lý', 'Tên đại lý', 'Địa chỉ', 'SĐT', 'Admin', 'Trạng thái', ''],

      dataRows: this.listAgency
    };

    console.log(this.dataTable.dataRows);
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      admin: ['', Validators.required],
      active: ['true', Validators.required]
    });
    this.addForm.get('admin').valueChanges.subscribe((res: any) => {
      this.filteredOptions = this._filter(res);
      console.log(this.filteredOptions);
    });
  }

  ngAfterViewInit() {
    $('#datatables').DataTable({
      'pagingType': 'full_numbers',
      'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
      'order': [[0, 'desc']],
      'columnDefs': [
        {
          'targets': [1, 2, 3, 4, 5, 6], /* column index */
          'orderable': false, /* true or false */
        },
        { 'width': '15%', 'targets': 1 },
        { 'width': '30%', 'targets': 2 },
        { 'width': '10%', 'targets': 3 },
        { 'width': '15%', 'targets': 4 },
        { 'width': '10%', 'targets': 5 },
        { 'width': '20%', 'targets': 6 }
      ],
      'createdRow': function (row, data, dataIndex) {
        if (data[5] === 'Active') {
          $(row).css('background-color', '#fff');
        } else {
          $(row).css('background-color', '#eee');
        }
      },
      'info': false,
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Tìm kiếm đại lý',
        emptyTable: 'Không có dữ liệu',
        lengthMenu: 'Hiển thị _MENU_ bản ghi',
        zeroRecords: 'Không có bản ghi nào phù hợp'
      },
    });
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.listAdmin.filter(option => option['fullname'].toLowerCase().indexOf(filterValue) === 0);
  }

  openDialogAdd(item: Agency) {
    this.isUpdate = false;
    if (item) {
      console.log(item);
      this.isUpdate = true;
      this.addForm.controls['name'].setValue(item.name);
      this.addForm.controls['address'].setValue(item.address);
      this.addForm.controls['phone'].setValue(item.phone);
      this.addForm.controls['active'].setValue(item.active ? 'true' : 'false');
      this.addForm.controls['admin'].setValue(item.admin);
    } else {
      this.addForm.controls['name'].setValue('');
      this.addForm.controls['address'].setValue('');
      this.addForm.controls['phone'].setValue('');
      this.addForm.controls['active'].setValue('true');
      this.addForm.controls['admin'].setValue('');
    }
    this.dialog.open(this.addAgency, {
      width: '40%',
      autoFocus: true,
      disableClose: true
    });
  }

  openDeleteDialog() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Xác nhận xóa?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire('Đã xóa')
      }
    })
  }

  openStopDialog() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Bạn chắc chắn muốn dừng hoạt động đại lý này?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire('Chặn hoạt động thành công')
      }
    })
  }

  openInfoAdmin() { }
}
