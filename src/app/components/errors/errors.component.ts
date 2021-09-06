import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'error',
  templateUrl: './errors.component.html',
  styles: [
  ]
})
export class ErrorsComponent implements OnInit {

  @Input() msg?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
