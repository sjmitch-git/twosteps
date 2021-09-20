import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import { SeoService } from "../../services/seo.service";
import { FoursquareService } from "../../services/foursquare.service";

@Component({
  selector: 'findcategory',
  templateUrl: './findcategory.component.html',
  styles: [
  ]
})
export class FindcategoryComponent implements OnInit, AfterViewInit {

  jsonblob:string = 'https://jsonblob.com/api/jsonBlob/';
  jsonblobCategories:string = '90592d58-e86b-11eb-9694-697c0d84faea';
  categories:any[] = [];
  category?: any;
  categoriesSimple:any[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private fsq: FoursquareService,
    private seo: SeoService
  ) { }

  ngOnInit(): void {
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.categoriesSimple.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  ngAfterViewInit(): void {
    this.getCategories();
  }

  select = () => {
    let o = this.categories.find(x => x.name === this.category);
    this.seo.sendEvent('Search by catergory', `${o.name}`)
    this.go(o.id);
  }

  go = (id: string) => {
    let path = '/search';
    if (this.fsq.path === 'global') path = '/global';
    this.router.navigate([path], { 
      queryParams: { c: id, n: this.category},
      queryParamsHandling: "merge"
    });
  }

  getCategories() {
    const url = this.jsonblob + this.jsonblobCategories;
    this.httpClient.get(url).subscribe((res : any)=>{
      this.fsq.categories = this.categories = this.process(res);
      this.categories.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    }, (err) => {
      this.seo.sendEvent('Error', 'Failed to download FSQ categories blob')
    });
  }

  process(array: any[]) {
    let categories = [];
    let sub_categories = [];
    for (let index = 0; index < array.length; index++) {
      const el = array[index];
      for (let sub of el.categories) {
        let category = {
          name: sub.pluralName,
          id: sub.id
        }
        categories.push(category)
        this.categoriesSimple.push(sub.pluralName);
        for (let subsub of sub.categories) {
          let category = {
            name: subsub.pluralName,
            id: subsub.id
          }
          categories.push(category);
          this.categoriesSimple.push(subsub.pluralName);
          for (let x of subsub.categories) {
            let category = {
              name: x.pluralName,
              id: x.id
            }
            categories.push(category)
            this.categoriesSimple.push(x.pluralName);
          }
        }
      }  
    }
    this.categoriesSimple.sort();
    return categories;
  }
}
