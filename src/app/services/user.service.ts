import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  lon: number = 0;
  lat: number = 0;

  constructor() { }
}
