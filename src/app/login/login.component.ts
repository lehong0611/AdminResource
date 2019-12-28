import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  // tslint:disable-next-line: max-line-length
  emailValidate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      Password: ['', Validators.compose([
        Validators.required, Validators.minLength(8)
      ])],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.toastr.error('Email hoặc mật khẩu không chính xác!', 'Thất bại');
      return;
    }
    this.userService.login(this.loginForm.value.Email, this.loginForm.value.Password).subscribe(
      data => {
        if (data.status === 1) {
          console.log('Logged in');
          localStorage.setItem('role', data.results.role);
          if (data.results.role === 'major') {
            this.router.navigate(['/manage-agency']);
          } else if (data.results.role === 'minor') {
            this.router.navigate(['/manage-order']);
          } else {
            this.toastr.warning('Tài khoản chưa được phân quyền truy cập');
            return;
          }
        } else {
          this.toastr.error(data.message);
          return;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
