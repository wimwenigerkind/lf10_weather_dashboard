export async function searchImage(query: string) {
  const url = `http://localhost:8888/api/image/search?query=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch image');
  }

  const data = await response.json();
  return data.url || [];
}
