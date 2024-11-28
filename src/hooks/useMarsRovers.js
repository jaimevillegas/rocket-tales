import { useQuery } from '@tanstack/react-query'
import { getRoversList, getRoverPhotos } from '@/utils/marsRovers'

export function useMarsRovers() {
  return useQuery({
    queryKey: ['marsRovers'],
    queryFn: getRoversList,
  })
}

export function useRoverPhotos({ camera, earthDate, sol } = {}) {
  return useQuery({
    queryKey: ['marsRoverPhotos', { camera, earthDate, sol }],
    queryFn: () => getRoverPhotos({ camera, earthDate, sol }),
  })
}
