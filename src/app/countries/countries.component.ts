import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../weather.service';
import {WeatherModel} from '../weather.model';
import {MatTableDataSource, MatPaginator} from '@angular/material';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

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
  displayedColumns = ['date', 'main'];

  constructor(private currentWeatherService: WeatherService) { }

  ngOnInit() {
      this.getCurrentWeather();
  }

  ngAfterViewInit() {
    console.log(this.getCurrentWeather());
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

