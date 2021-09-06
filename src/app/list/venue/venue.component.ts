import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FoursquareService } from "../../services/foursquare.service";
import { SeoService } from "../../services/seo.service";

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styles: [
  ]
})
export class VenueComponent implements OnInit {

  loading?: boolean;
  errors?: string;
  title: string = '';
  isBrowser?: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seo: SeoService,
    public fsq: FoursquareService
  ) { 
    this.isBrowser = seo.isBrowser;
  }

  handleError = (res: any) => {
    this.errors = res.warning.text;
  }

  getVenue = (id: string) => {
    this.loading = true;
  	this.fsq.getVenue(id).subscribe((res : any)=>{
      this.fsq.venue = this.fsq.processVenue(res.response.venue);
    }, (err) => {
      this.handleError(err)
    }, () => {
      this.loading = false;
      this.updateSeo(this.fsq.venue);
    });
  }

  updateSeo = (v: any) => {
    this.title = v.name + ' (' + v.categories[0].name + ') ' + (v.location.city || v.location.postalCode || v.location.country);
    this.seo.setTitle(this.title);
    if (v.gallery.length) this.seo.setImg(v.gallery[0].src);
    this.setDescription(this.fsq.venue);
    this.seo.setVenueKeywords(this.fsq.venue);
    if (v.location) this.seo.setLocation(v.location);
  }

  setDescription = (v:any) => {
    if (v.description) this.seo.setDescription(v.description);
    else if (v._tips) this.seo.setDescription(v._tips[0].text);
    else if (v.location && v.location.formattedAddress) this.seo.setDescription(v.location.formattedAddress.toString());
    else this.seo.setDescription(this.title)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getVenue(params.id)
    });
  }

}
