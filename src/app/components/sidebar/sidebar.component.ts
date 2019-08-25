import { Component, OnInit } from '@angular/core';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTESFORSUPER: RouteInfo[] = [
    { path: '/manage-agency', title: 'Quản lý đại lý',  icon: 'store', class: '' },
    { path: '/manage-employee', title: 'Quản lý nhân viên',  icon: 'people', class: '' },
    { path: '/manage-customer', title: 'Quản lý khách hàng',  icon: 'supervisor_account', class: '' },
    { path: '/manage-fee', title: 'Quản lý biểu phí',  icon: 'attach_money', class: '' },
    { path: '/statistic', title: 'Báo cáo thống kê',  icon: 'show_chart', class: '' },
];

export const ROUTESFORADMIN: RouteInfo[] = [
  { path: '/manage-employee', title: 'Quản lý shipper',  icon: 'people', class: '' },
  { path: '/manage-order', title: 'Quản lý đơn hàng',  icon: 'pages', class: '' },
  { path: '/statistic', title: 'Báo cáo thống kê',  icon: 'attach_money', class: '' },
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/user-profile', title: 'User Profile',  icon: 'person', class: '' },
  { path: '/table-list', title: 'Table List',  icon: 'content_paste', class: '' },
  { path: '/typography', title: 'Typography',  icon: 'library_books', class: '' },
  { path: '/icons', title: 'Icons',  icon: 'bubble_chart', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItemsForSuperAdmin: any[];
  menuItemsForAdmin: any[];
  userSuper = true;
  userAdmin = false;

  constructor() { }

  ngOnInit() {
    this.menuItemsForSuperAdmin = ROUTESFORSUPER.filter(menuItem => menuItem);
    this.menuItemsForAdmin = ROUTESFORADMIN.filter(menuItem => menuItem);
    // this.userSuper = true;
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
