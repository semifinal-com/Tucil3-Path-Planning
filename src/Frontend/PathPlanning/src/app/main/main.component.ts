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
  RouteView: string = 'NaN';
  RouteDistance: string = 'NaN';
  Algorithm: string = 'UCS';
  Solution: any = null;

  map: Map = new Map({});
  markerLayer = new VectorLayer({});
  lineLayer = new VectorLayer({});

  constructor(private http: HttpClient) {}

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
        center: fromLonLat([107.6107, -6.8907]),
        zoom: 15,
      }),
    });
  }

  draw2MarkersAndLine(
    coor1: any,
    name1: string,
    coor2: any,
    name2: string,
    isSolution: boolean
  ) {
    var marker1: Feature = new Feature({});
    var marker2: Feature = new Feature({});
    const markerSource = this.markerLayer.getSource();

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

    markerSource?.addFeature(marker1);
    markerSource?.addFeature(marker2);

    // add line between markers
    const lineSource = this.lineLayer.getSource();
    var color = 'blue';
    if (isSolution == true) {
      color = 'green';
    }

    if (lineSource && marker1.getGeometry() && marker2.getGeometry()) {
      const line = new Feature({
        geometry: new LineString([
          (<Point>marker1.getGeometry()).getCoordinates(),
          (<Point>marker2.getGeometry()).getCoordinates(),
        ]),
        nama: calculateDistance(coor1[1], coor1[0], coor2[1], coor2[0]),
        warna: color,
      });

      lineSource.addFeature(line);
    }
  }

  onAlgoChanged(event: Event) {
    this.Algorithm = (event.target as HTMLInputElement).value;
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
        lineStyle.getStroke().setColor(feature.get('warna'));
        return lineStyle;
      },
    });

    this.map.addLayer(this.lineLayer);
  }

  createGraph(matrix: any, node: any, size: number) {
    for (let i: number = 0; i < size; i++) {
      for (let j: number = 0; j < size; j++) {
        if (matrix[i][j] == 1) {
          this.draw2MarkersAndLine(
            node[i].coor,
            node[i].name,
            node[j].coor,
            node[j].name,
            false
          );
        }
      }
    }
  }

  createSolution() {
    for (let i = 1; i < this.Solution.result.length; i++) {
      console.log(this.Solution.result);

      var a = [this.Solution.result[i].Coor.Y, this.Solution.result[i].Coor.X];
      var b = [
        this.Solution.result[i - 1].Coor.Y,
        this.Solution.result[i - 1].Coor.X,
      ];

      this.draw2MarkersAndLine(
        a,
        this.Solution.result[i].Name,
        b,
        this.Solution.result[i - 1].Name,
        true
      );
    }
  }

  async showRoute() {
    console.log(this.Solution);
    await this.createSolution();
  }

  async onEnter(idStart: string, idDest: string) {
    var dest = parseInt(idDest);
    var strt = parseInt(idStart);

    try {
      if (this.MessageJSON.nodes.length < 8) {
        throw new Error('Jumlah Node kurang dari 8');
      }
      if (
        strt >= this.MessageJSON.nodes.length ||
        dest >= this.MessageJSON.nodes.length
      ) {
        throw new Error(
          'Input Titik Asal atau Tujuan Tidak Ditemukan, Cek Input File atau Titik kembali'
        );
      }
      if (strt < 0 || dest < 0) {
        throw new Error('Tidak Ada Id Negatif');
      }
      if (this.Algorithm == '') {
        throw new Error('Algoritma belum dipilih');
      }
    } catch (error: any) {
      alert(error.message);
      setTimeout(() => {
        location.reload();
      }, 1000); // menunggu 5 detik sebelum merefresh halaman
      return;
    }
    // const size: number = this.MessageJSON.node.length;
    await this.createGraph(
      this.MessageJSON.mat,
      this.MessageJSON.nodes,
      this.MessageJSON.nodes.length
    );

    this.MessageJSON.from = strt;
    this.MessageJSON.to = dest;
    this.MessageJSON.algo = this.Algorithm;

    await this.http
      .post('http://localhost:8080/', this.MessageJSON)
      .toPromise();

    await this.http
      .get('http://localhost:8080/', { responseType: 'json' })
      .subscribe((data: any) => {
        console.log(data);
        this.RouteDistance = '';
        this.RouteView = '';
        this.Solution = data.result;
        this.RouteDistance = data.distance;
        this.RouteView = data.routestr;
        this.Solution = data;
      });
  }
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371e3; // radius of the earth in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;
  return d.toFixed(2) + ' meters';
}
