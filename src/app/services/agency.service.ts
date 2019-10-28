import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  getAllAgency() {
    return this.http.get(`${this.baseUrl}/branch/agencys`);
  };

  addNewAgency(params) {
      return this.http.post(`${this.baseUrl}/branch/createAgency`, params);
  }

  updateAgency(id: Number, params) {
    return this.http.put(`${this.baseUrl}/branch/updateAgency/${id}`, params);
  }

  deleteAgency(id: Number) {
    return this.http.delete(`${this.baseUrl}/branch/deleteAgency/${id}`);
  }
}
