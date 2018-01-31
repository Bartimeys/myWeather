export class LocationModel {
  public locationName: string;
  public weatherDescription: string;
  public humidity: number;
  public pressure: number;
  public temperature: number;

  constructor(originalResponse: any) {
    this.weatherDescription = originalResponse.weather[0].description;
    this.locationName = originalResponse.name;
    this.humidity = originalResponse.main.humidity;
    this.pressure = originalResponse.main.pressure;
    this.temperature = originalResponse.main.temp;
  }
}
