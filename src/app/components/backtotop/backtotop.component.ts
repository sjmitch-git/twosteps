import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT} from '@angular/common';

@Component({
  selector: 'backtotop',
  templateUrl: './backtotop.component.html',
  styles: [
  ]
})
export class BacktotopComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private dom: Document
  ) { }

  topFunction = () => {
    this.dom.body.scrollTop = 0;
    this.dom.documentElement.scrollTop = 0;
  }

  scrollFunction = (button: any, h: number) => {
    if (!button) return;
    if (this.dom.body.scrollTop > h || this.dom.documentElement.scrollTop > h) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  }

  ngOnInit(): void {
    let button = this.dom.getElementById("scrollbtn");

    if (!button) return;

    if (typeof window !== 'undefined' ) {
      let that = this;
      window.onscroll = function() {that.scrollFunction(button, window.innerHeight)};
    }
  }

}
