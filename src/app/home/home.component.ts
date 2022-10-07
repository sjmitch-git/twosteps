import { Component, OnInit } from '@angular/core';
import { SeoService } from "../services/seo.service";
import { DestinationsService } from "../data/destinations.service";
import { FoursquareService } from "../services/foursquare.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  title: string = 'Find Nearby';
  description: string = 'Popular places, restaurants, bars, cafés, shops, arts, outdoors, hotels';
  destinations?: any[];

  constructor(
    public destinationsService: DestinationsService,
    public fsq: FoursquareService,
    public seo: SeoService
  ) { 
    this.destinations = destinationsService.data;
  }

  ngOnInit(): void {
    this.fsq.path = '';
    this.seo.setTitle('Two Steps: ' + this.title)
    this.seo.setDescription(this.description)
    this.seo.setKeywords([this.description])
    this.seo.setImg('https://twosteps.vercel.app/assets/img/brand.png')
  }

}
