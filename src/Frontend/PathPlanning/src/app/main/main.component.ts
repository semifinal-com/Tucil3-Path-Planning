import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  MessageJSON: any = null;
  public start = 0;
  public destination = 0;

  onSelectFile(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const fileContent = reader.result;
      this.MessageJSON = JSON.parse(fileContent as string);
    };
  }
  onSubmit() {
    console.log(this.start);
    // this.MessageJSON['start'] = this.start;
    // this.MessageJSON['destination'] = this.destination;
  }
}

// file: any;
// submitForm(event: any) {
//   this.file = event.target.files[0];
//   console.log('file', this.file);
//   const reader = new FileReader();
//   reader.readAsText(this.file);

//   reader.onload = () => {
//     const fileContent = reader.result;
//     const json = JSON.parse(fileContent as string);
//     console.log('json', json);
//     // lakukan apa pun yang perlu Anda lakukan dengan objek JSON
//   };
// }

// export class MainComponent implements OnInit {
//   // Declare map for main component
//   map: Map = new Map();
//   vectorSource: VectorSource<any> = new VectorSource({});
//   vectorLayer: VectorLayer<VectorSource<any>> = new VectorLayer({
//     source: this.vectorSource
//   });
//   markers: Feature[] = [];
//   isAddingLine: boolean = false;
//   startCoord: Coordinate = [0, 0];
//   tempCoord: Feature<Point> = new Feature<Point>(new Point([0, 0]));

//   ngOnInit() {
//     this.initMap();
//   }

//   private initMap() {
//     this.map = new Map({
//       target: 'map',
//       layers: [
//         new TileLayer({
//           source: new OSM()
//         }),
//         this.vectorLayer
//       ],
//       view: new View({
//         center: fromLonLat([107.6107, -6.8915]),
//         zoom: 16
//       })
//     });

//     // Add a click listener to the map
//     this.map.on('click', (event) => {
//       if (!this.isAddingLine) {
//         // Add a marker at the clicked location
//         this.addMarker(fromLonLat(event.coordinate));
//       } else {
//         // Add a line from the previously clicked marker to the current marker
//         this.addLine([this.startCoord, event.coordinate]);
//         this.isAddingLine = false;
//       }
//     });
//   }

//   addMarker(coord: Coordinate) {
//     const marker = new Feature({
//       geometry: new Point(coord),
//       name: 'Marker',
//       type: 'marker' // Add a type property to the marker
//     });

//     const iconStyle = new Style({
//       image: new Icon({
//         anchor: [0.5, 46],
//         anchorXUnits: 'fraction',
//         anchorYUnits: 'pixels',
//         src: 'https://openlayers.org/en/latest/examples/data/icon.png'
//       })
//     });

//     marker.setStyle(iconStyle);
//     this.markers.push(marker);

//     this.vectorSource.addFeature(marker);

//     // If this is the second marker clicked, start adding a line between them
//     if (this.markers.length === 2 ) {
//       this.isAddingLine = true;
//       if(this.markers[0] instanceof SimpleGeometry){
//         // disii bang ini padahal tipe udah geometry
//         this.startCoord = this.markers[0].getGeometry().getCoordinates();
//       }

//     }
//   }

//   addLine(coordinates: Coordinate[]) {
//     const lineString = new LineString(coordinates);

//     const lineStyle = new Style({
//       stroke: new Stroke({
//         color: 'black',
//         width: 3
//       })
//     });

//     const lineFeature = new Feature({
//       geometry: lineString
//     });

//     lineFeature.setStyle(lineStyle);
//     this.vectorSource.addFeature(lineFeature);
//   }
// }
