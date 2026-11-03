export interface CampWeatherSnapshot {
  temperature: number;
  feelsLike: number;
  weatherCode: number;
  timezone: string;
}

export interface OpenMeteoCurrentResponse {
  timezone: string;
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
  };
}

export interface ReverseGeocodeResponse {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
  principalSubdivisionCode?: string;
}

export type CampWeatherSource = 'barra-bonita' | 'local';
export type CampDayPhase = 'dawn' | 'day' | 'sunset' | 'night';
