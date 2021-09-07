import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {

  constructor() { }

  data: any[] = [
    {
      name: 'Paris',
      country: 'France',
      cc: 'fr',
      lat: 48.8566,
      lon: 2.3522
    },
    {
      name: 'New York',
      country: 'U.S.A',
      cc: 'us',
      lat: 40.7128,
      lon: -74.0060
    },
    {
      name: 'London',
      country: 'United Kingdom',
      cc: 'uk',
      lat: 51.5074,
      lon: -0.1278
    },
    {
      name: 'Bangkok',
      country: 'Thailand',
      cc: 'th',
      lat: 13.7563,
      lon: 100.5018
    },
    {
      name: 'Hong Kong',
      country: 'China',
      cc: 'cn',
      lat: 22.3193,
      lon: 114.1694
    },
    {
      name: 'Dubai',
      country: 'United Arab Emirates',
      cc: 'ua',
      lat: 25.2048,
      lon: 55.2708
    },
    {
      name: 'Sydney',
      country: 'Australia',
      cc: 'au',
      lat: -33.866666666667,
      lon: 151.2
    },
    {
      name: 'Kuala Lumpur',
      country: 'Singapore',
      cc: 'my',
      lat: 3.147778,
      lon: 101.695278
    },
    {
      name: 'Tokyo',
      country: 'Japan',
      cc: 'jp',
      lat: 35.689722,
      lon: 139.692222
    },
    {
      name: 'Istanbul',
      country: 'Turkey',
      cc: 'tr',
      lat: 1.3,
      lon: 103.8
    },
    {
      name: 'Antalya',
      country: 'Turkey',
      cc: 'tr',
      lat: 36.90812,
      lon: 30.69556
    },
    {
      name: 'Osaka',
      country: 'Japan',
      cc: 'jp',
      lat: 34.693611,
      lon: 135.501944
    },
    {
      name: 'Seoul ',
      country: 'South Korea',
      cc: 'kr',
      lat: 37.56,
      lon: 126.99
    }
  ];
}
