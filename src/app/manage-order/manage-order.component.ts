import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table'
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


import { Order } from '../models/order.model';
import { Customer } from '../models/customer.model';

declare interface dataTable {
  headerRow: string[];
  dataRows: any[];
}
declare const $: any;

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('detailOrder', { static: true }) detailOrder: TemplateRef<any>;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dataTableForWaiting: dataTable;
  dataTable: dataTable;
  dtOptions: DataTables.Settings = {};
  dtTable: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isDtInitialized = false;
  // start fake data
  listWaiting: any[];
  listAllOrders: Order[];
  listNewOrders: Order[];
  listTransferOrders: Order[];
  listSuccessOrders: Order[];
  listFailOrders: Order[];
  listReTransferOrders: Order[];
  // end fake data
  isUserSupper: true;
  Order: Order;
  listCustomer: Customer[];
  isReject: any;
  listStatus: any[] = [
    { value: '0', title: 'Tất cả' },
    { value: '1', title: 'Mới tạo' },
    { value: '2', title: 'Đang giao' },
    { value: '3', title: 'Thành công' },
    { value: '4', title: 'Thất bại' },
    { value: '5', title: 'Chờ giao lại' },
  ];
  status: any;

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.listWaiting = [
      {
        id: 1,
        code: 'AB12GH32',
        sendername: 'Phạm Thị Ngọc',
        senderphone: '0969145669',
        senderaddress: '206 Bạch Mai, Hai Bà Trưng, Hà Nội',
        recievername: 'Hoàng Thị Bé',
        recieverphone: '0936333215',
        recieveraddress: '326 Lê Duẩn, Đóng Đa, Hà Nội',
        weigh: '0.2',
        kind: 'Thời trang',
        service: 'Chuẩn',
        note: '',
        createdUserId: 2,
        // createdUserName: '',
        createdUserPhone: '',
        createdTime: '15:00pm, 26-8-2019',
        shipperTaken: undefined,
        addressTaken: '206 Bạch Mai, Hai Bà Trưng, Hà Nội',
        shipperTransfer: undefined,
        status: 'waiting',
        estimateTime: '',
        reasonReject: '',
        total: 25000
      },
      {
        id: 2,
        code: 'AB12GH32',
        sendername: 'Phạm Thị Ngọc',
        senderphone: '0969145669',
        senderaddress: '206 Bạch Mai, Hai Bà Trưng, Hà Nội',
        recievername: 'Hoàng Thị Bé',
        recieverphone: '0936333215',
        recieveraddress: '326 Lê Duẩn, Đóng Đa, Hà Nội',
        weigh: '0.2',
        kind: 'Đồ gốm',
        service: 'Chuẩn',
        note: 'Hàng dễ vỡ',
        createdUserId: 2,
        // createdUserName: '',
        createdUserPhone: '',
        createdTime: '15:00pm, 26-8-2019',
        shipperTaken: undefined,
        addressTaken: '206 Bạch Mai, Hai Bà Trưng, Hà Nội',
        shipperTransfer: undefined,
        status: 'waiting',
        estimateTime: '',
        reasonReject: '',
        total: 35000
      }
    ];
    this.listAllOrders = [
      {
        id: 1,
        code: 'AB12GH32',
        sendername: 'Phạm Thị Ngọc',
        senderphone: '0969145669',
        senderaddress: '206 Bạch Mai, Hai Bà Trưng, Hà Nội',
        recievername: 'Hoàng Thị Bé',
        recieverphone: '0936333215',
        recieveraddress: '326 Lê Duẩn, Đóng Đa, Hà Nội',
        weigh: '0.2',
        kind: 'Thời trang',
        service: 'Chuẩn',
        note: '',
        createdUserId: 2,
        createdUserName: '',
        customerPhone: '',
        acceptUserId: null,
        createdTime: '15:00pm, 26-8-2019',
        shipperTaken: undefined,
        addressTaken: '206 Bạch Mai, Hai Bà Trưng, Hà Nội',
        shipperTransfer: undefined,
        status: 'waiting',
        estimateTime: '',
        reasonReject: '',
        total: undefined
      },
      {
        id: 2,
        code: 'AB12GH32',
        sendername: 'Phạm Thị Ngọc',
        senderphone: '0969145669',
        senderaddress: '206 Bạch Mai, Hai Bà Trưng, Hà Nội',
        recievername: 'Hoàng Thị Bé',
        recieverphone: '0936333215',
        recieveraddress: '326 Lê Duẩn, Đóng Đa, Hà Nội',
        weigh: '0.2',
        kind: 'Đồ gốm',
        service: 'Chuẩn',
        note: 'Hàng dễ vỡ',
        createdUserId: 2,
        createdUserName: '',
        customerPhone: '',
        acceptUserId: null,
        createdTime: '15:00pm, 26-8-2019',
        shipperTaken: undefined,
        addressTaken: '206 Bạch Mai, Hai Bà Trưng, Hà Nội',
        shipperTransfer: undefined,
        status: 'waiting',
        estimateTime: '1 ngày',
        reasonReject: '',
        total: undefined
      }
    ];
    this.listNewOrders = [
      {
        id: 1,
        code: 'AB12GH32',
        sendername: 'Phạm Thị Ngọc',
        senderphone: '0969145669',
        senderaddress: '206 Bạch Mai, Hai Bà Trưng, Hà Nội',
        recievername: 'Hoàng Thị Bé',
        recieverphone: '0936333215',
        recieveraddress: '326 Lê Duẩn, Đóng Đa, Hà Nội',
        weigh: '0.2',
        kind: 'Thời trang',
        service: 'Chuẩn',
        note: '',
        createdUserId: 2,
        createdUserName: '',
        customerPhone: '',
        acceptUserId: null,
        createdTime: '15:00pm, 26-8-2019',
        shipperTaken: undefined,
        addressTaken: '206 Bạch Mai, Hai Bà Trưng, Hà Nội',
        shipperTransfer: undefined,
        status: 'new',
        estimateTime: '',
        reasonReject: '',
        total: undefined
      },
      {
        id: 2,
        code: 'AB12GH32',
        sendername: 'Phạm Thị Ngọc',
        senderphone: '0969145669',
        senderaddress: '206 Bạch Mai, Hai Bà Trưng, Hà Nội',
        recievername: 'Hoàng Thị Bé',
        recieverphone: '0936333215',
        recieveraddress: '326 Lê Duẩn, Đóng Đa, Hà Nội',
        weigh: '0.2',
        kind: 'Đồ gốm',
        service: 'Chuẩn',
        note: 'Hàng dễ vỡ',
        createdUserId: 2,
        createdUserName: '',
        customerPhone: '',
        acceptUserId: null,
        createdTime: '15:00pm, 26-8-2019',
        shipperTaken: undefined,
        addressTaken: '206 Bạch Mai, Hai Bà Trưng, Hà Nội',
        shipperTransfer: undefined,
        status: 'new',
        estimateTime: '1 ngày',
        reasonReject: '',
        total: undefined
      }
    ];
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
    ];
    this.dataTableForWaiting = {
      headerRow: [
        'Id', 'Mã Code', 'Người tạo đơn', 'Thời gian tạo', 'Địa điểm lấy hàng', 'Tổng phí vận chuyển', ''
      ],
      dataRows: this.listWaiting
    };
    this.onFilter(0);
    this.listWaiting.forEach(item => {
      this.listCustomer.forEach(customer => {
        if (item.createdUserId === customer.id) {
          item.createdUserName = customer.fullname;
          item.customerPhone = customer.phone;
        }
      })
    })
    this.initTable();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.on('draw.dt', function () {
        if (jQuery('.dataTables_empty').length > 0) {
          jQuery('.dataTables_empty').remove();
        }
      });
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  initTable() {
    this.dtOptions = {
      'pagingType': 'full_numbers',
      'lengthChange': false,
      'order': [[0, 'desc']],
      'columnDefs': [
        {
          'targets': [1, 2, 3, 4, 5, 6],
          'orderable': false,
        },
      ],
      responsive: true,
      language: {
        search: 'Tìm kiếm:',
        emptyTable: 'Không có dữ liệu',
        zeroRecords: 'Không có bản ghi nào phù hợp',
        infoFiltered: '',
        info: 'Hiển thị _START_ tới _END_ của _TOTAL_ bản ghi'
      },
    };
    this.dtTable = {
      'pagingType': 'full_numbers',
      'lengthChange': false,
      'order': [[1, 'desc']],
      'columnDefs': [
        {
          'targets': [0, 2, 3, 4, 5, 6],
          'orderable': false,
        },
      ],
      responsive: true,
      language: {
        search: 'Tìm kiếm:',
        emptyTable: 'Không có dữ liệu',
        zeroRecords: 'Không có bản ghi nào phù hợp',
        infoFiltered: '',
        info: 'Hiển thị _START_ tới _END_ của _TOTAL_ bản ghi',
        infoEmpty: 'Hiển thị 0 bản ghi"'
      },
    }
  }

  accept(order: any) {
    this.Order = order;
    this.isReject = false;
    this.dialog.open(this.detailOrder, {
      width: '60%',
      autoFocus: true,
      disableClose: true
    });
  }

  rejectOrder(order: any) {
    this.Order = order;
    this.isReject = true;
    this.dialog.open(this.detailOrder, {
      width: '60%',
      autoFocus: true,
      disableClose: true
    });
  }

  onChecked(event: any, row: any, index: number) {
    console.log(event, row, index);
    this.dataTable.dataRows[index].isChecked = event.checked;

  }

  onFilter(status: any) {
    // get data về theo status
    console.log(status);
    this.status = parseInt(status, 10);

    switch (this.status) {
      case 1:
        this.dataTable = {
          headerRow: ['', 'Id', 'Mã Code', 'Khách hàng', 'Trạng thái', 'Tổng tiền', ''],
          dataRows: this.listNewOrders
        };
        //$('#datatable-status').DataTable().destroy();
        //this.initTable();
        break;
      case 2:
        this.dataTable = {
          headerRow: ['', 'Id', 'Mã Code', 'Khách hàng', 'Trạng thái', 'Tổng tiền', ''],
          dataRows: this.listTransferOrders
        };
        break;
      case 3:
        this.dataTable = {
          headerRow: ['', 'Id', 'Mã Code', 'Khách hàng', 'Trạng thái', 'Tổng tiền', ''],
          dataRows: this.listSuccessOrders
        };
        break;
      case 4:
        this.dataTable = {
          headerRow: ['', 'Id', 'Mã Code', 'Khách hàng', 'Trạng thái', 'Tổng tiền', ''],
          dataRows: this.listFailOrders
        };
        break;
      case 5:
        this.dataTable = {
          headerRow: ['', 'Id', 'Mã Code', 'Khách hàng', 'Trạng thái', 'Tổng tiền', ''],
          dataRows: this.listReTransferOrders
        };
        // $('#datatable-status').DataTable().destroy();
        //this.initTable();
        console.log(this.dataTable.dataRows);
        break;
      default:
        this.dataTable = {
          headerRow: ['', 'Id', 'Mã Code', 'Khách hàng', 'Trạng thái', 'Tổng tiền', ''],
          dataRows: this.listAllOrders
        };
        break;
    }
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.isDtInitialized = true
      this.dtTrigger.next();
    }
  }

}
