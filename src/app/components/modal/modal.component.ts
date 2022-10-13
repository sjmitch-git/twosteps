import { Component, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from "../../services/modal.service";

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit, OnDestroy {

  constructor(
    public modal: ModalService,
  ) { }

  ngOnInit(): void {
   // console.log(this.modal)
  }

  ngOnDestroy() {
    this.modal.close();
  }

}
