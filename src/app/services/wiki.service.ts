import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { FoursquareService } from "../services/foursquare.service";

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  nearbypath: string = 'wikivoyage';
  nearbypathOptions: any[] = ['wikivoyage', 'wikipedia'];
  limit: number = 12;
  radius: number = 10000;
  lang: string = 'en';

  constructor(
    private httpClient: HttpClient,
    private fsq: FoursquareService
  ) { }

  getNearby:any = (lat: string, lon: string) => {
    let param: any = {
      ggscoord: lat + '|' + lon,
      prop: 'pageprops|coordinates',
      action: 'query',
      format: 'json',
      origin: '*',
      ggsradius: this.radius,
      generator: 'geosearch',
      ggslimit: this.limit,
      pilimit: this.limit
    };
    let url: string = 'https://' + this.lang + '.' + this.nearbypath + '.org/w/api.php';
    return this.httpClient.get(url, {params: param});
  }
}
