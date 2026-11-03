import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CampWeatherSnapshot, OpenMeteoCurrentResponse, ReverseGeocodeResponse } from '../models/camp-weather.model';

@Injectable({ providedIn: 'root' })
export class CampWeatherService {
  private readonly http = inject(HttpClient);

  getCurrent(latitude: number, longitude: number): Observable<CampWeatherSnapshot> {
    const params = new URLSearchParams({
      latitude: latitude.toFixed(2),
      longitude: longitude.toFixed(2),
      current: 'temperature_2m,apparent_temperature,weather_code',
      timezone: 'auto'
    });

    return this.http.get<OpenMeteoCurrentResponse>(`https://api.open-meteo.com/v1/forecast?${params}`)
      .pipe(map(({ current, timezone }) => ({
        temperature: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        weatherCode: current.weather_code,
        timezone
      })));
  }

  getLocationName(latitude: number, longitude: number, language: string): Observable<string> {
    const params = new URLSearchParams({
      latitude: latitude.toFixed(2),
      longitude: longitude.toFixed(2),
      localityLanguage: language
    });

    return this.http.get<ReverseGeocodeResponse>(`https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`)
      .pipe(map(location => {
        const city = location.city?.trim() || location.locality?.trim() || '';
        const subdivision = location.principalSubdivision?.trim() || '';
        const subdivisionCode = location.principalSubdivisionCode?.split('-').at(-1)?.trim();
        const region = subdivisionCode || subdivision;
        if (city && region && city.toLocaleLowerCase() !== region.toLocaleLowerCase()) return `${city} · ${region}`;
        return city || region;
      }));
  }
}
