import { useQuery } from '@tanstack/react-query'
import { getAstronauts, getAstronautById } from '@/utils/astronauts'

export function useAstronauts(limit, offset) {
  return useQuery({
    queryKey: ['astronauts', limit, offset],
    queryFn: () => getAstronauts(limit, offset),
  })
}

export function useAstronaut(id) {
  return useQuery({
    queryKey: ['astronaut', id],
    queryFn: () => getAstronautById(id),
    enabled: !!id,
  })
}
