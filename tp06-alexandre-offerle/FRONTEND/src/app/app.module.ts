import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiHttpInterceptor} from "./http-interceptor";
import {ApiService} from "./api.service";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
    ApiService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
