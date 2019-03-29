import { Component } from '@angular/core';

import { circle, geoJSON, latLng, Layer, marker, polygon, tileLayer, LatLng } from 'leaflet';

import { LayersModel } from './layers.model';

@Component({
  selector: 'app-map-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.less']
})
export class LayersComponent {

  // Open Street Map definition
  LAYER_OSM = {
    id: 'openstreetmap',
    name: 'Open Street Map',
    enabled: true,
    layer: tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  };

  geoJSON = {
    id: 'geoJSON',
    name: 'Geo JSON Polygon',
    enabled: true,
    layer: geoJSON(
      ({
        type: 'Polygon',
        coordinates: [[
          [ -121.6, 46.87 ],
          [ -121.5, 46.87 ],
          [ -121.5, 46.93],
          [ -121.6, 46.87 ]
        ]]
      }) as any,
      { style: () => ({ color: '#ff7800' })})
  };

  // Form model object
  model = new LayersModel(
    [ this.LAYER_OSM ],
    this.LAYER_OSM.id,
    [ this.geoJSON ]
  );

  // Values to bind to Leaflet Directive
  layers: Layer[];
  layersControl = {
    baseLayers: {
      'Open Street Map': this.LAYER_OSM.layer,
    },
    overlays: {
      GeoJSON: this.geoJSON.layer
    }
  };

  optionsSpec: any = {
    zoom: 10,
    center: [46.879966, -121.726909]
  };

  options = {
    zoom: this.optionsSpec.zoom,
    center: latLng(this.optionsSpec.center)
  };

  zoom = this.optionsSpec.zoom;
  center = latLng(this.optionsSpec.center);

  onCenterChange(center: LatLng) {
    console.log('TCL: onCenterChange -> center', center);
  }

  onZoomChange(zoom: number) {
    console.log('TCL: onZoomChange -> zoom', zoom);
  }

  goToCity(cityName: string) {
    this.zoom = 12;
    if (cityName === 'Spb') {
      this.center = latLng(59.935981779824935, -329.724841142268);
    } else if (cityName === 'Kzn') {
      this.center = latLng(55.789175743755926, -310.93545171236934);
    } else if (cityName === 'Vdk') {
      this.center = latLng(43.11740099178686, -228.11127824899512);
      this.zoom = 13;
    } else if (cityName === 'Smr') {
      this.center = latLng(53.20432027822806, -309.8117564226311);
    }
  }

  constructor() {
    this.apply();
  }

  apply() {

    // Get the active base layer
    const baseLayer = this.model.baseLayers.find((l: any) => (l.id === this.model.baseLayer));

    // Get all the active overlay layers
    const newLayers = this.model.overlayLayers
      .filter((l: any) => l.enabled)
      .map((l: any) => l.layer);
    newLayers.unshift(baseLayer.layer);

    this.layers = newLayers;

    return false;
  }
}
