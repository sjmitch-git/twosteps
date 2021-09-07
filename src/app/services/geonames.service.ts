import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeonamesService {

  maxRows: number = 10;
  username: string = 'stephenjmitchell';
  endpoint: string = 'https://secure.geonames.org/searchJSON';
  results: any[] = [];

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
    let url: string = this.endpoint;
    return this.httpClient.get(url, {params: params});
  }

}
