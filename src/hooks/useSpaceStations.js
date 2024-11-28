'use client'

import { useQuery } from '@tanstack/react-query'
import { getSpaceStations, getSpaceStationById } from '@/utils/spaceDevs'

export function useSpaceStations(limit = 10, offset = 0) {
  return useQuery({
    queryKey: ['spaceStations', limit, offset],
    queryFn: () => getSpaceStations(limit, offset),
  })
}

export function useSpaceStation(id) {
  return useQuery({
    queryKey: ['spaceStation', id],
    queryFn: () => getSpaceStationById(id),
    enabled: !!id,
  })
}
