import { Component, OnInit } from '@angular/core';
import { SeoService } from "../services/seo.service";
import { DestinationsService } from "../data/destinations.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  title: string = 'Find Nearby';
  description: string = 'Restaurants, bars, shops, cafés, museums, galleries, cinemas, theatres, parks, gardens';
  destinations?: any[];

  constructor(
    public destinationsService: DestinationsService,
    public seo: SeoService,
  ) { 
    this.destinations = destinationsService.data;
  }

  ngOnInit(): void {
    this.seo.setTitle(this.title)
    this.seo.setDescription(this.description)
    this.seo.setKeywords([this.description])
    this.seo.setImg('./assets/img/brand.png')
  }

}
