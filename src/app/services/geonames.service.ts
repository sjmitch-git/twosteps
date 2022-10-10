import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeonamesService {

  maxRows: number = 24;
  username: string = 'stephenjmitchell';
  endpoint: string = 'https://secure.geonames.org/';
  results: any[] = [];
  radius:number = 10;

  constructor(
    private httpClient: HttpClient
  ) {
   }

  search = (q: string) => {
    let params: any = {
      q: q,
      maxRows: this.maxRows,
      username: this.username
    };
    let url: string = this.endpoint + 'searchJSON';
    return this.httpClient.get(url, {params: params});
  }

  findNearby = (lat: string, lng: string) => {
    let params: any = {
      lat: lat,
      lng: lng,
      maxRows: this.maxRows,
      radius: this.radius,
      username: this.username,
      origin: '*'
    };
    let url: string = this.endpoint + 'findNearbyWikipediaJSON';
    return this.httpClient.get(url, {params: params});
  }

}
