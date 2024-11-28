import { useQuery } from '@tanstack/react-query'
import {
  getMissionsList,
  getMissionById,
  getUpcomingMissions,
  getPreviousMissions,
} from '@/utils/missions'

export function useMissionsList({ page = 1, search = '' } = {}) {
  return useQuery({
    queryKey: ['missions', { page, search }],
    queryFn: () => getMissionsList({ page, search }),
    keepPreviousData: true,
  })
}

export function useMission(id) {
  return useQuery({
    queryKey: ['mission', id],
    queryFn: () => getMissionById(id),
    enabled: !!id,
  })
}

export function useUpcomingMissions({ page = 1 } = {}) {
  return useQuery({
    queryKey: ['upcomingMissions', { page }],
    queryFn: () => getUpcomingMissions({ page }),
    keepPreviousData: true,
  })
}

export function usePreviousMissions({ page = 1 } = {}) {
  return useQuery({
    queryKey: ['previousMissions', { page }],
    queryFn: () => getPreviousMissions({ page }),
    keepPreviousData: true,
  })
}
