import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FoursquareService } from "../../services/foursquare.service";
import { SeoService } from "../../services/seo.service";
import { ScrolltoService } from "../../services/scrollto.service";
import { ModalService } from "../../services/modal.service";

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
    public fsq: FoursquareService,
    public scroll: ScrolltoService,
    public modal: ModalService,
  ) { 
    this.isBrowser = seo.isBrowser;
  }

  openModal = (img: any) => {
    this.modal.src = img.src.replace('/350/', '/800/');
    this.modal.caption = img.caption;
    this.modal.openModal = true;
    document.body.style[<any>"overflow-y"] = "hidden";
  }

  finally = () => {
    this.loading = false;
    this.updateSeo(this.fsq.venue);
    if (!this.isBrowser) return;
    setTimeout(() => {
      this.scroll.to('page');
    }, 2000);
  }

  handleError = (res: any) => {
    if (res.name && res.name === 'HttpErrorResponse') this.notconnected();
    else this.errors = res.warning.text;
  }

  notconnected = () => {
    this.router.navigate(['/notconnected'], {});
  }

  getVenue = (id: string) => {
    this.loading = true;
    this.modal.images = []
    this.fsq.getVenue(id).subscribe((res : any)=>{
      this.fsq.venue = this.fsq.processVenue(res.response.venue);
    }, (err) => {
      this.handleError(err)
    }, () => {
      this.finally();
    });
  }

  updateSeo = (v: any) => {
    this.title = v.name + ' (' + v.categories[0].name + ') ' + (v.location.city || v.location.postalCode || v.location.country);
    this.seo.setTitle(this.title);
    if (v.gallery && v.gallery.length) {
      this.seo.setImg(v.gallery[0].src);
      this.updateModal(v.gallery)
    }
    this.setDescription(this.fsq.venue);
    this.seo.setVenueKeywords(this.fsq.venue);
    if (v.location) this.seo.setLocation(v.location);
  }

  updateModal = (gallery: any[]) => {
    this.modal.images.push(gallery)
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
