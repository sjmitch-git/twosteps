import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import  { Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';

declare let gtag: any;

@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'twosteps';
  routeChange;

  constructor (
    public updates: SwUpdate,
    private router: Router
  ) {

    this.routeChange = router.events
    .pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    )
    .subscribe(e => {
      setTimeout(() => {
        gtag('config', 'UA-125394580-9', {'page_path':e.urlAfterRedirects});
      }, 4000);
    });

   /*  this.router.events.subscribe(value => {
      if(value instanceof NavigationEnd) {
        console.log('page_path', this.router.url.toString())
        gtag('config', 'UA-UA-125394580-9', {'page_path':this.router.url.toString()});
      }    
    }); */

    updates.available.subscribe(event => {
      if (window.confirm("A new version of this app is available! Download the new version?")) {
        window.location.reload();
      }
    });
  }
}
