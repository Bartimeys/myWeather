import {Injectable} from '@angular/core';
import {CITIES} from './mock-cities';
import {WeatherModel} from './weather.model';
import {HttpModule, Http, Response} from '@angular/http';
import {ForecastModel} from './forecast.model';

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
        this.apiRoot + '/group?id=' + citiesIds + '&units=metric&appid=' + this.appId)
        .toPromise().then(
        res => {
          const citiesResultList = res.json().list;
          const citiesPromiseResult: WeatherModel[] = [];
          for (let i = 0; i < citiesResultList.length; i++) {
            citiesPromiseResult.push(
              new WeatherModel(
                citiesResultList[i].id,
                citiesResultList[i].name,
                citiesResultList[i].main.temp,
                citiesResultList[i].wind.speed));
          }
          resolve(citiesPromiseResult);
        },
        msg => {
          reject('Error fetching data.');
        }
      );
    });
  }

  getCityForecast(cityId: number): Promise<ForecastModel> {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiRoot + '/forecast?id=' + cityId + '&units=metric&appid=' + this.appId)
        .toPromise().then(
        res => {
          const cityResult = res.json();
          const cityForecast = cityResult.list.slice(0, 4).map(obj => {
            const dateVar = (new Date(obj.dt_txt));
            dateVar.setHours(dateVar.getHours() - 5)
            return {
              date: dateVar,
              temp: obj.main.temp,
              wind: obj.wind.speed
            };
          });
          resolve(new ForecastModel(cityResult.city.name, cityResult.city.country, cityForecast));
        },
        msg => {
          reject('Error fetching forecast.');
        }
      );
    });
  }
}

