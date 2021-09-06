import { Component, OnInit, Input } from '@angular/core';

import { SeoService } from "../services/seo.service";

@Component({
  selector: '[app-footer]',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  @Input() title?: string;
  dateObj: any = new Date;
  isBrowser?: boolean;

  constructor(
    private seo: SeoService
  ) {
    this.isBrowser = seo.isBrowser;
   }

  ngOnInit(): void {
  }

}
