import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-component',
  template: `
    <!-- <form (click)="submitNumber()">
      <label for="numberInput">Enter a number:</label>
      <p>{{ numberInput }}</p>
      <input #box (keyup)="onEnter(box.value)" />
      <button type="submit">Submit</button>
    </form> -->
    <input type="file" (change)="onFileSelected($event)" />
    <input #box1 type="text" />
    <input #box2 type="text" />
    <button (click)="onEnter(box1.value, box2.value)">Click</button>
    <p>hasil : {{ numberInput }}</p>
  `,
})
export class TestComponentComponent {
  numberInput: number;
  MessageJSON: any = null;

  constructor(private http: HttpClient) {
    this.numberInput = 0;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const fileContent = reader.result;
      this.MessageJSON = JSON.parse(fileContent as string);
      console.log(this.MessageJSON);
    };
  }

  async onEnter(idStart: string, idDest: string) {
    var dest = parseInt(idDest);
    var strt = parseInt(idStart);

    this.MessageJSON.from = strt;
    this.MessageJSON.to = dest;
    this.MessageJSON.algo = 'UCS';

    await this.http
      .post('http://localhost:8080/', this.MessageJSON)
      .toPromise();
  }
}
