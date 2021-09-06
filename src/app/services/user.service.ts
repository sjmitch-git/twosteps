import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  lon?: number;
  lat?: number;

  constructor() { }
}
