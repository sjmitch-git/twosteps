import { Component, OnInit } from '@angular/core';

import { FoursquareService } from "../../services/foursquare.service";

@Component({
  selector: 'global',
  templateUrl: './global.component.html',
  styles: [
  ]
})
export class GlobalComponent implements OnInit {

  constructor(
    public fsq: FoursquareService,
  ) { }

  ngOnInit(): void {
  }

}
