import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = 'http://localhost:3000/api/order';

  getOrderUrl = 'http://localhost:3000/api/order/getOrderForAgency';

  constructor(private http: HttpClient) { }

  getOrdersByStatus(status, pageNum, pageSize) {
    return this.http.get(`${this.getOrderUrl}?OrderStatus=${status}&page=${pageNum}&pageSize=${pageSize}`);
  }

  addNewOrder(params) {
    return this.http.post(`${this.baseUrl}/createOrder`, params);
  }

  updateStatusOrder(id, params) {
    return this.http.put(`${this.baseUrl}/updateOrderById/${id}`, params);
  }

  findOrderByCode(id) {
    return this.http.get(`${this.baseUrl}/getOrderInfoById/${id}`);
  }

  getReport(param) {
    return this.http.post(`${this.baseUrl}/report`, param);
  }
}
