import { Component, OnInit } from '@angular/core';

import { GeonamesService } from "../../services/geonames.service";

@Component({
  selector: 'search-geonames',
  templateUrl: './geonames.component.html',
  styles: [
  ]
})
export class GeonamesComponent implements OnInit {

  q: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(
    public geo: GeonamesService,
  ) { }

  ngOnInit(): void {
  }

  errorHandler = (msg: string) => {
    this.error = msg;
    this.loading = false;
  }

  search = () => {
    this.error = '';
    this.loading = true;
    this.geo.search(this.q).subscribe((res : any)=>{
      if (!res.geonames.length) return this.errorHandler('No results for ' + this.q)
      this.geo.results = res.geonames;
    }, (err) => {
      this.errorHandler(err)
    }, () => {
      this.loading = false;
    });
  }

}
