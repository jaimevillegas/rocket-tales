'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useUpcomingMissions, usePreviousMissions } from '@/hooks/useMissions'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function MissionsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('upcoming')
  const page = parseInt(searchParams.get('page') || '1')
  
  const {
    data: upcomingData,
    isLoading: isLoadingUpcoming,
    error: upcomingError,
    isError: isUpcomingError,
  } = useUpcomingMissions({
    page: activeTab === 'upcoming' ? page : 1,
  })
  
  const {
    data: previousData,
    isLoading: isLoadingPrevious,
    error: previousError,
    isError: isPreviousError,
  } = usePreviousMissions({
    page: activeTab === 'previous' ? page : 1,
  })

  const isLoading = isLoadingUpcoming || isLoadingPrevious
  const currentData = activeTab === 'upcoming' ? upcomingData : previousData
  const currentError = activeTab === 'upcoming' ? upcomingError : previousError
  const isError = activeTab === 'upcoming' ? isUpcomingError : isPreviousError
  
  const handlePageChange = (newPage) => {
    router.push(`/missions?page=${newPage}`)
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white dark:text-blue-100 mb-8 text-glow">
          Space Missions
        </h1>
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`glass-button font-medium transition-all duration-300 ${
              activeTab === 'upcoming'
                ? 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                : 'hover:bg-white/10 hover:text-blue-300'
            }`}
          >
            Upcoming Launches
          </button>
          <button
            onClick={() => setActiveTab('previous')}
            className={`glass-button font-medium transition-all duration-300 ${
              activeTab === 'previous'
                ? 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                : 'hover:bg-white/10 hover:text-blue-300'
            }`}
          >
            Previous Launches
          </button>
        </div>

        {/* Error State */}
        {isError && (
          <div className="glass-card border-red-500/30 p-6 mb-8">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-red-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-lg font-semibold text-red-300">Error Loading Missions</h2>
            </div>
            <p className="text-red-200 mb-4">{currentError?.message}</p>
            <button
              onClick={() => router.refresh()}
              className="glass-button text-red-300 border-red-400/30 hover:bg-red-500/20"
            >
              <svg
                className="w-4 h-4 mr-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Missions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentData?.results.map((mission) => (
                <Link
                  key={mission.id}
                  href={`/missions/${mission.id}`}
                  className="glass-card group hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="relative h-48 rounded-t-lg overflow-hidden">
                    <Image
                      src={mission.image || '/images/mission-placeholder.jpg'}
                      alt={mission.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {mission.name}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {new Date(mission.net).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-200 dark:text-gray-300 text-sm line-clamp-2">
                      {mission.mission?.description || 'No description available'}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mission.status.id === 1
                          ? 'bg-green-400/20 text-green-300 border border-green-400/30'
                          : mission.status.id === 3
                          ? 'bg-red-400/20 text-red-300 border border-red-400/30'
                          : 'bg-blue-400/20 text-blue-300 border border-blue-400/30'
                      }`}>
                        {mission.status.name}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {currentData && (
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className={`glass-button ${
                    page === 1
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-white/10 hover:text-blue-300'
                  }`}
                >
                  Previous
                </button>
                <span className="glass-button">
                  Page {page} of {Math.ceil(currentData.count / 10)}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= Math.ceil(currentData.count / 10)}
                  className={`glass-button ${
                    page >= Math.ceil(currentData.count / 10)
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-white/10 hover:text-blue-300'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}