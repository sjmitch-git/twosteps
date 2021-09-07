import { Injectable, Inject } from '@angular/core';
import { DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrolltoService {

  constructor(
    @Inject(DOCUMENT) private dom: Document
  ) { }

  to = (id:string) => {
    let el = this.dom.getElementById(id);
    
    if (el) {
      el.scrollIntoView({behavior: "smooth"});
    }
  }
  
}
