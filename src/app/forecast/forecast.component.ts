import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WeatherService} from '../weather.service';
import {ForecastModel} from '../forecast.model';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
  providers: [WeatherService]
})
export class ForecastComponent implements OnInit {
  @Input() cityId: number;
  @Output() dismissEvent = new EventEmitter();

  loading = true;
  error =  false;
  errorMessage = '';
  forecastModel: ForecastModel;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.getCurrentForecast();
  }

  onDismissModal() {
    this.dismissEvent.emit(null);
  }

  getCurrentForecast() {
    this.loading = true;
    this.error = false;
    this.weatherService.getCityForecast(this.cityId).then(forecast => {
      this.forecastModel = forecast;
      this.loading = false;
      this.error = false;
    }, msg => {
      this.loading = false;
      this.error = true;
      this.errorMessage = msg;
    });
  }

}
