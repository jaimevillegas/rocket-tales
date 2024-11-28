const BASE_URL = 'https://ll.thespacedevs.com/2.3.0'

export async function getAstronauts(limit = 10, offset = 0) {
  try {
    const response = await fetch(
      `${BASE_URL}/astronauts/?limit=${limit}&offset=${offset}&format=json`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch astronauts')
    }
    return response.json()
  } catch (error) {
    throw new Error('Error fetching astronauts: ' + error.message)
  }
}

export async function getAstronautById(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/astronauts/${id}/?format=json`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch astronaut')
    }
    return response.json()
  } catch (error) {
    throw new Error('Error fetching astronaut: ' + error.message)
  }
}
