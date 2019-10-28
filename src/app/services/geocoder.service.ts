import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { filter, catchError, tap, map, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Location } from '../models/location.model';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {

  private geocoder: any;

  location: Location;

  url = 'https://maps.googleapis.com/maps/api/geocode/json'

  key = 'AIzaSyDBg3nDKzFPiRaZXMgFhN63qSWWZK1vVTc'

  constructor(private mapLoader: MapsAPILoader,
    private http: HttpClient) { }

  private initGeocoder() {
    this.geocoder = new google.maps.Geocoder();
  }

  geocodeAddress(loc: string) {
    return this.http.get(`${this.url}?address=${loc}&key=${this.key}`);
  }


}
