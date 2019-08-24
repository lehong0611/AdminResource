import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { User } from '../models/user.model';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
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
  listAdmin: User[];

  filteredOptions: Observable<User[]>;

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dataTable = {
      headerRow: ['Mã đại lý', 'Tên đại lý', 'Địa chỉ', 'SĐT', 'Trạng thái'],
      footerRow: ['Name', 'Position', 'Office', 'Age', 'Start Date', 'Actions'],

      dataRows: [
        ['ĐL1', 'Andrew Mike', 'Develop', '2013', 'Active'],
        ['Angelica Ramos', 'John Doe', 'Design', '2012', 'btn-round'],
        ['Ashton Cox', 'Alex Mike', 'Design', '2010', 'btn-simple'],
        ['Bradley Greer', 'Mike Monday', 'Marketing', '2013', 'btn-round'],
        ['Brenden Wagner', 'Paul Dickens', 'Communication', '2015', ''],
        ['Brielle Williamson', 'Mike Monday', 'Marketing', '2013', 'btn-round'],
        ['Caesar Vance', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Cedric Kelly', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Charde Marshall', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Colleen Hurst', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Dai Rios', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
        ['Doris Wilder', 'John Doe', 'Design', '2012', '89,241', 'btn-round'],
        ['Fiona Green', 'Alex Mike', 'Design', '2010', '92,144', 'btn-simple'],
        ['Garrett Winters', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Gavin Cortez', 'Paul Dickens', 'Communication', '2015', '69,201', ''],
        ['Gavin Joyce', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Gloria Little', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Haley Kennedy', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Herrod Chandler', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Hope Fuentes', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Howard Hatfield', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
        ['Jena Gaines', 'John Doe', 'Design', '2012', '89,241', 'btn-round'],
        ['Jenette Caldwell', 'Alex Mike', 'Design', '2010', '92,144', 'btn-simple'],
        ['Jennifer Chang', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Martena Mccray', 'Paul Dickens', 'Communication', '2015', '69,201', ''],
        ['Michael Silva', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Michelle House', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Paul Byrd', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Prescott Bartlett', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Quinn Flynn', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Rhona Davidson', 'Andrew Mike', 'Develop', '2013', '99,225', ''],
        ['Shou Itou', 'John Doe', 'Design', '2012', '89,241', 'btn-round'],
        ['Sonya Frost', 'Alex Mike', 'Design', '2010', '92,144', 'btn-simple'],
        ['Suki Burks', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Tatyana Fitzpatrick', 'Paul Dickens', 'Communication', '2015', '69,201', ''],
        ['Tiger Nixon', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Timothy Mooney', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Unity Butler', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Vivian Harrell', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round'],
        ['Yuri Berry', 'Mike Monday', 'Marketing', '2013', '49,990', 'btn-round']
      ]
    };
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      admin: ['', Validators.required],
      active: ['true', Validators.required]
    });
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
        fullname: 'Nguyễn Văn Hoàn',
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
    this.filteredOptions['fullname'] = this.addForm.get('admin').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    console.log(this.filteredOptions);
  }

  ngAfterViewInit() {
    $('#datatables').DataTable({
      'pagingType': 'full_numbers',
      'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
      'order': [[1, 'asc']],
      'columnDefs': [{
        'targets': [0, 2, 3, 4], /* column index */
        'orderable': false, /* true or false */
      }],
      'info': false,
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Tìm kiếm đại lý',
        emptyTable: 'Không bản ghi nào được tìm thấy',
        lengthMenu: 'Hiển thị _MENU_ bản ghi',
      }
    });

    const table = $('#datatables').DataTable();

    // Delete a record
    // table.on('click', '.remove', function (e: any) {
    //   const $tr = $(this).closest('tr');
    //   table.row($tr).remove().draw();
    //   e.preventDefault();
    // });
  }

  openDialogAdd(item) {
    this.isUpdate = false;
    if (item) {
      this.isUpdate = true;
    }
    this.dialog.open(this.addAgency, {
      width: '40%',
      autoFocus: true,
      disableClose: true
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.listAdmin['fullname'].filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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
}
