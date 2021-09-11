import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from "../../services/user.service";
import { FoursquareService } from "../../services/foursquare.service";
import { SeoService } from "../../services/seo.service";

import { Section } from "../../models/section";

@Component({
  selector: 'getlocation',
  templateUrl: './getlocation.component.html',
  styles: [
  ]
})
export class GetlocationComponent implements OnInit {

  errors?: string;
  searchSection: Section = {
    id: '',
    name: ''
  };
  path?: string;

  constructor(
    private router: Router,
    public user: UserService,
    public fsq: FoursquareService,
    public seo: SeoService
  ) { }

  ngOnInit(): void {
  }

  selectSection = (section: any) => {
    this.path = 'explore';
    this.fsq.section = section;
    this.getLocation();
  }

  selectSearch = (section: any) => {
    this.path = 'search';
    this.searchSection = section;
    this.getLocation();
  }

  getLocation(): void{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          this.setUser(longitude, latitude);
        });
    } else {
       this.errors = "No support for geolocation";
    }
  }

  setUser(lon: number, lat: number){
    this.user.lat = lat;
    this.user.lon = lon;
    if (this.path === 'search') this.search(lat, lon);
    else this.go(lat, lon);
  }

  go = (lat: number, lon: number) => {
    this.seo.sendEvent('Go location', `${lat}, ${lon}, ${this.fsq.section.name}`)
    this.router.navigate(['/' + this.fsq.section.name], { 
      queryParams: { lat: lat, lon: lon, c:null, n: null}
    });
  }

  search = (lat: number, lon: number) => {
    this.seo.sendEvent('Search location', `${lat}, ${lon}`)
    this.router.navigate(['/search'], { 
      queryParams: { lat: lat, lon: lon, c: this.searchSection.id, n: this.searchSection.name}
    });
  }

}
