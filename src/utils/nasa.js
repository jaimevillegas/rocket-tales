const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;
const APOD_URL = 'https://api.nasa.gov/planetary/apod';

export async function getAPOD() {
  if (!NASA_API_KEY) {
    throw new Error('NASA API key is not configured');
  }

  try {
    const response = await fetch(`${APOD_URL}?api_key=${NASA_API_KEY}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.msg || `NASA API responded with status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching APOD:', error);
    throw new Error('Failed to fetch APOD: ' + error.message);
  }
}
