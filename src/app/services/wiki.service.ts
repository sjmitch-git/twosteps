import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  nearbypath: string = 'wikivoyage';
  nearbypathOptions: any[] = ['wikivoyage', 'wikipedia'];
  limit: number = 12;
  radius: number = 20000;
  lang?: string;

  constructor(
    private httpClient: HttpClient,
  ) { 
    if (typeof navigator !== 'undefined' && navigator.language) this.lang = navigator.language.split('-')[0];
    else this.lang = 'en';
  }

  getNearby:any = (lat: string, lon: string) => {
    let param: any = {
      ggscoord: lat + '|' + lon,
      prop: 'pageprops|coordinates|description',
      action: 'query',
      format: 'json',
      origin: '*',
      ggsradius: this.radius,
      generator: 'geosearch',
      ggslimit: this.limit
    };
    let url: string = 'https://' + this.lang + '.' + this.nearbypath + '.org/w/api.php';
    return this.httpClient.get(url, {params: param});
  }
}
