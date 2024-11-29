'use client'

import { useQuery } from '@tanstack/react-query'
import { getSpaceStations, getSpaceStationById } from '@/utils/spaceDevs'

export function useSpaceStations(limit = 10, offset = 0) {
  return useQuery({
    queryKey: ['spaceStations', limit, offset],
    queryFn: () => getSpaceStations(limit, offset),
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Cache persists for 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 30000),
  })
}

export function useSpaceStation(id) {
  return useQuery({
    queryKey: ['spaceStation', id],
    queryFn: () => getSpaceStationById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Cache persists for 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 30000),
  })
}
