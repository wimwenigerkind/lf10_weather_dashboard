export const WeatherPeriod = {
  DAILY: "daily",
  HOURLY: "hourly"
} as const;

export type WeatherPeriod = typeof WeatherPeriod[keyof typeof WeatherPeriod];

export async function getWeatherForecast(latitude: number, longitude: number, timezone: string = "Europe/Berlin", period: WeatherPeriod = WeatherPeriod.DAILY) {
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}`;

  if (period === WeatherPeriod.HOURLY) {
    url += "&hourly=temperature_2m,precipitation,wind_speed_10m";
  } else if (period === WeatherPeriod.DAILY) {
    url += "&daily=temperature_2m_min,temperature_2m_max";
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();
  return period === WeatherPeriod.HOURLY ? (data.hourly || {}) : (data.daily || {});
}