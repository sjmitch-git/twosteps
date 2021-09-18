import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-notconnected',
  templateUrl: './notconnected.component.html',
  styles: [
  ]
})
export class NotconnectedComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  connected = () => {
    this.router.navigate(['/'], {});
  }

  ngOnInit(): void {
    if (navigator.onLine) this.connected();
  }

}
