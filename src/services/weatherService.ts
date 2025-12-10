export async function getWeatherForecast(latitude: number, longitude: number, timezone: string = "Europe/Berlin") {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max&timezone=${timezone}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();
  return data.daily || {};
}