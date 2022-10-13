import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoursquareService {

  lon?: number;
  lat?: number;
  v: number = 20200820;
  endpoint: string = 'https://api.foursquare.com/v2/';
  venues: string = 'venues/';
  radius: number = 10000;
  limit: number = 24;
  CLIENT_ID?: string;
  CLIENT_SECRET?: string;
  radius_options: any[] = [100, 500, 1000, 2500, 5000, 10000, 20000, 50000, 100000];
  limit_options: any[] = [1, 12, 24, 48];
  search: string = 'venues/search?';
  trending: string = 'venues/trending';
  explore: string = 'venues/explore?';
  section: any = {};
  sections: any[] = [
  	{id: 'topPicks', name: 'trending', icon: 'line-chart', colour: 'blue'},
  	{id: 'food', name: 'food', icon: 'cutlery', colour: 'orange'},
  	{id: 'drinks', name: 'drinks', icon: 'glass', colour: 'darkpurple'},
  	{id: 'coffee', name: 'coffee', icon: 'coffee', colour: 'darkred'},
  	{id: 'shops', name: 'shops', icon: 'shopping-bag', colour: 'purple'},
  	{id: 'arts', name: 'arts', icon: 'university', colour: 'red'},
    {id: 'outdoors', name: 'outdoors', icon: 'tree', colour: 'green'}
  ];
  searchOptions: any[] = [
  	{id: '4bf58dd8d48988d1fa931735', name: 'hotels', icon: 'hotel', colour: 'blue'},
  ];
  results?: any[];
  resultsCategories?: any[];
  venue?: any;
  locale: string = 'en';
  colours: any[] = ['red', 'darkred', 'orange', 'green', 'darkgreen', 'blue', 'darkpurple', 'purple', 'darkpurple', 'cadetblue'];
  categoryAirports: string = '4bf58dd8d48988d1ed931735';
  path?: string;
  pathOptions: any[] = ['explore', 'search', 'global'];
  globalCities?: any[];
  categories:any[] = [];

  constructor(
    private httpClient: HttpClient,
  ) {
    this.CLIENT_ID = environment.CLIENT_ID
    this.CLIENT_SECRET = environment.CLIENT_SECRET;
    if (typeof navigator !== 'undefined' && navigator.language) this.locale = navigator.language.split('-')[0];
    else this.locale = 'en';
  }

  getIcon(venue: any) {
    if (!venue.categories) {
      return;
    }
    let url = venue.categories[0].icon.prefix + '32.png';
    return url;
  }

  getColor = () => {
    let i = Math.floor((Math.random() * this.colours.length));
    return this.colours[i];
  }

  processFindResults = (array: any[]) => {
    this.results = [];
    if (!array.length) return;
    for (let index = 0; index < array.length; index++) {
      const el = array[index];
      el.distance = el.location.distance;
      el.popularity = index;
      el.icon = this.getIcon(el);
      el.color = this.getColor();
      this.results.push(el)
    }
    this.results.sort( this.compare );
    this.results[0].nearest = true;
  }

  processResults = (array: any[]) => {
    this.results = [];
    let categories = [];
    for (let index = 0; index < array.length; index++) {
      const el = array[index];
      for (let i = 0; i < el.venue.categories.length; i++) {
        const cat = el.venue.categories[i];
        categories.push(cat)
      } 
      el.venue.distance = el.venue.location.distance;
      el.venue.popularity = index;
      el.venue.icon = this.getIcon(el.venue);
      el.venue.color = this.getColor();
      this.results.push(el.venue);
    }
    this.resultsCategories = categories.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i)
    this.results.sort( this.compare );
    this.results[0].nearest = true;
  }

  compare( a:any, b:any ) {
    if ( a.distance < b.distance ){
      return -1;
    }
    if ( a.distance > b.distance ){
      return 1;
    }
    return 0;
  }

  selectSection = (section: string) => {
    for (let o of this.sections) {
      if (o.name === section) {
        this.section = o;
        break;
      }
    }
  }

  selectCategory = (name: string) => {
    name = this.capitalizeFirstLetter(name);
    for (let o of this.categories) {
      if (o.name === name) {
        return o;
      }
    }
  }

  capitalizeFirstLetter = (str:string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  find = (lat: string, lon: string, category:string) => {
    let params: any = {
      ll: lat + ',' + lon,
      limit: this.limit,
      categoryId: category,
      radius: this.radius,
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      v: this.v
    };
    let url: string = this.endpoint + this.search;
    return this.httpClient.get(url, {params: params});
  }

  findGlobal = (query:string) => {
    let params: any = {
      limit: this.limit,
      query: query,
      intent: 'global',
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      v: this.v
    };
    let url: string = this.endpoint + this.search;
    return this.httpClient.get(url, {params: params});
  }

  getVenues(lat: string, lon: string, category:string) {
    let param: any = {
      ll: lat + ',' + lon,
      limit: this.limit,
      categoryId: category,
      radius: this.radius,
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      locale: this.locale,
      v: this.v
    };
    let url: string = this.endpoint + this.search;
    return this.httpClient.get(url, {params: param});
  }

  getVenue(id: string) {
     let param: any = {
       venuePhotos: 1,
       photos: 1,
       tips: 1,
       client_id: this.CLIENT_ID,
       client_secret: this.CLIENT_SECRET,
       locale: this.locale,
       v: this.v
     };
     let url: string = this.endpoint + this.venues + id;
     return this.httpClient.get(url, {params: param});
   }

  getExplore(lat: string, lon: string) {
    let param: any = {
      ll: lat + ',' + lon,
      limit: this.limit,
      section: this.section.id,
      radius: this.radius,
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      locale: this.locale,
      v: this.v
    };
    let url: string = this.endpoint + this.explore;
    return this.httpClient.get(url, {params: param});
  }

  processVenue(venue: any) {
    //venue.icon = this.getIcon(venue);
    this.trimUrl(venue)
    this.buildGallery(venue);
    this.processTips(venue);
    this.getHours(venue);
    return venue;
  }

  trimUrl(venue: any) {
    if (!venue.url) return venue;
    venue.urlTitle = venue.name.split(' (')[0]
    return venue
  }

  getHours(venue: any) {
    if (!venue.hours && venue.popular) venue.hours = venue.popular;
    return venue;
  }

  processTips (venue: any) {
    let dislikes = 0;
    if (!venue.tips.groups[0]) return venue;
    venue._tips = venue.tips.groups[0].items;
    for (let tip of venue._tips) {
      if (tip.authorInteractionType === 'disliked') ++dislikes;
      if (tip.photourl) {
        let url = tip.photo.prefix + 350 + tip.photo.suffix;
        venue.gallery.push({ 
          src: url, 
          photourl: tip.photourl,
          id: tip.photo.id,
          caption: tip.text, 
          createdAt: tip.createdAt, 
          user: tip.user
        });
      }
    }
    venue.dislikes = dislikes;
    venue.gallery = [...new Set(venue.gallery)];
    return venue;
  }

  buildGallery(venue: any) {
    let arr = [];
    if (venue.photos.count > 0) {
      for (let group of venue.photos.groups) {
        if (group.items.length) {
          for (let item of group.items) {
            let url = item.prefix + 350 + item.suffix;
            arr.push({ 
              src: url,
              id: item.id,
              photourl: url.replace('350', item.width),
              caption: venue.name + ', ' + venue.location.city,
              createdAt: item.createdAt, 
              user: item.user 
            });
          }
        }
      }
      venue.photopreview = this.getPhotopreview(venue);
      venue.gallery = arr;
    }
    return venue;
  }

  getPhotopreview(venue: any) {
    if (!venue.bestPhoto) return;
    else return venue.bestPhoto.prefix + 600 + venue.bestPhoto.suffix;
  }

  processAirports = (list: any[]) => {
    let arr: any[] = [];
    for (let item of list) {
      if (item.categories[0].id === this.categoryAirports) arr.push(item)
    }
    return arr;
  }

}
