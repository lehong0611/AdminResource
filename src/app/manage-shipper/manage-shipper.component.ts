import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import Swal from 'sweetalert2'
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'app/services/user.service';
import { Subject } from 'rxjs';

declare const $: any;

@Component({
  selector: 'app-manage-shipper',
  templateUrl: './manage-shipper.component.html',
  styleUrls: ['./manage-shipper.component.scss']
})
export class ManageShipperComponent implements OnInit, OnDestroy {

  @ViewChild('addEmployee', { static: true }) addEmployee: TemplateRef<any>;
  @ViewChild('img', { static: true }) img: TemplateRef<any>

  // Setting datatables
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  addForm: FormGroup;
  isUpdate: boolean;

  listEmployee = [];
  listExceptSuper = [];
  userSuper: boolean;

  fileToUpload: File = null;
  url: string;
  validatePhone = '(09[1-9]|03[2-9]|07[6-9]|07[0]|05[2|6|8|9]|08[1-6]|08[8|9])+([0-9]{7})';

  constructor(private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.userSuper = false;
    this.dialog.closeAll();
    this.initTable();
    this.userService.getAllUserByRole('shipper').subscribe((res: any) => {
      this.listEmployee = res.results;
      this.chRef.detectChanges();
      this.dtTrigger.next();
    }, err => {
      console.log(err);
    });
    this.addForm = this.formBuilder.group({
      UserId: [null],
      FullName: ['', Validators.required],
      UserName: ['', Validators.required],
      Email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      Password: ['', Validators.compose([
        Validators.required, Validators.minLength(8)
      ])],
      Phone: ['', Validators.compose([
        Validators.required, Validators.pattern(this.validatePhone)
      ])],
      Image: [''],
      Active: ['true', Validators.required]
    });
  }

  initTable() {
    this.dtOptions = {
      'pagingType': 'full_numbers',
      'lengthChange': false,
      'ordering': false,
      'columnDefs': [
        { 'width': '5%', 'targets': 0 },
        { 'width': '10%', 'targets': 1 },
        { 'width': '15%', 'targets': 2 },
        { 'width': '25%', 'targets': 3 },
        { 'width': '10%', 'targets': 4 },
        { 'width': '10%', 'targets': 5 },
        { 'width': '35%', 'targets': 6 },
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
      }
    };
  }

  openDialogAdd(item?: any) {
    this.isUpdate = false;
    if (item) {
      this.isUpdate = true;
      this.addForm.controls['UserId'].setValue(item.UserId);
      this.addForm.controls['FullName'].setValue(item.FullName);
      this.addForm.controls['UserName'].setValue(item.UserName);
      this.addForm.controls['Email'].setValue(item.Email);
      this.addForm.controls['Phone'].setValue(item.Phone);
      this.addForm.controls['Image'].setValue(item.Image);
      this.addForm.controls['Active'].setValue(item.Active ? 'true' : 'false');
    } else {
      this.addForm.controls['FullName'].setValue('');
      this.addForm.controls['UserName'].setValue('');
      this.addForm.controls['Email'].setValue('');
      this.addForm.controls['Phone'].setValue('');
      this.addForm.controls['Password'].setValue('');
      this.addForm.controls['Image'].setValue('');
      this.addForm.controls['Active'].setValue('true');
    }
    this.dialog.open(this.addEmployee, {
      width: '40%',
      autoFocus: true,
      disableClose: true
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  // Method to Add new Emp
  saveEmp() {
    const newEmp = this.addForm.value;
    newEmp.Role = 'shipper';
    if (this.fileToUpload) {
      this.userService.postFile(this.fileToUpload).subscribe((res: any) => {
        console.log(res);
        const imgUrl = `http://localhost:3000/uploads/${res.filename}`;
        newEmp.Image = imgUrl;
        this.userService.addNewEmp(newEmp).subscribe((res: any) => {
          if (res.status === 1) {
            this.userService.getAllUserByRole(newEmp.Role).subscribe((newList: any) => {
              this.listEmployee = newList.results;
              this.dialog.closeAll();
              this.addForm.reset();
              this.rerender();
            });
          } else {
            res.message.forEach(msg => {
              this.toastr.error(msg);
            });
            this.toastr.error();
          }
          console.log('New shipper added');
        }, err => {
          console.log('Could not add shipper');
        });
      })
    } else {
      this.userService.addNewEmp(newEmp).subscribe((res: any) => {
        this.userService.getAllUserByRole(newEmp.Role).subscribe((newList: any) => {
          this.listEmployee = newList.results;
          this.dialog.closeAll();
          this.addForm.reset();
          this.rerender();
        });
        console.log('New shipper added');
      }, err => {
        console.log('Could not add shipper');
      });
    }
  }

  updateEmp() {
    const id = this.addForm.get('UserId').value;
    const newEmp = this.addForm.value;
    newEmp.Role = 'shipper';
    if (this.fileToUpload) {
      this.userService.postFile(this.fileToUpload).subscribe((res: any) => {
        const imgUrl = `http://localhost:3000/uploads/${res.filename}`;
        newEmp.Image = imgUrl;
        this.userService.updateEmp(id, newEmp).subscribe(() => {
          this.userService.getAllUserByRole(newEmp.Role).subscribe((updateList: any) => {
            this.listEmployee = updateList.results;
            this.dialog.closeAll();
            this.addForm.reset();
            this.rerender();
          });
          console.log('shipper is updated');
        }, err => {
          console.log('Could not update')
        });
      })
    }
    this.userService.updateEmp(id, newEmp).subscribe(() => {
      this.userService.getAllUserByRole(newEmp.Role).subscribe((updateList: any) => {
        this.listEmployee = updateList.results;
        this.dialog.closeAll();
        this.addForm.reset();
        this.rerender();
      });
      console.log('Product is updated');
    }, err => {
      console.log('Could not update')
    });
  }

  // We will use this method to destroy old table and re-render new table
  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
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
        this.userService.deleteEmp(id).subscribe(res => {
          this.userService.getAllUserByRole('shipper').subscribe((newList: any) => {
            console.log(newList.results);
            this.listEmployee = newList.results;
            swalWithBootstrapButtons.fire('Đã xóa')
            this.rerender();
          });
          console.log('Employee is deleted');
        }, err => {
          console.log('Could not delete')
        });
      }
    })
  }

  onStopActive(emp) {
    const statusShipper = {
      FullName: emp.FullName,
      UserName: emp.UserName,
      UserId: emp.UserId,
      Phone: emp.Phone,
      Role: emp.Role,
      AgencyId: emp.AgencyId,
      Image: emp.Image,
      Active: !emp.Active
    }
    this.userService.updateEmp(emp.UserId, statusShipper).subscribe(res => {
      this.userService.getAllUserByRole(emp.Role).subscribe((updateList: any) => {
        this.listEmployee = updateList.results;
        this.rerender();
      });
      console.log('Change status successfully!');
    }, err => {
      console.log('Update fail');
    });
  }

  viewEmpImg(image: string) {
    this.url = image;
    this.dialog.open(this.img, {
      width: '50%',
      height: '85%',
      autoFocus: true,
      disableClose: true
    });
  }

  closeModalImg(isImg) {
    if (!isImg) {
      this.addForm.reset();
    }
    this.dialog.closeAll();
  }

}
