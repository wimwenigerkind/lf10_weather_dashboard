import {useEffect, useState} from "react";
import {getWeatherForecast, WeatherPeriod} from "../services/weatherService.ts";
import type {citySearchResult} from "../types/citySearchResult.ts";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {useToast} from "../hooks/useToast.ts";

export default function ForecastChart({city}: { city: citySearchResult }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [chartData, setChartData] = useState<Array<{ name: string, minTemp: number, maxTemp: number }>>([]);
  const {toast} = useToast();

  const hasError = errorMessage.length > 0;

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      setErrorMessage('');
      setChartData([]);
      try {
        const result = await getWeatherForecast(city.latitude, city.longitude, city.timezone, WeatherPeriod.DAILY)
        const weatherForecast = result.time.map((date: string, index: number) => ({
          date: new Date(date).toLocaleDateString('de-DE', {month: 'short', day: 'numeric'}),
          minTemp: result.temperature_2m_min[index],
          maxTemp: result.temperature_2m_max[index]
        }));
        setChartData(weatherForecast);
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An error occurred';
        setErrorMessage(errMsg);
        toast(errMsg, "danger")
      }
    }
    fetchWeatherForecast()
  }, [city.id, city.latitude, city.longitude, city.timezone, toast])

  return (
    <>
      <h4 className="mt-4">Forecast</h4>
      {hasError ? (
        <span className="text-danger">{errorMessage}</span>
      ) : (
        <div>
          <hr/>
          <LineChart style={{width: '100%', aspectRatio: 1.618}} responsive
                     data={chartData}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <XAxis dataKey="date"/>
            <YAxis width="auto"/>
            <Tooltip
              contentStyle={{backgroundColor: 'white', border: '1px solid #ccc'}}
              formatter={(value: number) => `${value}°C`}
            />
            <Legend/>
            <Line type="monotone" dataKey="minTemp" stroke="#8884d8"/>
            <Line type="monotone" dataKey="maxTemp" stroke="#82ca9d"/>
          </LineChart>
        </div>
      )}
    </>
  )
}