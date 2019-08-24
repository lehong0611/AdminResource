import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import Swal from 'sweetalert2'

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
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

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dataTable = {
      headerRow: ['Mã nhân viên', 'Họ và tên', 'Tên đăng nhập', 'Email', 'SĐT', 'Vai trò', 'Mã đại lý', 'Trạng thái', 'Hành động'],
      footerRow: ['Name', 'Position', 'Office', 'Age', 'Start Date', 'Actions'],

      dataRows: [
        ['A1', 'Airi Satou', 'Andrew Mike', 'Develop', '2013', '', 'active'],
        ['Angelica Ramos', 'John Doe', 'Design', '2012', 'btn-round', 'active'],
        ['Ashton Cox', 'Alex Mike', 'Design', '2010', 'btn-simple', 'active'],
        ['Bradley Greer', 'Mike Monday', 'Marketing', '2013', 'btn-round', 'active'],
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
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      Role: ['', Validators.required],
      image: ['', Validators.required],
      agency: ['', Validators.required],
      active: [true, Validators.required]
    });
  }

  ngAfterViewInit() {
    $('#datatables').DataTable({
      'pagingType': 'full_numbers',
      'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
      'order': [[1, 'asc']],
      'columnDefs': [{
        'targets': [0, 3, 5, 6, 7], /* column index */
        'orderable': false, /* true or false */
      }],
      'info': false,
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Tìm kiếm nhân viên',
        emptyTable: 'Không bản ghi nào được tìm thấy',
        lengthMenu: 'Hiển thị _MENU_ bản ghi',
      }
    });
  }

  openDialogAdd(item) {
    this.isUpdate = false;
    if (item) {
      this.isUpdate = true;
    }
    this.dialog.open(this.addEmployee, {
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

}
