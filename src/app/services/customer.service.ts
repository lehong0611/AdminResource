import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllCus() {
    return this.http.get(`${this.baseUrl}/customer/customers`);
  }

  updateCus(id, cus) {
    return this.http.put(`${this.baseUrl}/customer/updateCus/${id}`, cus);
  }
}
