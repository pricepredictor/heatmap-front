import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  showDemo = false;

  ngOnInit() {

    // Primarily for debugging
    setTimeout(() => {
      this.showDemo = true;
    }, 1000);

  }
}
