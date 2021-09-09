import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FoursquareService } from "../services/foursquare.service";
import { MapService } from "../services/map.service";
import { SeoService } from "../services/seo.service";
import { ScrolltoService } from "../services/scrollto.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  title: string = '';
  section: string = 'explore';
  loading?: boolean;
  errors?: string;
  isBrowser?: boolean;
  path?: string;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public fsq: FoursquareService,
    private seo: SeoService,
    public scroll: ScrolltoService,
    public ms: MapService,
  ) {
    this.isBrowser = seo.isBrowser;
   }

  handleError = (res: any) => {
    if (res.warning) this.errors = res.warning.text;
    else if (res.error && res.error.meta) this.errors = res.error.meta.errorDetail;
    else {
      this.errors = 'No results';
      this.fsq.results = [];
    }
    this.loading = false;
  }

  finally = () => {
    this.loading = false;
    this.updateSeo(this.fsq.results);
    if (!this.isBrowser) return;
    setTimeout(() => {
      this.scroll.to('page');
    }, 2000);
  }

  explore = (lon: string, lat:string) => {
    this.loading = true;
    this.errors = '';
    this.fsq.getExplore(lon, lat).subscribe((res : any)=>{
      if (res.response.totalResults === 0) return this.handleError(res.response)
      if (res.response.warning) this.handleError(res.response)
      this.fsq.processResults(res.response.groups[0].items);
      this.title = res.response.headerFullLocation;
      this.section = res.response.groups[0].type;
    }, (err) => {
      this.handleError(err)
    }, () => {
      this.finally();
    });
  }

  find = (lat: string, lon: string, category:string) => {
    this.loading = true;
    this.errors = '';
    this.section = '';
    this.fsq.find(lat, lon, category).subscribe((res : any)=>{
      if (!res.response.venues.length) return this.handleError(res.response)
      if (res.response.warning) this.handleError(res.response)
      this.fsq.processFindResults(res.response.venues);
    }, (err) => {
      this.handleError(err)
    }, () => {
      this.finally();
    });
  }

  updateSeo = (res: any) => {

    let city;
    let cc;
    let state;

    for (let i = 0; i < res.length; i++) {
      city =  res[i].location.city;
      cc =  res[i].location.cc;
      state =  res[i].location.state;
      this.seo.setLocation(res[i].location);
      if (city) break;
    }

    if (this.path === 'search') {
      if (state) this.seo.setTitle(`${this.title} near me in ${city}, ${state}-${cc}`)
      else this.seo.setTitle(`${this.title} near me in ${city}, ${cc}`)
    } else {
      let section = this.capitalizeFirstLetter(this.fsq.section.name);
      if (state) this.seo.setTitle(`${section} Places near me in ${this.title}, ${state}-${cc}`)
      else this.seo.setTitle(`${section} Places near me in ${this.title}, ${cc}`)
    }
    this.seo.setDescription(this.seo.title.getTitle() + ' (' + res?.length + ' results)');
    this.setKeywords(res);
    this.seo.setImg('https://twosteps.herokuapp.com/assets/img/brand.png')
  }

  setKeywords = (res: any) => {
    let keywords: any[] = [];
    for (let index = 0; index < res.length; index++) {
      const el = res[index];
      keywords.push(el.name)
      for (let i = 0; i < el.categories.length; i++) {
        const cat = el.categories[i];
        keywords.push(cat.pluralName)
      }
    }
    keywords = [...new Set(keywords)];
    this.seo.setKeywords(keywords)
  }

  capitalizeFirstLetter = (str:string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.fsq.radius = params.r || this.fsq.radius;
      this.fsq.lat = params.lat;
      this.fsq.lon = params.lon;
      this.path = this.router.url.split('?')[0].split('/')[1];
      if (this.path === 'search') {
        this.find(params.lat, params.lon, params.c)
        this.title = params.n;
        this.fsq.section = 'explore';
      } else {
        this.fsq.section = this.path;
        this.fsq.selectSection(this.path);
        this.explore(params.lat, params.lon)
      }
    });
  }

}
