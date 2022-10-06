import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  fullscreen: boolean = false;
  loaded: boolean = false;
  currentTile?: any[];
  tileLayers: any = {
    alidade_smooth: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
    WorldImagery: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    OpenStreetMap: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    Transport: 'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=f18bd41139044ac1ac9d392acf3f9deb',
    OpenCycleMap: 'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=f18bd41139044ac1ac9d392acf3f9deb'
  };
  tiles: any[] = [
    'alidade_smooth',
    'WorldImagery',
    'OpenStreetMap',
    'Transport',
    'OpenCycleMap'
  ]

  constructor() { 
    this.currentTile = this.tileLayers[this.tiles[0]];
  }

  

  togglefullscreen = () => {
    let fullscreen = document.querySelector("#map");
    this.fullscreen = !this.fullscreen;
    if (this.fullscreen) {
      fullscreen?.requestFullscreen();
      document.addEventListener('fullscreenchange', (event) => {
        if (!document.fullscreenElement) this.fullscreen = false;
      });
    } else {
      document.exitFullscreen();
    }
  }
}
