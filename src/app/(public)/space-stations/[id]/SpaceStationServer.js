import { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import SpaceStationContent from './SpaceStationContent'

export default async function SpaceStationServer({ id }) {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading space station details..." />}>
      <SpaceStationContent id={id} />
    </Suspense>
  )
}
