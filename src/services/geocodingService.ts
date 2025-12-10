export async function searchCities(name: string, count = 5, language = "de", format = "json") {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=${count}&language=${language}&format=${format}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch city data');
  }

  const data = await response.json();
  return data.results || [];
}
