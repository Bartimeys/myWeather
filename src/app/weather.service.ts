import {Injectable} from '@angular/core';
import {CITIES} from './mock-cities';
import {WeatherModel} from './weather.model';
import {HttpModule, Http, Response} from '@angular/http';
import {LocationModel} from './location.model';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable()
export class WeatherService {

  apiRoot = 'http://api.openweathermap.org/data/2.5/';
  appId = '23b63825187c61b018c0b9b735a2d308';

  constructor(private http: Http) {
  }

  getCurrentCitiesWeather(): Promise<WeatherModel[]> {
    // return Promise.resolve(CITIES);
    return new Promise((resolve, reject) => {
      const citiesIds = (CITIES.map(city => city.city_id)).join(',');
      this.http.get(
        this.apiRoot + 'forecast?q=London&appid=' + this.appId)
        .toPromise().then(
        res => {
          const citiesResultList = res.json().list;
          const citiesPromiseResult: WeatherModel[] = [];
          for (let i = 0; i < citiesResultList.length; i++) {
            citiesPromiseResult.push(
              new WeatherModel(
                citiesResultList[i].clouds.all,
                citiesResultList[i].dt_txt,
                citiesResultList[i].main.humidity,
                citiesResultList[i].main.temp_max,
                citiesResultList[i].main.temp_min,
                citiesResultList[i].weather[0].description,
                citiesResultList[i].weather[0].icon,
                citiesResultList[i].weather[0].main,
                citiesResultList[i].wind.deg,
                citiesResultList[i].wind.speed));
          }
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

