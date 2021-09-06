import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FoursquareService } from "../../services/foursquare.service";

@Component({
  selector: '[results]',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent implements OnInit {

  orderby: string = 'popularity';
  orderbyOptions: any[] = ['name', 'popularity', 'distance'];
  section?: string;
  sections: any[] = ['trending', 'food', 'drinks', 'coffee', 'shops', 'arts', 'outdoors'];
  filter: string = '';

  constructor(
    public fsq: FoursquareService,
    private router: Router
  ) {
    this.orderbyOptions.sort();
  }

  selectSection = () => {
    this.router.navigate(['/' + this.section], {
      queryParams: { n: null},
      queryParamsHandling: "merge"
    });
  }

  selectRadius = () => {
    this.router.navigate([], { 
      queryParams: { r: this.fsq.radius},
      queryParamsHandling: "merge"
    });
  }

  ngOnInit(): void {
    this.section = this.fsq.section.name;
    if (!this.section) this.section = 'explore';
  }

}
