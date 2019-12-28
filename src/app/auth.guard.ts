import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userSerivce: UserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.userSerivce.isLoggedIn;
    const userRole = localStorage.getItem('userRole');
    if (currentUser) {
      // authorised so return true
      // if (userRole === 'major') {
      //   this.router.navigate(['/manage-agency']);
      // } else {
      //   this.router.navigate(['/manage-order']);
      // }
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
}
