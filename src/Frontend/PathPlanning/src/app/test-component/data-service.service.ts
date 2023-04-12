import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private URL = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  POST(data: any) {
    return this.http.post(this.URL, data);
  }

  GET(data: any) {
    return this.http.get(this.URL);
  }
}
