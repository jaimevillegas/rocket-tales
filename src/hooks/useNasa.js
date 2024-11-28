'use client'

import { useQuery } from '@tanstack/react-query'
import { getAPOD } from '@/utils/nasa'

export function useAPOD() {
  return useQuery({
    queryKey: ['apod'],
    queryFn: getAPOD,
  })
}
