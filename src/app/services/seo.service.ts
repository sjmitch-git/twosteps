import { Injectable, Inject, PLATFORM_ID} from '@angular/core';
import { Meta, Title  } from '@angular/platform-browser';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  isBrowser: boolean = false;
  href: string = '';
  hashtags: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private meta: Meta,
    public title: Title,
    @Inject(DOCUMENT) private dom: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.meta.addTag({property: 'og:title', content:''});
    this.meta.addTag({name: 'twitter:title', content:''});
    this.meta.addTag({name: 'twitter:text:title', content:''});
    this.meta.addTag({name: 'description', content: ''});
    this.meta.addTag({property: 'og:description', content: ''});
    this.meta.addTag({name: 'twitter:description', content: ''});
    this.meta.addTag({name: 'keywords', content: ''});
    this.meta.addTag({name: 'author', content: 'Stephen Mitchell'});
    this.meta.addTag({name: 'og:type', content: 'website'});
    this.meta.addTag({property: 'og:image', content: ''});
    this.meta.addTag({property: 'og:image:secure_url', content: ''});
    this.meta.addTag({name: 'twitter:image', content: ''});
    this.meta.addTag({name: 'og:image:width', content: '500'});
    this.meta.addTag({name: 'og:image:height', content: '250'});
    this.meta.addTag({name: 'twitter:card', content: 'summary_large_image'});
    this.meta.addTag({name: 'robots', content: 'index, follow'});
    this.meta.addTag({name: 'geo.region', content: ''});
    this.meta.addTag({name: 'geo.placename', content: ''});
    this.meta.addTag({name: 'geo.position', content: ''});
    this.meta.addTag({name: 'ICBM', content: ''});
  }

  updateCanonicalURL() {
    let link = this.dom.querySelectorAll('[rel="canonical"]')[0];
    let url: string = this.dom.URL;
    url.replace('http://', 'https://')
    link.setAttribute('href', url);
    this.href = url;
    this.meta.updateTag({property: 'og:url', content: url});
  }

  setTitle(title:string) {
    this.title.setTitle(title);
    this.meta.updateTag({property: 'og:title', content: title});
    this.meta.updateTag({name: 'twitter:title', content: title});
    this.meta.updateTag({name: 'twitter:text:title', content: title});
    this.updateCanonicalURL();
  }

  setDescription(description:string) {
    this.meta.updateTag({name: 'description', content: description});
    this.meta.updateTag({property: 'og:description', content: description});
    this.meta.updateTag({name: 'twitter:description', content: description});
  }

  setImg(src:string) {
    this.meta.updateTag({property: 'og:image', content: src});
    this.meta.updateTag({property: 'og:image:secure_url', content: src});
    this.meta.updateTag({name: 'twitter:image', content: src});
  }

  setKeywords(keywords:any[]) {
    this.meta.updateTag({name: 'keywords', content: keywords.toString()});
  }

  setLocation(location:any) {
    if (location.cc) {
      if (location.state) this.meta.updateTag({name: 'geo.region', content: `${location.cc}-${location.state}`});
      else this.meta.updateTag({name: 'geo.region', content: location.cc});
    }
    if (location.city) this.meta.updateTag({name: 'geo.placename', content: location.city});
    this.meta.updateTag({name: 'geo.position', content: `${location.lat};${location.lng}`});
    this.meta.updateTag({name: 'ICBM', content: `${location.lat},${location.lng}`});
  }

  setVenueKeywords = (v:any) => {
    let keywords: any[] = [];
    if (v.attributes) {
      for (let index = 0; index < v.attributes.groups.length; index++) {
        const el = v.attributes.groups[index];
        keywords.push(el.name)
      }
    }
    if (v.categories) {
      for (let index = 0; index < v.categories.length; index++) {
        const el = v.categories[index];
        keywords.push(el.name)
      }
    }
    if (v.location && v.location.formattedAddress) {
      for (let index = 0; index < v.location.formattedAddress.length; index++) {
        keywords.push(v.location.formattedAddress[index])
      }
    }
    if (v.price) {
      keywords.push(v.price.message + ' prices');
    }
    keywords.push(v.name)
    this.setKeywords(keywords)
  }

}
