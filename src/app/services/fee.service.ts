import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  baseUrl = 'http://localhost:3000/api/fee';

  constructor(private http: HttpClient) { }

  getAllFee() {
    return this.http.get(`${this.baseUrl}/fees`);
  }

  createFee(newFee) {
    return this.http.post(`${this.baseUrl}/createFee`, newFee);
  }

  updateFee(id, fee) {
    return this.http.put(`${this.baseUrl}/updateFee/${id}`, fee);
  }

  deleteFee(id) {
    return this.http.delete(`${this.baseUrl}/deleteFee/${id}`);
  }
}
