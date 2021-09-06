import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from "../../services/user.service";
import { FoursquareService } from "../../services/foursquare.service";

@Component({
  selector: 'getlocation',
  templateUrl: './getlocation.component.html',
  styles: [
  ]
})
export class GetlocationComponent implements OnInit {

  errors?: string;

  constructor(
    private router: Router,
    public user: UserService,
    public fsq: FoursquareService
  ) { }

  ngOnInit(): void {
  }

  selectSection = (section: any) => {
    this.fsq.section = section;
    if (!this.user.lat && !this.user.lon) this.getLocation();
    else {
      this.router.navigate(['/' + this.fsq.section.name], { 
        queryParams: { lat: this.fsq.lat, lon: this.fsq.lon, r: this.fsq.radius}
      });
    }
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
    this.go(lat, lon);
  }

  go = (lat: number, lon: number) => {
    this.router.navigate(['/' + this.fsq.section.name], { 
      queryParams: { lat: lat, lon: lon, r: this.fsq.radius}
    });
  }

}
