import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getCategories();
  }

  select = () => {
    let id = this.categories.find(x => x.name === this.category).id;
    this.go(id);
  }

  go = (id: string) => {
    this.router.navigate(['/search'], { 
      queryParams: { c: id, n: this.category},
      queryParamsHandling: "merge"
    });
  }

  getCategories() {
    const url = this.jsonblob + this.jsonblobCategories;
    this.httpClient.get(url).subscribe((res : any)=>{
      this.categories = this.process(res);
      this.categories.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    }, (err) => {
      console.log(err);
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
        for (let subsub of sub.categories) {
          let category = {
            name: subsub.pluralName,
            id: subsub.id
          }
          categories.push(category);
          for (let x of subsub.categories) {
            let category = {
              name: x.pluralName,
              id: x.id
            }
            categories.push(category)
          }
        }
      }  
    }
    return categories;
  }
}
