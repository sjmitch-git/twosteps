import { Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { MapService } from "../../services/map.service";
import { UserService } from "../../services/user.service";

declare let L: any;

@Component({
  selector: '[app-map]',
  templateUrl: './map.component.html',
  styles: [
  ]
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {

  lon: number = 0;
  lat: number = 0;
  map?: any;
  markers?: any;
  maptype?: string;
  isBrowser: boolean = false;
  alidade_smooth: number = 0;
  OpenStreetMap: number = 1;
  WorldImagery: number = 2;
  Transport: number = 3;
  OpenCycleMap: number = 4;
  tileCounter: number = 0;

  @Input() data?: any[];
  @Input() venue?: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    public ms: MapService,
    public user: UserService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  selectTiles = (i: number) => {
    let self = this;
    this.ms.currentTile = this.ms.tileLayers[this.ms.tiles[i]];
    this.map.eachLayer(function (layer: any) {
      if (!layer._latlng && layer._url) {
        L.tileLayer(self.ms.tileLayers[self.ms.tiles[i]]).addTo(self.map);  
        layer.remove();
        return;
      }
    });
  }

  changeTiles = () => {
    if (this.tileCounter === this.ms.tiles.length -1) this.tileCounter = 0;
    else this.tileCounter ++;
    this.selectTiles(this.tileCounter);
  }

  addMarkers = (arr: any[]) => {
    if (this.markers) this.map.removeLayer(this.markers);
    this.markers = L.featureGroup().addTo(this.map);
    if (!arr.length) return;
    let bounds = [];
    bounds.push({lat:this.lat,lng: this.lon});
    for (let index = 0; index < arr.length; index++) {
      const el = arr[index];
      let lat = el.location.lat;
      let lon = el.location.lng;
      let popup = '<div class="popup click box-shadow-dark" id="' + el.id + '"><h5 class="mb-0">' + el.name + '</h5><p>' + el.categories[0].name + '</p></div>';
      let venueIcon = L.divIcon({
        className:'div-icon bg-' + el.color,
        html:'<img src="' + el.icon +'" width=30>',
        iconAnchor:[15,15],
        popupAnchor:[0, 0],
        iconSize: [30, 30],
      });
     let marker = L.marker([lat, lon], {
        icon: venueIcon,
        title: el.name,
        riseOnHover: true
      }).bindPopup(popup);
      this.markers.addLayer(marker);
      bounds.push({lat:lat,lng: lon});
    }
    this.map.fitBounds(bounds, { padding: [20, 20] });
  }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe((params) => {
      if (params.lat && params.lon) {
        this.lat = params.lat;
        this.lon = params.lon;
        this.maptype = 'results';
      } else if (params.n) {
        this.maptype = 'global';
        if (this.user.lat) {
          this.lat = this.user.lat;
          this.lon = this.user.lon;
        }
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    let that = this;
    let originalTile: any = L.tileLayer(this.ms.currentTile, {maxZoom: 19});
    
    if (this.maptype === 'results' || this.maptype === 'global') {
      let dragMarkerIcon = L.divIcon({
        className:'drag-icon',
        html:'<img src="../../../assets/img/crosshairs.svg" width=30>',
        iconAnchor:[0,0],
        popupAnchor:[0, 0]
      });
      this.map = L.map('map', {
        center:[this.lat, this.lon],
        zoom: 17,
        attributionControl: false,
        layers: originalTile
      });
      let dragMarker = L.marker([this.lat, this.lon], {
        icon: dragMarkerIcon,
        draggable: true,
        autoPan: true,
        title: 'Drag me to explore!'
      }).addTo(this.map)
      .on('dragend', function(event: any){
        let marker = event.target;
        let pos = marker.getLatLng();
        that.go(pos.lat, pos.lng)
      });
      this.map.on('dblclick', function(e: any) {
        let latlng = e.latlng;
        dragMarker.setLatLng(latlng);
        that.go(latlng.lat, latlng.lng);
      });
      this.map.on('resize', function(e: any) {
        setTimeout(function(){ that.map.invalidateSize()}, 2000);
      });
      this.map.on('popupopen', function(e: any) {
        let el = document.getElementsByClassName('popup');
        let id = el[0].getAttribute('id') as string;
        el[0].addEventListener('click', function () {
          that.goVenue(id);
        })
      });
    }
  }

  go = (lat: number, lon: number) => {
    this.router.navigate(['trending'], { 
      queryParams: { lat: lat, lon: lon}
    });
  }

  goVenue = (id: string) => {
    this.router.navigate(['/venue'], { 
      queryParams: { id: id}
    });
  }

  setVenue = (v: any) => {
    if (!this.isBrowser) return;
    let that = this;
    this.lat = v.location.lat;
    this.lon = v.location.lng;
    let originalTile: any = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19});
    this.map = L.map('map', {
      center:[this.lat, this.lon],
      zoom: 16,
      attributionControl: false,
      layers:  originalTile
    });
    let popup = '<div class="popup box-shadow-dark" id="' + v.id + '"><h5 class="mb-0">' + v.name + '</h5><p>' + v.categories[0].name + '</p></div>';
    let icon = v.categories[0].icon.prefix + '32.png';
    let venueIcon = L.divIcon({
      className:'div-icon bg-darkred',
      html:'<img src="' + icon +'" width=30>',
      iconAnchor:[15,15],
      popupAnchor:[0, 0],
      iconSize: [30, 30],
    });
    this.map.on('resize', function(e: any) {
      setTimeout(function(){ that.map.invalidateSize()}, 2000);
    });
    this.map.on('dblclick', function(e: any) {
      let latlng = e.latlng;
      that.router.navigate(['/trending'], { 
        queryParams: { lat: latlng.lat, lon: latlng.lng}
      });
    });
    let venueMarker = L.marker([this.lat, this.lon], {
      icon: venueIcon,
    }).addTo(this.map).bindPopup(popup);
  }

  ngOnChanges(changes: SimpleChanges) {
    let datachange = changes['data']
    if (this.data && !datachange.firstChange) this.addMarkers(this.data);
    let venuechange = changes['venue']
    if (this.venue && !venuechange.firstChange) this.setVenue(this.venue);
  }

}
