import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {

  url = 'https://maps.googleapis.com/maps/api/geocode/json'

  key = 'AIzaSyDBg3nDKzFPiRaZXMgFhN63qSWWZK1vVTc'

  constructor(private http: HttpClient) { }

  geocodeAddress(loc: string) {
    let headers = new HttpHeaders();
    headers.append('no-token', 'true');
    return this.http.get(`${this.url}?address=${loc}&key=${this.key}`, {headers: headers});
  }


}
