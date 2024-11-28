import { useQuery } from '@tanstack/react-query'
import { getRocketsList, getRocketById } from '@/utils/rockets'

export function useRockets({ page = 1, search = '' } = {}) {
  return useQuery({
    queryKey: ['rockets', page, search],
    queryFn: () => getRocketsList({ page, search }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useRocket(id) {
  return useQuery({
    queryKey: ['rocket', id],
    queryFn: () => getRocketById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
