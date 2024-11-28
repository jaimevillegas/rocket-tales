const SPACE_DEVS_BASE_URL = 'https://ll.thespacedevs.com/2.3.0';

export async function getSpaceStations(limit = 10, offset = 0) {
  try {
    const response = await fetch(
      `${SPACE_DEVS_BASE_URL}/space_stations/?limit=${limit}&offset=${offset}&format=json`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.detail || `API responded with status: ${response.status}`
      );
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching space stations:', error);
    throw new Error('Failed to fetch space stations: ' + error.message);
  }
}

export async function getSpaceStationById(id) {
  try {
    const response = await fetch(
      `${SPACE_DEVS_BASE_URL}/space_stations/${id}/?format=json`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.detail || `API responded with status: ${response.status}`
      );
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching space station details:', error);
    throw new Error('Failed to fetch space station details: ' + error.message);
  }
}
