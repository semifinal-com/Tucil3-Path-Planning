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
