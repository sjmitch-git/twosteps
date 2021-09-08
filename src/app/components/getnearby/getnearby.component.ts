import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WikiService  } from "../../services/wiki.service";
import { FoursquareService } from "../../services/foursquare.service";

@Component({
  selector: 'getnearby',
  templateUrl: './getnearby.component.html',
  styles: [
  ]
})
export class GetnearbyComponent implements OnInit {

  error: string = '';
  loading: boolean = false;
  results: any[] = [];
  lon?: string;
  lat?: string;

  constructor(
    private route: ActivatedRoute,
    private wiki: WikiService,
    private fsq: FoursquareService
  ) { }

  errorHandler = (msg: string) => {
    this.error = msg;
    this.loading = false;
  }

  processNearby = (data: any) => {
    let arr = Object.values(data);
    let results = this.filterByCoordinates(arr);
    for (let i = 0; i < results.length; i++) {
      const el = results[i];
      let item = {
        name: el.title,
        lat: el.coordinates[0].lat,
        lon: el.coordinates[0].lon,
      };
      if (item.lat !== Number(this.lat), item.lon !== Number(this.lon)) this.results.push(item)
    }
  }

  filterByCoordinates = (arr: any) => {
    let _arr = [];
    for (let item of arr) {
      if (item.coordinates && item.pageprops) _arr.push(item);
    }
    return _arr;
  }

  search = () => {
    this.error = '';
    this.loading = true;
    this.results = [];
    this.wiki.getNearby(this.lat,this.lon).subscribe((res : any)=>{
      if (res.query) this.processNearby(res.query.pages);
      else this.results = [];
    }, (err: any) => {
      this.errorHandler(err)
    }, () => {
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.lat && params.lon) {
        this.lat = params.lat;
        this.lon = params.lon;
        this.search();
      }
    });
  }

}
