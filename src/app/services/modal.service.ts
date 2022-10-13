import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  openModal?: boolean;
  src?: string;
  caption?: string;
  images: any[] = []

  constructor() { 
   // console.log('service', this)
  }

  close = () => {
    this.openModal = false;
    document.body.style[<any>"overflow-y"] = "auto";
  }
}
