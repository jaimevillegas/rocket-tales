'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAstronauts } from '@/hooks/useAstronauts'
import LoadingSpinner from '@/components/LoadingSpinner'

const ITEMS_PER_PAGE = 9

export default function AstronautsPage() {
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('all')
  
  const { data, isLoading, isError, error } = useAstronauts(
    ITEMS_PER_PAGE,
    (page - 1) * ITEMS_PER_PAGE
  )

  if (isLoading) {
    return <LoadingSpinner message="Loading astronauts..." />
  }

  if (isError) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4">
          <div className="glass-card text-center p-8">
            <h1 className="text-4xl font-bold text-white mb-4 text-glow">Error Loading Astronauts</h1>
            <p className="text-gray-300 mb-8">
              {error?.message || 'Unable to load astronauts. Please try again later.'}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="glass-button hover:bg-blue-500/20 hover:text-blue-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Get unique statuses for filter
  const statuses = ['all', ...new Set(data.results.map(astronaut => astronaut.status.name))]
  
  // Filter astronauts based on status
  const filteredAstronauts = data.results.filter(astronaut => 
    statusFilter === 'all' || astronaut.status.name === statusFilter
  )

  const totalPages = Math.ceil(data.count / ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-glow">
            Astronauts
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore the incredible journeys of astronauts who have ventured into space, from pioneers to modern-day explorers.
          </p>
        </div>

        {/* Filter Section */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">Filter by status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="glass-input px-4 py-2 rounded-lg text-gray-300 bg-transparent border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option 
                    key={status} 
                    value={status}
                    className="bg-gray-900 text-gray-300"
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-gray-300">
              Showing {filteredAstronauts.length} astronauts
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAstronauts.map((astronaut) => (
            <Link
              key={astronaut.id}
              href={`/astronauts/${astronaut.id}`}
              className="glass-card group hover:scale-[1.02] transition-transform duration-200 flex flex-col"
            >
              <div className="relative h-72">
                <Image
                  src={astronaut.image?.image_url || '/images/astronaut-placeholder.svg'}
                  alt={astronaut.name}
                  fill
                  className="object-cover object-top rounded-t-lg"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {astronaut.name}
                </h2>
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    astronaut.status.name === 'active' 
                      ? 'bg-green-500/20 text-green-300' 
                      : astronaut.status.name === 'retired'
                      ? 'bg-gray-500/20 text-gray-300'
                      : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {astronaut.status.name.charAt(0).toUpperCase() + astronaut.status.name.slice(1)}
                  </span>
                  {astronaut.nationality && (
                    <span className="text-gray-400 text-sm">
                      {typeof astronaut.nationality === 'object' 
                        ? astronaut.nationality.nationality_name || astronaut.nationality.name
                        : astronaut.nationality}
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm line-clamp-3 flex-grow">
                  {astronaut.bio || 'No biography available.'}
                </p>
                <div className="mt-4 text-blue-300 group-hover:text-blue-200 transition-colors flex items-center">
                  <span>View Profile</span>
                  <svg 
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`glass-button px-4 py-2 ${
                page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500/20 hover:text-blue-300'
              }`}
            >
              Previous
            </button>
            <span className="glass-card px-4 py-2 text-gray-300">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`glass-button px-4 py-2 ${
                page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500/20 hover:text-blue-300'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
