const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY
const BASE_URL = 'https://api.nasa.gov/mars-photos/api/v1'

export async function getRoversList() {
  try {
    const response = await fetch(
      `${BASE_URL}/rovers/curiosity?api_key=${NASA_API_KEY}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch Curiosity rover data')
    }
    const data = await response.json()
    return [data.rover]
  } catch (error) {
    throw new Error('Error fetching rover: ' + error.message)
  }
}

export async function getRoverPhotos({ page = 1, camera = null, earthDate = null, sol = null } = {}) {
  try {
    let url
    
    // If no date is specified, get the latest photos
    if (!earthDate && !sol) {
      url = `${BASE_URL}/rovers/curiosity/latest_photos?api_key=${NASA_API_KEY}`
    } else {
      url = `${BASE_URL}/rovers/curiosity/photos?api_key=${NASA_API_KEY}&page=${page}`
      if (earthDate) {
        url += `&earth_date=${earthDate}`
      }
      if (sol) {
        url += `&sol=${sol}`
      }
    }
    
    if (camera) {
      url += `&camera=${camera}`
    }

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch rover photos')
    }
    const data = await response.json()
    return data.latest_photos || data.photos || []
  } catch (error) {
    throw new Error('Error fetching rover photos: ' + error.message)
  }
}

// Get available cameras for Curiosity
export function getRoverCameras() {
  return [
    { id: 'FHAZ', name: 'Front Hazard Avoidance Camera' },
    { id: 'RHAZ', name: 'Rear Hazard Avoidance Camera' },
    { id: 'MAST', name: 'Mast Camera' },
    { id: 'CHEMCAM', name: 'Chemistry and Camera Complex' },
    { id: 'MAHLI', name: 'Mars Hand Lens Imager' },
    { id: 'MARDI', name: 'Mars Descent Imager' },
    { id: 'NAVCAM', name: 'Navigation Camera' },
  ]
}
