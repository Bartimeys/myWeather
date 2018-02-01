import {Injectable} from '@angular/core';
import {CITIES} from './mock-cities';
import {WeatherModel} from './weather.model';
import {HttpModule, Http, Response} from '@angular/http';
import {LocationModel} from './location.model';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class WeatherService {

  apiRoot = 'http://api.openweathermap.org/data/2.5/';
  appId = '23b63825187c61b018c0b9b735a2d308';

  constructor(private http: Http) {
    Observable.interval(2000 * 60).subscribe(x => {
      this.getCurrentCitiesWeather();
      this.getCurrentLocationWeather();
    });
  }

  getCurrentCitiesWeather(): Promise<WeatherModel[]> {
    // return Promise.resolve(CITIES);
    const cities = (CITIES.map(city => city.name)).join(',');
    return new Promise((resolve, reject) => {
      this.http.get(
        this.apiRoot + 'weather?q='+ cities +'&appid=' + this.appId)
        .toPromise().then(
        res => {
          console.log(CITIES);
          const citiesResultList = res.json();
          const citiesPromiseResult: WeatherModel[] = [];
            citiesPromiseResult.push(
              new WeatherModel(
                citiesResultList.clouds.all,
                citiesResultList.name,
                citiesResultList.main.humidity,
                citiesResultList.main.temp_max,
                citiesResultList.main.temp_min,
                citiesResultList.weather[0].description,
                citiesResultList.weather[0].icon,
                citiesResultList.weather[0].main,
                citiesResultList.wind.deg,
                citiesResultList.wind.speed));
          console.log(citiesPromiseResult);
          // console.log(citiesResultList);
          resolve(citiesPromiseResult);
        },
        msg => {
          reject('Error fetching data.');
        }
      );
    });
  }

  getCurrentLocationWeather(): Promise<LocationModel> {

    return new Promise((resolve, reject) => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            this.http.get(
              this.apiRoot + '/weather?' + 'lat=' + lat + '&lon=' + lon + '&appid=' + this.appId)
              .toPromise().then(
              res => {
                const originalReponse = res.json();
                resolve(new LocationModel(originalReponse));
              },
              msg => {
                reject('Error fetching data.');
              }
            );
          },
          error => {
            switch (error.code) {
              case 1:
                console.log('Permission Denied');
                break;
              case 2:
                console.log('Position Unavailable');
                break;
              case 3:
                console.log('Timeout');
                break;
            }
          }
        );
      }
    });
  }

  

}

