import { Directive } from '@angular/core';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';

@Directive({
    selector: '[appLayersDirective]'
 })
 export class LayersDirective {
    leafletDirective: LeafletDirective;

    constructor(leafletDirective: LeafletDirective) {
       this.leafletDirective = leafletDirective;
    }

    someFunction() {
       if (null != this.leafletDirective.getMap()) {
          // Do stuff with the map
          console.log(this.leafletDirective.getMap());
       }
    }
 }
