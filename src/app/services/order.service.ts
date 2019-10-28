import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = 'http://localhost:3000/api/order';

  getOrderUrl = 'http://localhost:3000/api/order/getOrderForAgency';

  constructor(private http: HttpClient) { }

  getOrdersByStatus(status, createdId, pageNum, pageSize, agencyId) {
    return this.http.get(`${this.getOrderUrl}?OrderStatus=${status}&CreatedUserId=${createdId}&page=${pageNum}&pageSize=${pageSize}&AcceptAdminId=${agencyId}`);
  }

  addNewOrder(params) {
    return this.http.post(`${this.baseUrl}/createOrder`, params);
  }

  updateStatusOrder(id, params) {
    return this.http.put(`${this.baseUrl}/updateOrderById/${id}`, params);
  }

  findOrderByCode(id) {
    return this.http.get(`${this.baseUrl}/getOrderInfoById?_id=${id}`);
  }
}
