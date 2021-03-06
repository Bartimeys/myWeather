import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationWeatherComponent } from './location-weather.component';

describe('LocationWeatherComponent', () => {
  let component: LocationWeatherComponent;
  let fixture: ComponentFixture<LocationWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
