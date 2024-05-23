import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { SeoService } from '../../services/seo.service';
import { FoursquareService } from '../../services/foursquare.service';

@Component({
  selector: 'findcategory',
  templateUrl: './findcategory.component.html',
  styles: [],
})
export class FindcategoryComponent implements OnInit {
  category?: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private fsq: FoursquareService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {}

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.fsq.categoriesSimple
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  select = () => {
    let o = this.fsq.categories.find((x) => x.name === this.category);
    this.seo.sendEvent('Search by catergory', `${o.name}`);
    this.go(o.id);
  };

  go = (id: string) => {
    let path = '/search';
    if (this.fsq.path === 'global') path = '/global';
    this.router.navigate([path], {
      queryParams: { c: id, n: this.category },
      queryParamsHandling: 'merge',
    });
  };
}
