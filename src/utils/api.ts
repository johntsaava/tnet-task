export type WeatherData = {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type Coord = {
  lon: number;
  lat: number;
};

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

export type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

export type Clouds = {
  all: number;
};

export type Sys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

export type FetchWeatherDataParams = {
  lat: number;
  lon: number;
};

export async function fetchWeatherData({
  lat,
  lon,
}: FetchWeatherDataParams): Promise<WeatherData> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
    import.meta.env.VITE_WEATHER_API_KEY
  }`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(`Failed to fetch data. Status code: ${response.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    } else {
      throw new Error(`Failed to fetch data: ${error}`);
    }
  }
}

export type LocationsData = Location[];

export type Location = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

export async function fetchCoordinatesByCityName(
  cityName: string
): Promise<LocationsData> {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${
    import.meta.env.VITE_WEATHER_API_KEY
  }`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(`Failed to fetch data. Status code: ${response.status}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    } else {
      throw new Error(`Failed to fetch data: ${error}`);
    }
  }
}
