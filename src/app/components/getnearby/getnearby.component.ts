import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WikiService  } from "../../services/wiki.service";
import { SeoService } from "../../services/seo.service";

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
  wikibase?: string;
  title?: string;
  description?: string;
  link?: string;

  constructor(
    private route: ActivatedRoute,
    private wiki: WikiService,
    public seo: SeoService
  ) { }

  errorHandler = (msg: string) => {
    this.error = msg;
    this.loading = false;
  }

  processNearby = (data: any) => {
    let arr = Object.values(data);
    let results = this.filterByCoordinates(arr);
    let title;
    let wikibase;
    let description;
    for (let i = 0; i < results.length; i++) {
      const el = results[i];
      let item = {
        name: el.title,
        description: this.capitalizeFirstLetter(el.description),
        lat: el.coordinates[0].lat,
        lon: el.coordinates[0].lon,
      };
      if (item.lat !== Number(this.lat), item.lon !== Number(this.lon)) this.results.push(item)
      else {
        wikibase = el.pageprops.wikibase_item;
        title = item.name;
        description = this.capitalizeFirstLetter(el.description);
      }
    }
    if (wikibase) {
      this.wikibase = wikibase;
      this.title = title;
      this.link = `https://tramp-v2.herokuapp.com/explore?q=${wikibase}`;
      this.seo.sendEvent('wikibase', wikibase);
      this.description = description;
    } else {
      this.wikibase = '';
      this.title = '';
      this.link = '';
      this.description = '';
    }
  }

  capitalizeFirstLetter = (str:string) => {
    if (!str) return;
    return str.charAt(0).toUpperCase() + str.slice(1);
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
