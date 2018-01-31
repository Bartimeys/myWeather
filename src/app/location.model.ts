export class LocationModel {
  public locationName: string;
  public weatherDescription: string;
  public weatherIcon: string;
  public weatherClouds: string;
  public date: string;
  public humidity: number;
  public clouds: number;
  public pressure: number;
  public temperature_min: number;
  public temperature_max: number;
  public wind: number;
  public wind_deg: number;

  constructor(originalResponse: any) {
    this.weatherDescription = originalResponse.weather[0].description;
    this.weatherIcon = originalResponse.weather[0].icon;
    this.weatherClouds = originalResponse.weather[0].main;
    this.locationName = originalResponse.name;
    this.humidity = originalResponse.main.humidity;
    this.clouds = originalResponse.clouds.all;
    this.date = originalResponse.dt;
    this.pressure = originalResponse.main.pressure;
    this.temperature_min = originalResponse.main.temp_min;
    this.temperature_max = originalResponse.main.temp_max;
    this.wind = originalResponse.wind.speed;
    this.wind_deg = originalResponse.wind.deg;
  }
}
