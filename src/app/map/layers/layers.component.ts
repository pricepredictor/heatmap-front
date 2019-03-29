import { Component, OnInit } from '@angular/core';

import { geoJSON, latLng, Layer, tileLayer, LatLng, LeafletMouseEvent, Map } from 'leaflet';
import { LayersModel } from './layers.model';
import HeatmapOverlay from 'leaflet-heatmap';
import Spb from '../../../assets/vacancies/spb.json';

@Component({
  selector: 'app-map-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.less']
})
export class LayersComponent {

  constructor() {
    this.data = {
      data: Spb
    };
    
    this.apply();

    console.log('constructor:', this.data);
  }

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

  heatmap = {
    id: 'heatmap',
    name: 'Demo Heatmap',
    enabled: true,
    layer: new HeatmapOverlay({
      radius: 0.01,
      maxOpacity: 0.3,
      scaleRadius: true,
      useLocalExtrema: true,
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count'
    })
  };

  // Form model object
  model = new LayersModel(
    [ this.LAYER_OSM ],
    this.LAYER_OSM.id,
    [ this.geoJSON, this.heatmap ]
  );

  // Values to bind to Leaflet Directive
  layers: Layer[];
  layersControl = {
    baseLayers: {
      'Open Street Map': this.LAYER_OSM.layer,
    },
    overlays: {
      GeoJSON: this.geoJSON.layer,
      Heatmap: this.heatmap.layer
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

  data: object;

  onCenterChange(center: LatLng) {
    console.log('TCL: onCenterChange -> center', center);
  }

  onZoomChange(zoom: number) {
    console.log('TCL: onZoomChange -> zoom', zoom);
  }

  onMapReady(map: Map) {
    console.log('onMapReady:', this.data);
    this.heatmap.layer.setData(this.data);
  }

  goToCity(cityName: string) {
    this.zoom = 12;
    if (cityName === 'Spb') {
      this.center = latLng(59.91110594589895, 30.115283956688852);
    } else if (cityName === 'Kzn') {
      this.center = latLng(55.77724883515888, 49.07249450683594);
    } else if (cityName === 'Vdk') {
      this.center = latLng(43.12191085263059, 131.8620300292969);
      this.zoom = 13;
    } else if (cityName === 'Smr') {
      this.center = latLng( 53.21055181685024, 50.0990622294388);
    }
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
