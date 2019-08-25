import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import Swal from 'sweetalert2'

import { User } from '../models/user.model';

declare interface DataTable {
  headerRow: string[];
  dataRows: User[];
}

declare const $: any;

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent implements OnInit, AfterViewInit {

  @ViewChild('addEmployee', { static: true }) addEmployee: TemplateRef<any>;
  public dataTable: DataTable;
  addForm: FormGroup;
  isUpdate: boolean;
  listEmployee: User[];
  hide: boolean;
  constructor(private dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.hide = true;
    this.listEmployee = [
      {
        id: 1,
        fullname: 'Phạm Thị Bích',
        image: '',
        phone: '0123456789',
        username: 'ptb',
        email: 'bic@yopmail.com',
        password: '12345678',
        role: 'Nhân viên',
        active: true,
        agencyId: 1
      },
      {
        id: 2,
        fullname: 'Phạm Thị Bích',
        image: '',
        phone: '0123456789',
        username: 'ptb',
        email: 'bic@yopmail.com',
        password: '12345678',
        role: 'Nhân viên',
        active: true,
        agencyId: 1
      }
    ]
    this.dataTable = {
      headerRow: [
        'Mã nhân viên', 'Họ và tên', 'Tên đăng nhập', 'Email', 'SĐT', 'Chức vụ', 'Thuộc đại lý', 'Trạng thái', 'image', 'password', ''
      ],
      dataRows: this.listEmployee
    };
    this.addForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required, Validators.minLength(8)
      ])],
      phone: ['', Validators.required],
      role: ['', Validators.required],
      image: ['', Validators.required],
      agency: [null],
      active: ['true', Validators.required]
    });
  }

  ngAfterViewInit() {
    $('#datatables').DataTable({
      'pagingType': 'full_numbers',
      'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
      'order': [ [0, 'desc'] ],
      'columnDefs': [
        {
          'targets': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], /* column index */
          'orderable': false, /* true or false */
        },
      ],
      'createdRow': function (row, data, dataIndex) {
        if (data[7] === 'Active') {
          $(row).css('background-color', '#fff');
        } else {
          $(row).css('background-color', '#eee');
        }
      },
      'info': false,
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Tìm kiếm nhân viên',
        emptyTable: 'Không có dữ liệu',
        lengthMenu: 'Hiển thị _MENU_ bản ghi',
        zeroRecords: 'Không có bản ghi nào phù hợp'
      }
    });
  }

  openDialogAdd(item: User) {
    this.isUpdate = false;
    if (item) {
      this.isUpdate = true;
      this.addForm.controls['fullname'].setValue(item.fullname);
      this.addForm.controls['username'].setValue(item.username);
      this.addForm.controls['email'].setValue(item.email);
      this.addForm.controls['phone'].setValue(item.phone);
      this.addForm.controls['password'].setValue(item.password);
      this.addForm.controls['agency'].setValue(item.agencyId);
      this.addForm.controls['role'].setValue(item.role);
      this.addForm.controls['active'].setValue(item.active ? 'true' : 'false');
    } else {
      this.addForm.controls['fullname'].setValue('');
      this.addForm.controls['username'].setValue('');
      this.addForm.controls['email'].setValue('');
      this.addForm.controls['phone'].setValue('');
      this.addForm.controls['password'].setValue('');
      this.addForm.controls['agency'].setValue(null);
      this.addForm.controls['role'].setValue('');
      this.addForm.controls['active'].setValue('true');
    }
    this.dialog.open(this.addEmployee, {
      width: '80%',
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

}
