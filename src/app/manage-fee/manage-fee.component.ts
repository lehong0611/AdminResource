import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { FeeService } from 'app/services/fee.service';

declare const $: any;

const typeFee = {
  'Lấy hàng': 0,
  'Giao hàng': 1
}

@Component({
  selector: 'app-manage-fee',
  templateUrl: './manage-fee.component.html',
  styleUrls: ['./manage-fee.component.scss']
})
export class ManageFeeComponent implements OnInit, OnDestroy {

  @ViewChild('addFee', { static: true }) addFee: TemplateRef<any>;

  // Setting datatables
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  listFees: any[];
  addForm: FormGroup;
  isUpdate: boolean;
  listWeigh: any[] = [
    { value: 0, text: 'Nhỏ hơn 1 Kg' },
    { value: 1, text: 'Từ 1 tới nhỏ hơn 2 Kg' },
    { value: 2, text: 'Từ 2 tới nhỏ hơn 3 Kg' },
    { value: 3, text: 'Từ 3 tới nhỏ hơn 4 Kg' },
    { value: 4, text: 'Từ 4 tới nhỏ hơn 5 Kg' },
    { value: 5, text: 'Từ 5 tới nhỏ hơn 6 Kg' },
    { value: 6, text: 'Từ 6 tới nhỏ hơn 7 Kg' },
    { value: 7, text: 'Từ 7 tới nhỏ hơn 8 Kg' },
    { value: 8, text: 'Từ 8 tới nhỏ hơn 9 Kg' },
    { value: 9, text: 'Từ 9 tới nhỏ hơn 10 Kg' },
    { value: 10, text: 'Từ 10 tới 15 Kg' }
  ];

  listDistances: any = {
    listAreas: [
      { value: 0, text: 'Nội tỉnh' },
      { value: 1, text: 'Nội vùng' },
      { value: 2, text: 'Liên vùng' },
      { value: 3, text: 'Nội thành' },
      { value: 4, text: 'Ngoại thành' }
    ],
    listDis: [
      { value: 0, text: 'Nhỏ hơn hoặc bằng 5 Km' },
      { value: 1, text: 'Lớn hơn 5 tới 10 Km' },
      { value: 2, text: 'Lớn hơn 10 tới 15 Km' },
      { value: 3, text: 'Lớn hơn 15 tới 20 Km' },
      { value: 4, text: 'Lớn hơn 20 tới 30 Km' },
      { value: 5, text: 'Lớn hơn 30 tới 50 Km' },
      { value: 6, text: 'Lớn hơn 50 tới 70 Km' },
      { value: 7, text: 'Lớn hơn 70 tới 100 Km' }
    ]
  }

  listKindOfOrder = [
    {value: 0, text: 'Thời trang - Phụ kiện'},
    {value: 1, text: 'Sức khỏe - Làm đẹp'},
    {value: 2, text: 'Hàng tiêu dùng - Thực phẩm'},
    {value: 3, text: 'Phụ kiện - Thiết bị số - Thiết bị điện tử'},
    {value: 4, text: 'Hàng gia dụng - Cơ khí'},
    {value: 5, text: 'Văn phòng phẩm - Thủ công'}
  ]

  filteredWeigh: string[];
  isTaken: boolean;

  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private chRef: ChangeDetectorRef,
    private feeService: FeeService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getAllFee();

