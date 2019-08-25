import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Fee } from '../models/fee.model';

declare interface DataTable {
  headerRow: string[];
  dataRows: Fee[];
}
declare const $: any;

@Component({
  selector: 'app-manage-fee',
  templateUrl: './manage-fee.component.html',
  styleUrls: ['./manage-fee.component.scss']
})
export class ManageFeeComponent implements OnInit {

  @ViewChild('addFee', { static: true }) addFee: TemplateRef<any>;
  dataTableForTransfer: DataTable;
  dataTableForTaken: DataTable;
  listFeeForTransfer: Fee[];
  listFeeForTaken: Fee[];
  addForm: FormGroup;
  isUpdate: boolean;
  listWeigh: string[] = [
    'Nhỏ hơn 1', 'Từ 1 tới nhỏ hơn 2', 'Từ 2 tới nhỏ hơn 3', 'Từ 3 tới nhỏ hơn 4',
    'Từ 4 tới nhỏ hơn 5', 'Từ 5 tới nhỏ hơn 6', 'Từ 6 tới nhỏ hơn 7', 'Từ 7 tới nhỏ hơn 8',
    'Từ 8 tới nhỏ hơn 9', 'Từ 9 tới nhỏ hơn 10', 'Từ 10 tới 15'
  ];
  listAreas: string[] = [
    'Nội tỉnh', 'Nội vùng', 'Liên vùng', 'Nội thành', 'Ngoại thành'
  ];
  listDistance: string[] = [
    'Nhỏ hơn hoặc bằng 5', 'Lớn hơn 5 tới 10', 'Lớn hơn 10 tới 15',
    'Lớn hơn 15 tới 20', 'Lớn hơn 20 tới 30', 'Lớn hơn 30 tới 50',
    'Lớn hơn 50 tới 70', 'Lớn hơn 70 tới 100'
  ];
  filteredWeigh: string[];
  isTaken: boolean;

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.listFeeForTransfer = [
      {
        id: 1,
        weigh: 'Nhỏ hơn 1',
        distance: 'Nội tỉnh',
        service: 'Chuẩn',
        value: 10000,
        type: 'Giao hàng'
      },
      {
        id: 2,
        weigh: 'Nhỏ hơn 1',
        distance: 'Nội vùng',
        service: 'Chuẩn',
        value: 10000,
        type: 'Giao hàng'
      }
    ];
    this.listFeeForTaken = [
      {
        id: 1,
        weigh: 'Nhỏ hơn 1',
        distance: 'Nhỏ hơn hoặc bằng 5',
        service: 'Chuẩn',
        value: 10000,
        type: 'Lấy hàng'
      },
      {
        id: 2,
        weigh: 'Nhỏ hơn 1',
        distance: 'Lớn hơn 5 tới 10',
        service: 'Chuẩn',
        value: 11000,
        type: 'Lấy hàng'
      }
    ];
    this.dataTableForTransfer = {
      headerRow: ['Mã biểu phí', 'Khối lượng', 'Khoảng cách', 'Dịch vụ', 'Hình thức', 'Giá trị', ''],
      dataRows: this.listFeeForTransfer
    };
    this.dataTableForTaken = {
      headerRow: ['Mã biểu phí', 'Khối lượng', 'Khoảng cách', 'Dịch vụ', 'Hình thức', 'Giá trị', ''],
      dataRows: this.listFeeForTaken
    };

    this.addForm = this.formBuilder.group({
      weigh: ['', Validators.required],
      distance: ['', Validators.required],
      service: ['Chuẩn', Validators.required],
      type: ['Giao hàng', Validators.required],
      value: [null, Validators.required]
    });
  }

  ngAfterViewInit() {
    $('.datatables').DataTable({
      'pagingType': 'full_numbers',
      'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
      'order': [[0, 'desc']],
      'columnDefs': [
        {
          'targets': [1, 2, 3, 4, 5, 6],
          'orderable': false,
        },
      ],
      'info': false,
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Tìm kiếm biểu phí',
        emptyTable: 'Không có dữ liệu',
        lengthMenu: 'Hiển thị _MENU_ bản ghi',
        zeroRecords: 'Không có bản ghi nào phù hợp'
      },
    });
  }

  openDialogAdd(isTaken: boolean, item: Fee) {
    this.isTaken = isTaken;
    this.isUpdate = false;
    if (item) {
      this.isUpdate = true;
      this.addForm.controls['weigh'].setValue(item.weigh);
      this.addForm.controls['distance'].setValue(item.distance);
      this.addForm.controls['service'].setValue(item.service);
      this.addForm.controls['type'].setValue(item.type);
      this.addForm.controls['value'].setValue(item.value);
    } else {
      this.addForm.controls['weigh'].setValue('');
      this.addForm.controls['distance'].setValue('');
      this.addForm.controls['service'].setValue('Chuẩn');
      this.addForm.controls['type'].setValue('Giao hàng');
      this.addForm.controls['value'].setValue(null);
    }
    this.dialog.open(this.addFee, {
      width: '45%',
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
