'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useRockets } from '@/hooks/useRockets'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function RocketsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')
  const [searchQuery, setSearchQuery] = useState('')
  
  const {
    data,
    isLoading,
    error,
    isError,
  } = useRockets({
    page,
    search: searchQuery,
  })

  const handlePageChange = (newPage) => {
    router.push(`/rockets?page=${newPage}`)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    router.push('/rockets?page=1')
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-4xl font-bold text-white dark:text-blue-100 mb-4 md:mb-0 text-glow">
            Rockets
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rockets..."
              className="w-full md:w-auto px-4 py-2 bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            />
            <button
              type="submit"
              className="glass-button hover:bg-blue-500/20 hover:text-blue-300"
            >
              Search
            </button>
          </form>
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
              <h2 className="text-lg font-semibold text-red-300">Error Loading Rockets</h2>
            </div>
            <p className="text-red-200 mb-4">{error?.message}</p>
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

        {/* Rockets Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : !isError && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.results.map((rocket) => (
                <Link
                  key={rocket.id}
                  href={`/rockets/${rocket.id}`}
                  className="glass-card group hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="relative h-48 rounded-t-lg overflow-hidden">
                    <Image
                      src={rocket.image_url || '/images/rocket-placeholder.jpg'}
                      alt={rocket.full_name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h2 className="text-xl font-semibold text-white mb-2">
                          {rocket.full_name}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {rocket.active && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-400/20 text-green-300 border border-green-400/30">
                          Active
                        </span>
                      )}
                      {rocket.reusable && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-400/20 text-blue-300 border border-blue-400/30">
                          Reusable
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-200 dark:text-gray-300 space-y-1">
                      <p>Manufacturer: {rocket.manufacturer?.name || 'Unknown'}</p>
                      <p>Min Stage: {rocket.min_stage}</p>
                      <p>Max Stage: {rocket.max_stage}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {data && (
              <div className="flex justify-center space-x-2 mt-8">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={!data.previous}
                  className={`glass-button ${
                    !data.previous
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-white/10 hover:text-blue-300'
                  }`}
                >
                  Previous
                </button>
                <span className="glass-button">
                  Page {page}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={!data.next}
                  className={`glass-button ${
                    !data.next
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
