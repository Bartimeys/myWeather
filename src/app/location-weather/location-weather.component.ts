import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeatherService} from '../weather.service';
import {LocationModel} from '../location.model';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-location-weather',
  templateUrl: './location-weather.component.html',
  styleUrls: ['./location-weather.component.css'],
  providers: [WeatherService]
})
export class LocationWeatherComponent implements OnInit {
  @Input() cityId: number;
  @Output() dismissEvent = new EventEmitter();

  loading = true;
  error =  false;
  errorMessage = '';
  data = Array;
  locationModel: LocationModel;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getCurrentLocation();
  }
  getCurrentLocation() {
    this.loading = true;
    this.error = false;
    this.weatherService.getCurrentLocationWeather().then(location => {
      this.locationModel = location;
      this.loading = false;
      this.error = false;
    }, msg => {
      this.loading = false;
      this.error = true;
      this.errorMessage = msg;
    });
  }

}
