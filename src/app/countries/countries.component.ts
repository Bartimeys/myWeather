import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import {WeatherModel} from '../weather.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
  providers: [WeatherService]
})
export class CountriesComponent implements OnInit {

  selectedCity: WeatherModel;
  loading = true;
  error =  false;
  errorMessage = '';
  cities: WeatherModel[];

  constructor(private currentWeatherService: WeatherService) { }

  ngOnInit() {
    this.getCurrentWeather();
  }

  getCurrentWeather() {
    this.loading = true;
    this.error = false;
    this.currentWeatherService.getCurrentCitiesWeather().then(cities => {
      this.cities = cities;
      this.loading = false;
      this.error = false;
    }, msg => {
      this.loading = false;
      this.error = true;
      this.errorMessage = msg;
    });
  }

}
