import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-map',
  template: `
    <link
      rel="stylesheet"
      href="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.3.0/css/ol.css"
      type="text/css"
    />

    <!-- <form (click)="submitNumber()">
      <label for="numberInput">Enter a number:</label>
      <p>{{ numberInput }}</p>
      <input #box (keyup)="onEnter(box.value)" />
      <button type="submit">Submit</button>
    </form> -->
    <!-- <input type="file" (change)="onFileSelected($event)" />
    <input #box1 type="text" />
    <input #box2 type="text" />
    <button (click)="onEnter(box1.value, box2.value)">Click</button>
    <p>hasil : {{ numberInput }}</p> -->
    <div id="map" class="map"></div>
  `,
  // templateUrl: './main.component.html',
  styleUrls: ['./test-component.component.css'],
})
export class TestComponentComponent implements OnInit {
  map: Map = new Map({});

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [6.8915, 107.6107],
        zoom: 2,
      }),
    });
  }
}
// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-test-component',
//   template: `
//     <!-- <form (click)="submitNumber()">
//       <label for="numberInput">Enter a number:</label>
//       <p>{{ numberInput }}</p>
//       <input #box (keyup)="onEnter(box.value)" />
//       <button type="submit">Submit</button>
//     </form> -->
//     <!-- <input type="file" (change)="onFileSelected($event)" />
//     <input #box1 type="text" />
//     <input #box2 type="text" />
//     <button (click)="onEnter(box1.value, box2.value)">Click</button>
//     <p>hasil : {{ numberInput }}</p> -->
//     <div id="map" class="map"></div>
//   `,
// })
// export class TestComponentComponent {
//   numberInput: number;
//   MessageJSON: any = null;

//   constructor(private http: HttpClient) {
//     this.numberInput = 0;
//   }

//   onFileSelected(event: any) {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.readAsText(file);
//     reader.onload = () => {
//       const fileContent = reader.result;
//       this.MessageJSON = JSON.parse(fileContent as string);
//       console.log(this.MessageJSON);
//     };
//   }

//   async onEnter(idStart: string, idDest: string) {
//     var dest = parseInt(idDest);
//     var strt = parseInt(idStart);

//     this.MessageJSON.from = strt;
//     this.MessageJSON.to = dest;
//     this.MessageJSON.algo = 'UCS';

//     await this.http
//       .post('http://localhost:8080/', this.MessageJSON)
//       .toPromise();

//     await this.http.get('http://localhost:8080/').subscribe((data) => {
//       console.log(data);
//     });
//   }
// }
