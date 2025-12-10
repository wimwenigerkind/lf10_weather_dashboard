import {useEffect, useState} from "react";
import {getWeatherForecast} from "../services/weatherService.ts";
import type {citySearchResult} from "../types/citySearchResult.ts";

export default function ForecastChart({city}: { city: citySearchResult }) {
  const [weatherForecastIsLoading, setWeatherForecastIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  console.log(weatherForecastIsLoading)
  console.log(errorMessage)

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      setWeatherForecastIsLoading(true);
      setErrorMessage('');
      try {
        const result = await getWeatherForecast(city.latitude, city.longitude)
        console.log(result);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setWeatherForecastIsLoading(false)
      }
    }

    fetchWeatherForecast()
  })

  return (
    <>
      <span>Chart</span>
    </>
  )
}