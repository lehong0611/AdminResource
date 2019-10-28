import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, Observable, forkJoin } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { OrderService } from '../services/order.service';

import { Customer } from '../models/customer.model';
import { GeocoderService } from 'app/services/geocoder.service';
import { UserService } from 'app/services/user.service';

declare const $: any;

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {

  @ViewChild('detailOrder', { static: true }) detailOrder: TemplateRef<any>;
  @ViewChild('reject', { static: true }) reject: TemplateRef<any>;
  @ViewChild('addOrder', { static: true }) addOrder: TemplateRef<any>;
  @ViewChild('addCharge', { static: true }) addCharge: TemplateRef<any>;
  @ViewChild('selectedShipper', { static: true }) selectedShipper: TemplateRef<any>;
  @ViewChild('assignAgency', { static: true }) assignAgency: TemplateRef<any>;

  isUserSupper: true;
  Order: any;
  listShippers: any[];
  isReject: any;
  status: any;
  listTabs = [
    { key: 'available', text: 'Mới tạo' },
    { key: 'waiting', text: 'Chờ xác nhận' },
    { key: 'unavailable', text: 'Chờ lấy về đại lý' },
    { key: 'assigned', text: 'Đã tiếp nhận' },
    { key: 'assigning', text: 'Chuyển tiếp' },
    { key: 'transfering', text: 'Đang giao' },
    { key: 'success', text: 'Thành công' },
    { key: 'failed', text: 'Thất bại' },
  ];
  listKindOfOrder = [
    { value: 0, text: 'Thời trang - Phụ kiện' },
    { value: 1, text: 'Sức khỏe - Làm đẹp' },
    { value: 2, text: 'Hàng tiêu dùng - Thực phẩm' },
    { value: 3, text: 'Phụ kiện - Thiết bị số - Thiết bị điện tử' },
    { value: 4, text: 'Hàng gia dụng - Cơ khí' },
    { value: 5, text: 'Văn phòng phẩm - Thủ công' }
  ];
  active = false;
  listOrder = [];
  formShipper: FormControl;
  filteredOptions: Observable<any[]>;
  validatePhone = '(09[0-9]|03[2-9]|07[6-9]|07[0]|05[2|6|8|9]|08[1-6]|08[8|9])+([0-9]{7})';
  initStatus: any;
  page: number;
  totalCount: number;
  pageSize = 12;
  addForm: FormGroup;
  accountId = 12;
  inputCharge: FormControl;
  textReject: FormControl;
  distance: any;
  search = new FormControl();
  isSelected = new FormControl();
  selectAgency: FormControl;
  EstimatedTime: FormControl;
  listSelected = [];

  // hash code nội thành
  instance = [
    { lat: 21.107513, lng: 105.741159 },
    { lat: 21.099012, lng: 105.794389 },
    { lat: 21.078389, lng: 105.841547 },
    { lat: 21.080471, lng: 105.845324 },
    { lat: 21.065413, lng: 105.865238 },
    { lat: 21.070377, lng: 105.878286 },
    { lat: 21.078224, lng: 105.896830 },
    { lat: 21.071006, lng: 105.924128 },
    { lat: 21.038319, lng: 105.938376 },
    { lat: 21.003714, lng: 105.916563 },
    { lat: 20.994589, lng: 105.900762 },
    { lat: 20.987495, lng: 105.908081 },
    { lat: 20.946788, lng: 105.886427 },
    { lat: 20.950642, lng: 105.865829 },
    { lat: 20.952892, lng: 105.830128 },
    { lat: 20.960264, lng: 105.816053 },
    { lat: 20.981103, lng: 105.809529 },
    { lat: 20.987179, lng: 105.799283 },
    { lat: 20.984535, lng: 105.801944 },
    { lat: 20.981397, lng: 105.794558 },
    { lat: 20.931984, lng: 105.782191 },
    { lat: 20.910662, lng: 105.732246 },
    { lat: 20.931345, lng: 105.705979 },
    { lat: 20.994088, lng: 105.729183 },
    { lat: 21.071899, lng: 105.717919 },
  ];

  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private orderService: OrderService,
    private geocoderService: GeocoderService,
    private userService: UserService) { }

  ngOnInit() {
    this.initStatus = 'available';
    this.changeTab('available');
    this.addForm = this.formBuilder.group({
      OrderId: [null],
      SenderName: ['', Validators.required],
      SenderPhone: ['', Validators.compose(
        [
          Validators.required,
          Validators.pattern(this.validatePhone),
          Validators.maxLength(10)
        ]
      )],
      SenderAddress: ['', Validators.required],
      ReceiverName: ['', Validators.required],
      ReceiverPhone: ['', Validators.compose(
        [
          Validators.required,
          Validators.pattern(this.validatePhone),
          Validators.maxLength(10)
        ]
      )],
      ReceiverAddress: ['', Validators.required],
      Weight: [null, Validators.required],
      Kind: ['', Validators.required],
      Cost: [null, Validators.required],
      Service: ['Chuẩn', Validators.required],
      Note: [''],
      TransportCharge: [null, Validators.required]
    });
    this.inputCharge = new FormControl(null, Validators.required);
    this.textReject = new FormControl('', Validators.required);
    this.formShipper = new FormControl(null, Validators.required);
    this.selectAgency = new FormControl(null, Validators.required);
    this.EstimatedTime = new FormControl('', Validators.required);
  }

  openModalAccept(order: any, isReject) {
    this.Order = order;
    this.isReject = isReject;
    let params: any = {};
    this.geocoderService.geocodeAddress(this.Order.SenderAddress).subscribe((res: any) => {
      params.latSend = res.results[0].geometry.location.lat;
      params.lngSend = res.results[0].geometry.location.lng;
      this.geocoderService.geocodeAddress(this.Order.ReceiverAddress).subscribe((res: any) => {
        params.latReceive = res.results[0].geometry.location.lat;
        params.lngReceive = res.results[0].geometry.location.lng;
        this.distance = this.calculateTwoCoordinates(params.latSend, params.lngSend, params.latReceive, params.lngReceive);
      })
    })
    this.dialog.open(this.addCharge, {
      width: '30%',
      autoFocus: true,
      disableClose: true
    });
  }

  accept(isReject) {
    let params = this.Order;
    params.OrderStatusTime = new Date();
    if (!isReject) {
      params.OrderStatusName = 'unavailable';
      params.TransportCharge = this.inputCharge.value;
      params.EstimatedTime = this.EstimatedTime.value;
    } else {
      params.OrderStatusName = 'cancelled';
      params.TextReject = this.textReject.value;
    }
    console.log(params);
    this.orderService.updateStatusOrder(params.OrderId, params).subscribe((res: any) => {
      this.dialog.closeAll();
      this.inputCharge.reset();
      this.EstimatedTime.reset();
      this.textReject.reset();
      this.initStatus = 'waiting';
      this.changeTab('waiting');
    })
  }

  changeTab(status) {
    this.litsOrdersByStatus(status);
  }

  litsOrdersByStatus(status) {
    this.spinner.show();
    this.page = 1;
    const pagination = {
      pageCurrent: this.page,
      pageSize: this.pageSize
    }
    const CreatedUserId = 12;
    this.orderService.getOrdersByStatus(status, CreatedUserId, pagination.pageCurrent, pagination.pageSize, 29).subscribe((res: any) => {
      this.spinner.hide();
      this.listOrder = res.results.orders;
      this.totalCount = res.results.counts;
    })
  }

  bindingTextStatus(text) {
    switch (text) {
      case 'waiting':
        return 'Chờ xác nhận';
      case 'unavailable':
        return 'Chờ lấy về đại lý';
      case 'available':
        return 'Mới tạo';
      case 'assigned':
        return 'Đã tiếp nhận';
      case 'assigning':
        return 'Chuyển tiếp';
      case 'transfering':
        return 'Đang giao';
      case 'success':
        return 'Thành công';
      case 'fail':
        return 'Thất bại';
    }
  }

  onDetailOrder(order) {
    this.Order = order;
    console.log(this.Order);
    this.dialog.open(this.detailOrder, {
      width: '50%',
      autoFocus: true,
      disableClose: true
    });
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

  onAddOrderModal() {
    this.dialog.open(this.addOrder, {
      width: '50%',
      autoFocus: true,
      disableClose: true
    });
  }

  saveNewOrder() {
    const newOrder = this.addForm.value;
    newOrder.CreatedUserId = 12;
    newOrder.OrderStatusName = 'available';
    newOrder.OrderStatusTime = new Date();
    newOrder.EstimatedTime = this.EstimatedTime.value;
    console.log(newOrder);
    this.orderService.addNewOrder(newOrder).subscribe(res => {
      this.addForm.reset();
      this.initStatus = 'available';
      this.changeTab('available');
      this.dialog.closeAll();
    })
  }

  closeDialogAdd() {
    this.addForm.reset();
    this.dialog.closeAll();
  }

  closeAcceptModal() {
    this.inputCharge.reset();
    this.dialog.closeAll();
  }

  calculateTwoCoordinates(lat1, lng1, lat2, lng2) {
    const R = 6371;
    if ((lat1 === lat2) && (lng1 === lng2)) {
      return 0;
    } else {
      let dLat = (lat1 - lat2) * Math.PI / 180;
      let dLng = (lng1 - lng2) * Math.PI / 180;
      let distance = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      let c = 2 * Math.atan2(Math.sqrt(distance), Math.sqrt(1 - distance));
      let d = Math.round(R * c * 1000);
      return d;
    }
  }

  pageChange(event, status) {
    console.log(event, 'is', status);
    this.spinner.show();
    this.page = event;
    const pagination = {
      pageCurrent: this.page,
      pageSize: this.pageSize
    }
    const CreatedUserId = 18;
    this.orderService.getOrdersByStatus(status, CreatedUserId, pagination.pageCurrent, pagination.pageSize, 29).subscribe((res: any) => {
      this.spinner.hide();
      this.listOrder = res.results.orders;
    })
  }

  searchOrder() {
    const key = this.search.value;
    this.orderService.findOrderByCode(key).subscribe((res: any) => {
      this.listOrder = res.results;
      this.search.setValue('');
    })
  }

  selectedOrder(order, isSelected) {
    if (isSelected) {
      this.listSelected.push(order);
    } else {
      for (let i = this.listSelected.length - 1; i >= 0; i--) {
        if (this.listSelected[i].OrderId === order.OrderId) {
          this.listSelected.splice(i, 1);
        }
      }
    }
    console.log(this.listSelected);
  }

  openAssignedShipper() {
    this.userService.getAllUserByRole(16, 'shipper').subscribe((res: any) => {
      this.listShippers = res.results.filter(shipper => {
        return shipper.Active === true;
      });
      this.filteredOptions = this.formShipper.valueChanges
        .pipe(
          startWith(''),
          map(value => (value && value.FullName) ? value.FullName : value),
          map(name => name ? this._filter(name) : this.listShippers.slice())
        );
      this.dialog.open(this.selectedShipper, {
        width: '40%',
        autoFocus: true,
        disableClose: true
      });
    })
  }

  assignedShipper() {
    console.log(this.formShipper.value);
    this.listSelected.forEach(item => {
      let params = item;
      params.OrderStatusTime = new Date();
      if (item.OrderStatus.name === 'available') {
        params.OrderStatusName = 'transfering';
        params.ShipperTransId = this.formShipper.value.UserId;
      } else {
        params.OrderStatusName = 'unavailable';
        params.ShipperGetOrderId = this.formShipper.value.UserId;
      }
      this.orderService.updateStatusOrder(item.OrderId, params).subscribe((res: any) => {
        if (res.results.OrderStatus.name === 'unavailable') {
          this.initStatus = 'unavailable';
          this.isSelected.disable();
          this.changeTab('unavailable');
        } else {
          this.initStatus = 'available';
          this.changeTab('available');
        }
        this.formShipper.reset();
        this.isSelected.reset();
        this.dialog.closeAll();
      })
    })
  }

  displayFn(admin?): string | undefined {
    return admin ? admin.FullName : undefined;
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.listShippers.filter(option => option.FullName.toLowerCase().indexOf(filterValue) !== -1);
  }

  openAssignedAgency() {
    this.dialog.open(this.assignAgency, {
      width: '35%',
      autoFocus: true,
      disableClose: true
    });
  }

  assignToAnotherAgency() {
    this.listSelected.forEach(item => {
      let params = item;
      params.OrderStatusTime = new Date();
      params.OrderStatusName = 'assigning';
      params.reassignAgencyId = this.selectAgency.value;
      this.orderService.updateStatusOrder(item.OrderId, params).subscribe((res: any) => {
        this.initStatus = 'available';
        this.changeTab('available');
        this.selectAgency.reset();
        this.isSelected.reset();
        this.dialog.closeAll();
      })
    })
  }
}
