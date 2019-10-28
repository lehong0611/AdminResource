import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = false;
  token: any;
  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  getAllEmployee() {
    return this.http.get(`${this.baseUrl}/employees`);
  };

  getAllUser() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getAllUserByRole(id, role) {
    return this.http.get(`${this.baseUrl}/allShipper?AgencyId=${id}&Role=${role}`);
  }

  getAllStaff() {
    return this.http.get(`${this.baseUrl}/getAllStaff`);
  }

  addNewEmp(params) {
    return this.http.post(`${this.baseUrl}/createEmployee`, params);
  }

  updateEmp(id: Number, editEmp) {
    return this.http.put(`${this.baseUrl}/updateUser/${id}`, editEmp);
  }

  deleteEmp(id: Number) {
    return this.http.delete(`${this.baseUrl}/deleteEmp/${id}`);
  }

  postFile(fileToUpload: File) {
    const endpoint = `${this.baseUrl}/upload`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
  }

  login(email, password) {
    return this.http.post(`${this.baseUrl}/login`, { Email: email, Password: password })
      .pipe(
        tap((res: any) => {
          if (res.status === 0) {
            return res;
          } else {
            localStorage.setItem('token', res.results.token);
            this.token = res.results.token;
            this.isLoggedIn = true;
            return true;
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    delete this.token;
  }

  getToken() {
    this.token = localStorage.getItem('token');
    if (this.token != null) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}