    this.addForm = this.formBuilder.group({
      FeeId: [null],
      Weigh: [null, Validators.required],
      Distance: [null, Validators.required],
      Service: ['Chuẩn', Validators.required],
      Type: ['1', Validators.required],
      Value: [null, Validators.required],
      Kind: ['0', Validators.required],
      EstimateTime: [null, Validators.required]
    });
    this.initTable();
    this.isTaken = false;
  }

  initTable() {
    this.dtOptions = {
      'pagingType': 'full_numbers',
      'lengthChange': false,
      'ordering': false,
      'info': false,
      responsive: true,
      language: {
        search: 'Tìm kiếm',
        emptyTable: 'Không có dữ liệu',
        zeroRecords: 'Không có bản ghi nào được tìm thấy'
      },
    };
  }

  getAllFee() {
    this.feeService.getAllFee().subscribe((res: any) => {
      this.listFees = res.results;
      this.chRef.detectChanges();
      this.dtTrigger.next();
    })
  }

  openDialogAdd(item?: any) {
    this.isUpdate = false;
    if (item) {
      this.isUpdate = true;
      this.addForm.controls['FeeId'].setValue(item.FeeId);
      this.addForm.controls['Weigh'].setValue(item.Weigh);
      this.addForm.controls['Distance'].setValue(item.Distance);
      this.addForm.controls['Service'].setValue(item.Service);
      this.addForm.controls['Type'].setValue(item.Type.toString());
      this.addForm.controls['Value'].setValue(item.Value);
      this.addForm.controls['Kind'].setValue(item.Kind);
      this.addForm.controls['EstimateTime'].setValue(item.EstimateTime);
    } else {
      this.addForm.controls['Weigh'].setValue('');
      this.addForm.controls['Distance'].setValue('');
      this.addForm.controls['Service'].setValue('Chuẩn');
      this.addForm.controls['Type'].setValue('1');
      this.addForm.controls['Value'].setValue(null);
      this.addForm.controls['Kind'].setValue('1');
      this.addForm.controls['EstimateTime'].setValue(null);
    }
    this.dialog.open(this.addFee, {
      width: '45%',
      // autoFocus: true,
      disableClose: true
    });
  }

  openDeleteDialog(id) {
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
        this.feeService.deleteFee(id).subscribe(res => {
          this.feeService.getAllFee().subscribe((newList: any) => {
            this.listFees = newList.results;
            swalWithBootstrapButtons.fire('Đã xóa')
            this.rerender();
          });
          console.log('Fee is deleted');
        }, err => {
          console.log('Could not delete')
        });
      }
    })
  }

  saveFee() {
    this.spinner.show();
    const newFee = this.addForm.value;
    this.feeService.createFee(newFee).subscribe(res => {
      this.feeService.getAllFee().subscribe((newList: any) => {
        this.spinner.hide();
        this.listFees = newList.results;
        this.dialog.closeAll();
        this.addForm.reset();
        this.rerender();
      });
    })
  }

  updateFee() {
    this.spinner.show();
    const id = this.addForm.get('FeeId').value;
    const updateFee = this.addForm.value;
    this.feeService.updateFee(id, updateFee).subscribe((res: any) => {
      this.feeService.getAllFee().subscribe((updateList: any) => {
        this.spinner.hide();
        this.listFees = updateList.results;
        this.dialog.closeAll();
        this.addForm.reset();
        this.rerender();
      })
    })
  }

  select(event) {
    if (parseInt(event.value, 10) === typeFee['Lấy hàng']) {
      this.isTaken = true;
    } else {
      this.isTaken = false;
    }
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first in the current context
      dtInstance.destroy();

      // Call the dtTrigger to rerender again
      this.dtTrigger.next();

    });
  }

  ngOnDestroy() {
    // Do not forget to unsubscribe
    this.dtTrigger.unsubscribe();
  }

  bindWeigh(weigh) {
    switch (weigh) {
      case 0:
        return 'Nhỏ hơn 1 Kg';
      case 1:
        return 'Từ 1 tới nhỏ hơn 2 Kg';
      case 2:
        return 'Từ 2 tới nhỏ hơn 3 Kg';
      case 3:
        return 'Từ 3 tới nhỏ hơn 4 Kg';
      case 4:
        return 'Từ 4 tới nhỏ hơn 5 Kg';
      case 5:
        return 'Từ 5 tới nhỏ hơn 6 Kg';
      case 6:
        return 'Từ 6 tới nhỏ hơn 7 Kg';
      case 7:
        return 'Từ 7 tới nhỏ hơn 8 Kg';
      case 8:
        return 'Từ 8 tới nhỏ hơn 9 Kg';
      case 9:
        return 'Từ 9 tới nhỏ hơn 10 Kg';
      default:
        return 'Từ 10 tới 15 Kg';
    }
  }

  bindAreas(dis) {
    switch (dis) {
      case 0:
        return 'Nội tỉnh';
      case 1:
        return 'Nội vùng';
      case 2:
        return 'Liên vùng';
      case 3:
        return 'Nội thành';
      default:
        return 'Ngoại thành'
    }
  }

  bindDis(dis) {
    switch (dis) {
      case 0:
        return 'Nhỏ hơn hoặc bằng 5 Km';
      case 1:
        return 'Lớn hơn 5 tới 10 Km';
      case 2:
        return 'Lớn hơn 10 tới 15 Km';
      case 3:
        return 'Lớn hơn 15 tới 20 Km';
      case 4:
        return 'Lớn hơn 20 tới 30 Km';
      case 5:
        return 'Lớn hơn 30 tới 50 Km';
      case 6:
        return 'Lớn hơn 50 tới 70 Km';
      default:
        return 'Lớn hơn 70 tới 100 Km'
    }
  }

  closeDialog() {
    this.dialog.closeAll();
    this.addForm.reset();
  }

  bindKindOrder(text) {
    switch (text) {
      case 0:
        return 'Thời trang - Phụ kiện';
      case 1:
        return 'Sức khỏe - Làm đẹp';
      case 2:
        return 'Hàng tiêu dùng - Thực phẩm';
      case 3:
        return 'Phụ kiện - Thiết bị số - Thiết bị điện tử';
      case 4:
        return 'Hàng gia dụng - Cơ khí';
      default:
        return 'Văn phòng phẩm - Thủ công'
    }
  }
}
