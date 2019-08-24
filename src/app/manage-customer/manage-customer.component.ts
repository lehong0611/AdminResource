import { Component, OnInit, AfterViewInit } from '@angular/core';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent implements OnInit, AfterViewInit {

  public dataTable: DataTable;

  constructor() { }

  ngOnInit() {
    this.dataTable = {
      headerRow: ['Mã khách hàng', 'Họ và tên', 'Tên đăng nhập', 'Email', 'Địa chỉ', 'SĐT', 'Trạng thái'],
      footerRow: ['Name', 'Position', 'Office', 'Age', 'Start Date', 'Actions'],

      dataRows: [
        ['Airi Satou', 'Andrew Mike', 'Develop', '2013', '', 'active'],
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
  }

  ngAfterViewInit() {
    $('#datatables').DataTable({
      'pagingType': 'full_numbers',
      'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
      'order': [[1, 'asc']],
      'columnDefs': [{
        'targets': [0, 3, 4, 5, 6], /* column index */
        'orderable': false, /* true or false */
      }],
      'info': false,
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Tìm kiếm khách hàng',
        emptyTable: 'Không bản ghi nào được tìm thấy',
        lengthMenu: 'Hiển thị _MENU_ bản ghi',
      }
    });

    const table = $('#datatables').DataTable();

    // column is sorted
    // table.order([ 2, 'asc']).draw();

    // Edit record
    table.on('click', '.edit', function () {
      const $tr = $(this).closest('tr');

      const data = table.row($tr).data();
      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
    });

    // Delete a record
    table.on('click', '.remove', function (e: any) {
      const $tr = $(this).closest('tr');
      table.row($tr).remove().draw();
      e.preventDefault();
    });

    // Like record
    table.on('click', '.like', function () {
      alert('You clicked on Like button');
    });
  }

}
