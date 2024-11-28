const BASE_URL = 'https://ll.thespacedevs.com/2.2.0'

// Sleep function for rate limit handling
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Fetch with retry logic and rate limit handling
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options)
      
      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || 30
        console.log(`Rate limited. Waiting ${retryAfter} seconds...`)
        await sleep(retryAfter * 1000)
        continue
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      const isLastAttempt = i === retries - 1
      if (isLastAttempt) {
        throw error
      }
      
      // Exponential backoff
      const waitTime = Math.min(1000 * Math.pow(2, i), 10000)
      console.log(`Attempt ${i + 1} failed. Retrying in ${waitTime}ms...`)
      await sleep(waitTime)
    }
  }
}

export async function getMissionsList({ page = 1, search = '' } = {}) {
  try {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : ''
    const data = await fetchWithRetry(
      `${BASE_URL}/launch/?limit=10&offset=${(page - 1) * 10}${searchParam}&mode=detailed`,
      { next: { revalidate: 3600 } }
    )
    return data
  } catch (error) {
    if (error.message.includes('429')) {
      throw new Error('Rate limit exceeded. Please try again in a few minutes.')
    }
    throw new Error('Error fetching missions: ' + error.message)
  }
}

export async function getMissionById(id) {
  try {
    const data = await fetchWithRetry(
      `${BASE_URL}/launch/${id}/?mode=detailed`,
      { next: { revalidate: 3600 } }
    )
    return data
  } catch (error) {
    if (error.message.includes('429')) {
      throw new Error('Rate limit exceeded. Please try again in a few minutes.')
    }
    throw new Error('Error fetching mission: ' + error.message)
  }
}

export async function getUpcomingMissions({ page = 1 } = {}) {
  try {
    const data = await fetchWithRetry(
      `${BASE_URL}/launch/upcoming/?limit=10&offset=${(page - 1) * 10}&mode=detailed`,
      { next: { revalidate: 3600 } }
    )
    return data
  } catch (error) {
    if (error.message.includes('429')) {
      throw new Error('Rate limit exceeded. Please try again in a few minutes.')
    }
    throw new Error('Error fetching upcoming missions: ' + error.message)
  }
}

export async function getPreviousMissions({ page = 1 } = {}) {
  try {
    const data = await fetchWithRetry(
      `${BASE_URL}/launch/previous/?limit=10&offset=${(page - 1) * 10}&mode=detailed`,
      { next: { revalidate: 3600 } }
    )
    return data
  } catch (error) {
    if (error.message.includes('429')) {
      throw new Error('Rate limit exceeded. Please try again in a few minutes.')
    }
    throw new Error('Error fetching previous missions: ' + error.message)
  }
}
