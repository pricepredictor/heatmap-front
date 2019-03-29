import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map.component';
import { LayersComponent } from './layers/layers.component';
import { LayersDirective } from './layers/layers.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    LeafletModule.forRoot()
  ],
  declarations: [
    MapComponent,
    LayersComponent,
    LayersDirective
  ],
  exports: [
    MapComponent
  ],
  bootstrap: [ MapComponent ],
  providers: [ ]
})
export class MapModule { }
