import { Component, OnInit } from '@angular/core';

import { SeoService } from "../../services/seo.service";

@Component({
  selector: 'share',
  templateUrl: './share.component.html',
  styles: [
  ]
})
export class ShareComponent implements OnInit {

  hashtags: string = 'twoSteps';
  href: string = '';
  title: string = '';

  constructor(
    private seo: SeoService
  ) {
   }

  ngOnInit(): void {
  }

  go = (cat:string) => {
    switch (cat) {
      case 'Twitter':
        this.goTwitter();
        break;
      case 'Facebook':
        this.goFacebook();
        break;
      case 'Whatsapp':
        this.goWhatsapp();
        break;
      case 'Linkedin':
          this.goLinkedin();
          break;
      case 'Mail':
        this.goMail();
        break;
    }
  }

  goMail = () => {
    let url = `mailto:?&subject=${this.title}&body=${encodeURIComponent(this.href)}`;
    this.navigate(url);
  }

  goTwitter = () => {
   let url = `https://twitter.com/share?url=${encodeURIComponent(this.href)}&text=${this.title}&hashtags=${this.hashtags}`
   this.navigate(url);
  }

  goFacebook = () => {
    let url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.href)}`
    this.navigate(url);
  }

  goWhatsapp = () => {
    let url = `https://api.whatsapp.com/send?text=${this.title}, ${encodeURIComponent(this.href)}`;
    this.navigate(url);
  }

  goLinkedin = () => {
    let url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.href)}`;
    this.navigate(url);
  }

  navigate = (href:string) => {
    if (typeof window !== "undefined") {
      window.open(href, 'windowName');
    }
  }

  share = (cat:string) => {
    this.title = this.seo.title.getTitle();
    this.href = this.seo.href;
    this.seo.sendEvent(cat, `${this.title}`)
    this.go(cat);
  }

}
