import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subject, Observable, forkJoin } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { map, startWith } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

import { AgencyService } from 'app/services/agency.service';
import { UserService } from 'app/services/user.service';
import { GeocoderService } from 'app/services/geocoder.service';

declare const $: any;

@Component({
  selector: 'app-manage-agency',
  templateUrl: './manage-agency.component.html',
  styleUrls: ['./manage-agency.component.scss']
})
export class ManageAgencyComponent implements OnInit, OnDestroy {

  @ViewChild('addAgency', { static: true }) addAgency: TemplateRef<any>;

  // Setting datatables
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  listAgency = [];
  addForm: FormGroup;
  isUpdate: boolean;
  listStaff: any = [];
  isLoading: boolean;
  filteredOptions: Observable<any[]>;
  oldAdminOfAgency: any = {};

  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private agencyService: AgencyService,
    private userService: UserService,
    private chRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private geocode: GeocoderService) {
      this.spinner.hide();
    }

  ngOnInit() {
    forkJoin([
      this.agencyService.getAllAgency(),
      this.userService.getAllStaff()
    ]).subscribe((t: any) => {
      this.listAgency = t[0].results;
      this.chRef.detectChanges();
      this.dtTrigger.next();
      this.listStaff = t[1].results;
    });

    this.addForm = this.formBuilder.group({
      AgencyId: [null],
      AgencyName: ['', Validators.required],
      Address: ['', Validators.required],
      Phone: ['', Validators.required],
      Admin: ['', Validators.required],
      Active: ['true', Validators.required]
    });
    this.initTable();
    this.filteredOptions = this.addForm.get('Admin').valueChanges
      .pipe(
        startWith(''),
        map(value => (value && value.FullName) ? value.FullName : value),
        map(name => name ? this._filter(name) : this.listStaff.slice())
      );
  }

  // init Table
  initTable() {
    this.dtOptions = {
      'pagingType': 'full_numbers',
      'lengthChange': false,
      'ordering': false,
      'columnDefs': [
        { 'width': '15%', 'targets': 1 },
        { 'width': '10%', 'targets': 2 },
        { 'width': '30%', 'targets': 3 },
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
        search: 'Tìm kiếm',
        emptyTable: 'Không có dữ liệu',
        zeroRecords: 'Không có bản ghi nào phù hợp'
      },
    }
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.listStaff.filter(option => option.FullName.toLowerCase().indexOf(filterValue) !== -1);
  }

  displayFn(admin?): string | undefined {
    return admin ? admin.FullName : undefined;
  }

  openDialogAdd(item) {
    this.isUpdate = false;
    if (item) {
      this.isUpdate = true;
      this.oldAdminOfAgency = item;
      this.addForm.controls['AgencyId'].setValue(item.brand.AgencyId);
      this.addForm.controls['AgencyName'].setValue(item.brand.AgencyName);
      this.addForm.controls['Address'].setValue(item.brand.Address.name);
      this.addForm.controls['Phone'].setValue(item.brand.Phone);
      this.addForm.controls['Active'].setValue(item.brand.Active ? 'true' : 'false');
      this.addForm.controls['Admin'].setValue(item.admin);
    } else {
      this.addForm.controls['AgencyName'].setValue('');
      this.addForm.controls['Address'].setValue('');
      this.addForm.controls['Phone'].setValue('');
      this.addForm.controls['Active'].setValue('true');
      this.addForm.controls['Admin'].setValue('');
    }
    this.dialog.open(this.addAgency, {
      width: '40%',
      autoFocus: true,
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
        this.spinner.show();
        this.agencyService.deleteAgency(id).subscribe(res => {
          this.agencyService.getAllAgency().subscribe((newList: any) => {
            this.spinner.hide();
            this.listAgency = newList.results;
            swalWithBootstrapButtons.fire('Đã xóa')
            this.rerender();
          });
          console.log('Agency is deleted');
        }, err => {
          console.log('Could not delete')
        });
      }
    })
  }

  openStopDialog(agency) {
    const statusAgency = {
      AgencyName: agency.AgencyName,
      Phone: agency.Phone,
      Address: agency.Address,
      Active: !agency.Active
    }

    this.agencyService.updateAgency(agency.AgencyId, statusAgency).subscribe(res => {
      this.agencyService.getAllAgency().subscribe((updateList: any) => {
        this.listAgency = updateList.results;
        this.rerender();
      });
      console.log('Change status successfully!');
    }, err => {
      console.log('Update fail');
    });
  }

  // Method to Add new agency
  saveAgency() {
    this.spinner.show();
    const address = this.addForm.get('Address').value;
    const AdminId = this.addForm.get('Admin').value.UserId;
    this.geocode.geocodeAddress(address).subscribe((res: any) => {
      console.log(res);
      this.addForm.value.Lat = res.results[0].geometry.location.lat;
      this.addForm.value.Lng = res.results[0].geometry.location.lng;
      const newAgency = this.addForm.value;
      this.agencyService.addNewAgency(newAgency).subscribe((res: any) => {
        const agencyId = res.results.AgencyId;
        const params = {
          AgencyId: agencyId,
          FullName: this.addForm.get('Admin').value.FullName,
          UserName: this.addForm.get('Admin').value.UserName,
          UserId: AdminId,
          Phone: this.addForm.get('Admin').value.Phone,
          Role: 'minor',
          Active: this.addForm.get('Admin').value.Active
        }
        this.userService.updateEmp(AdminId, params).subscribe((res: any) => {
          this.agencyService.getAllAgency().subscribe((newList: any) => {
            this.spinner.hide();
            this.listAgency = newList.results;
            this.dialog.closeAll();
            this.addForm.reset();
            this.rerender();
          });
        });
      });
    })
  }

  updateAgency() {
    this.spinner.show();
    const newAgency = this.addForm.value;
    const id = newAgency.AgencyId;
    const newAdminId = newAgency.Admin.UserId;
    const removeOldAdmin = {
      FullName: this.oldAdminOfAgency.admin.FullName,
      UserName: this.oldAdminOfAgency.admin.UserlName,
      Phone: this.oldAdminOfAgency.admin.Phone,
      Email: this.oldAdminOfAgency.admin.Email,
      Role: 'staff',
      AgencyId: null,
      Active: this.oldAdminOfAgency.admin.Active
    }
    if (newAgency.Address === this.oldAdminOfAgency.brand.Address.name) {
      if (newAgency.Admin === this.oldAdminOfAgency.admin) {
        this.callApiUpdateAgency(id, newAgency);
      } else {
        this.userService.updateEmp(this.oldAdminOfAgency.admin.UserId, removeOldAdmin).subscribe((res: any) => {
          const updateNewAdmin = {
            FullName: newAgency.Admin.FullName,
            UserName: newAgency.Admin.UserName,
            Phone: newAgency.Admin.Phone,
            Email: newAgency.Admin.Email,
            Role: 'minor',
            AgencyId: id,
            Active: newAgency.Admin.Active
          }
          this.userService.updateEmp(newAdminId, updateNewAdmin).subscribe((res: any) => {
            this.callApiUpdateAgency(id, newAgency);
          })
        })
      }
    } else {
      this.geocode.geocodeAddress(newAgency.Address).subscribe((res: any) => {
        newAgency.Lat = res.results[0].geometry.location.lat;
        newAgency.Lng = res.results[0].geometry.location.lng;
        if (newAgency.Admin === this.oldAdminOfAgency.admin) {
          this.callApiUpdateAgency(id, newAgency);
        } else {
          this.userService.updateEmp(this.oldAdminOfAgency.admin.UserId, removeOldAdmin).subscribe(() => {
            const updateNewAdmin = {
              FullName: newAgency.Admin.FullName,
              UserName: newAgency.Admin.UserName,
              Phone: newAgency.Admin.Phone,
              Email: newAgency.Admin.Email,
              Role: 'minor',
              AgencyId: id,
              Active: newAgency.Admin.Active
            }
            this.userService.updateEmp(newAdminId, updateNewAdmin).subscribe(() => {
              this.callApiUpdateAgency(id, newAgency);
            })
          })
        }
      })
    }
  }

  callApiUpdateAgency(id, updateAgency) {
    this.agencyService.updateAgency(id, updateAgency).subscribe(() => {
      this.agencyService.getAllAgency().subscribe((updateList: any) => {
        this.spinner.hide();
        this.listAgency = updateList.results;
        this.dialog.closeAll();
        this.rerender();
      });
    });
  }

  // We will use this method to destroy old table and re-render new table
  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();

    });
  }

  onCloseDialog() {
    this.dialog.closeAll();
    this.addForm.reset();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }
}
