import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FoursquareService } from "../services/foursquare.service";
import { UserService } from "../services/user.service";

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  @Input() title?: string;

  constructor(
    public fsq: FoursquareService,
    public user: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
