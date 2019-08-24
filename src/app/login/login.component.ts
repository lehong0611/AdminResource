import { Component, OnInit } from '@angular/core';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: any = {};

  // tslint:disable-next-line: max-line-length
  emailValidate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  constructor(private router: Router) {
    const state: RouterState = router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    console.log(snapshot);
  }

  ngOnInit() {
  }

  onSubmit() {
    alert(JSON.stringify(this.loginData));
    this.router.navigateByUrl('/manage-agency');
  }

}
