import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';
import { LocationWeatherComponent } from './location-weather/location-weather.component';


@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    LocationWeatherComponent
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
