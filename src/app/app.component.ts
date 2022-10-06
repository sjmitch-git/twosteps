import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import  { Router, NavigationEnd } from "@angular/router";
declare let gtag: any;

@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'twosteps';

  constructor (
    public updates: SwUpdate,
    private router: Router
  ) {
    this.router.events.subscribe(value => {
      if(value instanceof NavigationEnd) {
        console.log('page_path', this.router.url.toString())
        gtag('config', 'UA-UA-125394580-9', {'page_path':this.router.url.toString()});
      }    
    });

    updates.available.subscribe(event => {
      if (window.confirm("A new version of this app is available! Download the new version?")) {
        window.location.reload();
      }
    });
  }
}
