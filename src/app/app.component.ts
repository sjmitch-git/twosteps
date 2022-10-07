import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

declare let gtag: any;

@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'twosteps';

  constructor (
    public updates: SwUpdate
  ) {
    updates.available.subscribe(event => {
      if (window.confirm("A new version of this app is available! Download the new version?")) {
        window.location.reload();
      }
    });
  }
}
