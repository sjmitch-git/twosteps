import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  openModal?: boolean;
  src?: string;
  caption?: string;

  constructor() { 
  }

  close = () => {
    this.openModal = false;
    document.body.style[<any>"overflow-y"] = "auto";
  }
}
