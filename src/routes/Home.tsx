import debouce from "lodash/debounce";
import React from "react";
import useSWR from "swr";

import * as WeatherInfo from "../components/WeatherInfo";
import { useGeolocation } from "../hooks/useGeolocation";
import { fetchCoordinatesByCityName, fetchWeatherData } from "../utils/api";

export function Home() {
  const [cityName, setCityName] = React.useState("");
  const { data: cities } = useSWR(
    cityName.length > 0 ? cityName : null,
    fetchCoordinatesByCityName
  );
  const city = cities?.[0];
  const { position } = useGeolocation();
  const { data } = useSWR(
    city
      ? {
          lat: city.lat,
          lon: city.lon,
        }
      : position && cityName.length === 0
      ? {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }
      : null,
    fetchWeatherData
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCityName(e.target.value);
  };
  const debouncedHandleChange = React.useCallback(
    debouce(handleChange, 500),
    []
  );

  return (
    <main className="flex flex-grow flex-col items-center justify-center p-5">
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        className="fixed inset-0 h-full w-full object-cover"
      >
        <source src="bermuda-triangle.mp4" type="video/mp4" />
      </video>
      <div className="z-10 flex h-96 w-full max-w-xl flex-col gap-5 rounded-xl">
        <form
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="City name"
            className="w-full rounded bg-white/70 px-10 py-5 shadow-xl backdrop-blur-sm"
            onChange={debouncedHandleChange}
          />
          <img
            src="/magnifying-glass.svg"
            alt="Magnifying glass"
            width="24"
            height="24"
            className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2"
          />
        </form>

        {data && (
          <div className="grid animate-fade-in grid-cols-2 rounded bg-white/70 px-10 pt-5 pb-10 shadow-xl backdrop-blur-sm duration-500">
            <div className="flex flex-col justify-between">
              {data.weather.map((weather) => (
                <div key={weather.id}>
                  <p>{city ? `${city.name}, ${city.country}` : data.name}</p>
                  <h1 className="text-5xl">{weather.main}</h1>
                  <div className="flex items-center">
                    <p className="text-xl font-light">{weather.description}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                      alt={weather.main}
                      height="50"
                      width="50"
                    />
                  </div>
                </div>
              ))}
              <h2 className="text-4xl">{data.main.temp}°C</h2>
            </div>
            <WeatherInfo.Root>
              <WeatherInfo.Item>
                <WeatherInfo.Label>Feels Like Temperature:</WeatherInfo.Label>
                <WeatherInfo.Value>{data.main.feels_like}°C</WeatherInfo.Value>
              </WeatherInfo.Item>
              <WeatherInfo.Item>
                <WeatherInfo.Label>Humidity:</WeatherInfo.Label>
                <WeatherInfo.Value>{data.main.humidity}%</WeatherInfo.Value>
              </WeatherInfo.Item>
              <WeatherInfo.Item>
                <WeatherInfo.Label>Sea Level:</WeatherInfo.Label>
                <WeatherInfo.Value>{data.main.pressure} hPa</WeatherInfo.Value>
              </WeatherInfo.Item>
              <WeatherInfo.Item>
                <WeatherInfo.Label>Wind Speed:</WeatherInfo.Label>
                <WeatherInfo.Value>{data.wind.speed} m/s</WeatherInfo.Value>
              </WeatherInfo.Item>
              <WeatherInfo.Item>
                <WeatherInfo.Label>Visibility:</WeatherInfo.Label>
                <WeatherInfo.Value>{data.visibility} m</WeatherInfo.Value>
              </WeatherInfo.Item>
            </WeatherInfo.Root>
          </div>
        )}
      </div>
    </main>
  );
}
