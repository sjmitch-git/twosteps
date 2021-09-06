import { Component, OnInit } from '@angular/core';

import { DestinationsService } from "../data/destinations.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  title: string = 'Find nearby';
  description?: string = 'Restaurants, bars, shops, cafés, museums, galleries, cinemas, theatres, parks, gardens';
  destinations?: any[];

  constructor(
    public destinationsService: DestinationsService
  ) { 
    this.destinations = destinationsService.data;
  }

  ngOnInit(): void {
  }

}
