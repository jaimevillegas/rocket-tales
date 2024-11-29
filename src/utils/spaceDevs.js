const SPACE_DEVS_BASE_URL = 'https://ll.thespacedevs.com/2.3.0';

// Sleep function for rate limit handling
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch with retry logic and rate limit handling
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      
      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || 30;
        console.log(`Rate limited. Waiting ${retryAfter} seconds...`);
        await sleep(retryAfter * 1000);
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      const isLastAttempt = i === retries - 1;
      if (isLastAttempt) {
        throw error;
      }
      
      // Exponential backoff
      const waitTime = Math.min(1000 * Math.pow(2, i), 10000);
      console.log(`Attempt ${i + 1} failed. Retrying in ${waitTime}ms...`);
      await sleep(waitTime);
    }
  }
}

export async function getSpaceStations(limit = 10, offset = 0) {
  try {
    const data = await fetchWithRetry(
      `${SPACE_DEVS_BASE_URL}/space_stations/?limit=${limit}&offset=${offset}&format=json`,
      { next: { revalidate: 3600 } }  // Cache for 1 hour
    );
    return data;
  } catch (error) {
    if (error.message.includes('429')) {
      throw new Error('Rate limit exceeded. Please try again in a few minutes.');
    }
    throw new Error('Failed to fetch space stations: ' + error.message);
  }
}

export async function getSpaceStationById(id) {
  try {
    const data = await fetchWithRetry(
      `${SPACE_DEVS_BASE_URL}/space_stations/${id}/?format=json`,
      { next: { revalidate: 3600 } }  // Cache for 1 hour
    );
    return data;
  } catch (error) {
    if (error.message.includes('429')) {
      throw new Error('Rate limit exceeded. Please try again in a few minutes.');
    }
    throw new Error('Failed to fetch space station details: ' + error.message);
  }
}
