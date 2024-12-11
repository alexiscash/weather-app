'use client';

import { useState } from 'react';
import axios from 'axios';

type WeatherData = {
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number };
} | null;

export default function Home() {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData>(null);

  async function getWeather() {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
          units: 'imperial',
        },
      });
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching the weather data', error);
    }
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="border rounded px-4 py-2"
      />
      <button onClick={getWeather} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
        Get Weather
      </button>

      {weather && (
        <div className="mt-4">
          <h2 className="text-2x1">{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp}°</p>
        </div>
      )}
    </div>
  );
}
