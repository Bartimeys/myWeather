export class WeatherModel {
  constructor(public clouds: number,
              public name: string,
              public humidity: number,
              public temp_max: number,
              public temp_min: number,
              public description: string,
              public icon: string,
              public main: string,
              public wind_deg: number,
              public wind_speed: number) {
  }
}
