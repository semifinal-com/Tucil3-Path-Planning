import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import { Vector } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Style, Stroke, Circle, Fill, Text } from 'ol/style';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  MessageJSON: any = null;
  rute: string = '';

  numberInput: number;
  gender: string = '';
  map: Map = new Map({});
  markerLayer = new VectorLayer({});
  lineLayer = new VectorLayer({});

  constructor(private http: HttpClient) {
    this.numberInput = 0;
  }

  ngOnInit(): void {
    this.initMap();
    this.initLineLayer();
    this.initMarkerLayer();
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
        center: fromLonLat([2, 2]),
        zoom: 10,
      }),
    });
  }

  draw2MarkersAndLine(coor1: any, name1: string, coor2: any, name2: string) {
    var marker1: Feature = new Feature({});
    var marker2: Feature = new Feature({});
    const markerSource = this.markerLayer.getSource();

    console.log(coor1);

    // add first marker
    marker1 = new Feature({
      geometry: new Point(fromLonLat([coor1[1], coor1[0]])),
      nama: name1,
    });
    // add second marker
    marker2 = new Feature({
      geometry: new Point(fromLonLat([coor2[1], coor2[0]])),
      nama: name2,
    });

    // marker.setStyle(iconStyle);
    // this.markers.push(marker);

    markerSource?.addFeature(marker1);
    markerSource?.addFeature(marker2);

    // // If this is the second marker clicked, start adding a line between them
    // if (this.markers.length === 2 ) {
    //   this.isAddingLine = true;
    //   if(this.markers[0] instanceof SimpleGeometry){
    //     // disii bang ini padahal tipe udah geometry
    //    // this.startCoord = this.markers[0].getGeometry().getCoordinates();
    //   }

    // add line between markers
    const lineSource = this.lineLayer.getSource();

    if (lineSource && marker1.getGeometry() && marker2.getGeometry()) {
      const line = new Feature({
        geometry: new LineString([
          (<Point>marker1.getGeometry()).getCoordinates(),
          (<Point>marker2.getGeometry()).getCoordinates(),
        ]),
        nama: 'dist',
      });
      lineSource.addFeature(line);
    }
  }

  onAlgoChanged(event: Event) {
    this.gender = (event.target as HTMLInputElement).value;
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const fileContent = reader.result;
      this.MessageJSON = JSON.parse(fileContent as string);
    };
  }

  private initMarkerLayer(): void {
    const markerSource = new Vector({
      features: [],
    });

    const markerStyle = new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({ color: 'red' }),
        stroke: new Stroke({
          color: 'white',
          width: 2,
        }),
      }),
      text: new Text({
        text: '',
        font: '12px sans-serif',
        fill: new Fill({ color: 'black' }),
        stroke: new Stroke({
          color: 'white',
          width: 2,
        }),
        offsetY: -15, // mengatur posisi teks ke atas
      }),
    });

    this.markerLayer = new VectorLayer({
      source: markerSource,
      style: function (feature) {
        markerStyle.getText().setText(feature.get('nama'));
        return markerStyle;
      },
    });

    this.map.addLayer(this.markerLayer);
  }

  private initLineLayer(): void {
    const lineSource = new Vector({
      features: [],
    });

    const lineStyle = new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 5,
      }),
      text: new Text({
        text: '',
        font: '12px sans-serif',
        fill: new Fill({ color: 'black' }),
        stroke: new Stroke({
          color: 'white',
          width: 2,
        }),
        offsetY: -15, // mengatur posisi teks ke atas
      }),
    });

    this.lineLayer = new VectorLayer({
      source: lineSource,
      style: function (feature) {
        lineStyle.getText().setText(feature.get('nama'));
        return lineStyle;
      },
    });

    this.map.addLayer(this.lineLayer);
  }
  createGraph(matrix: any, node: any) {
    var MAXI: number = node.length;
    var MAXJ: number = node[0].length;
    for (let i: number = 0; i < 5; i++) {
      for (let j: number = 0; j < 5; j++) {
        console.log('test');
        if (matrix[i][j] == 1) {
          this.draw2MarkersAndLine(
            node[i].coor,
            node[i].name,
            node[j].coor,
            node[j].name
          );
        }
      }
    }
  }

  async onEnter(idStart: string, idDest: string) {
    var dest = parseInt(idDest);
    var strt = parseInt(idStart);

    await this.createGraph(this.MessageJSON.mat, this.MessageJSON.nodes);

    this.MessageJSON.from = strt;
    this.MessageJSON.to = dest;
    this.MessageJSON.algo = 'UCS';

    await this.http
      .post('http://localhost:8080/', this.MessageJSON)
      .toPromise();

    await this.http.get('http://localhost:8080/').subscribe((data) => {
      console.log(data);
    });
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
