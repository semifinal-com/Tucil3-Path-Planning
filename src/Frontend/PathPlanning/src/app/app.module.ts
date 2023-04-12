import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, MainComponent, TestComponentComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
//
