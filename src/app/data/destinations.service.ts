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
      lat: 48.856,
      lon: 2.351
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
      lat: 51.5086,
      lon: -0.1264
    },
    {
      name: 'Bangkok',
      country: 'Thailand',
      cc: 'th',
      lat: 13.752222,
      lon: 100.493889
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
      lat: 41.01384,
      lon: 28.9496
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
      name: 'Seoul',
      country: 'South Korea',
      cc: 'kr',
      lat: 37.56,
      lon: 126.99
    },
    {
      name: 'Mecca',
      country: 'Saudi Arabia',
      cc: 'sa',
      lat: 21.4,
      lon: 39.8
    },
    {
      name: 'Nice',
      country: 'France',
      cc: 'fr',
      lat: 43.7034,
      lon: 7.2663
    },
    {
      name: 'Phuket',
      country: 'Thailand',
      cc: 'th',
      lat: 7.89,
      lon: 98.398333
    },
    {
      name: 'Pattaya',
      country: 'Thailand',
      cc: 'th',
      lat: 12.949565,
      lon: 100.893004
    },
    {
      name: 'Milan',
      country: 'Italy',
      cc: 'it',
      lat: 45.464167,
      lon: 9.19027
    },
    {
      name: 'Barcelona',
      country: 'Spain',
      cc: 'es',
      lat: 41.3825,
      lon: 2.176944
    },
    {
      name: 'Palma De Mallorca',
      country: 'Spain',
      cc: 'es',
      lat: 39.566667,
      lon: 2.649722
    },
    {
      name: 'Bali',
      country: 'Indonesia',
      cc: 'id',
      lat: -8.666667,
      lon: 115.216667
    },
    {
      name: 'Singapore',
      country: 'Singapore',
      cc: 'sg',
      lat: 1.29,
      lon: 103.82
    }
  ];
}
