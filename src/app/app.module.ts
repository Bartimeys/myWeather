import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';
import { ForecastComponent } from './forecast/forecast.component';


@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
