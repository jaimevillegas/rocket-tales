'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSpaceStations } from '@/hooks/useSpaceStations'
import LoadingSpinner from '@/components/LoadingSpinner'

const ITEMS_PER_PAGE = 9

function SpaceStationsPage() {
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('all')
  
  const { data, isLoading, isError, error } = useSpaceStations(
    ITEMS_PER_PAGE,
    (page - 1) * ITEMS_PER_PAGE
  )

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="glass-card border-red-500/30 p-6">
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
            <h2 className="text-lg font-semibold text-red-300">Error Loading Space Stations</h2>
          </div>
          <p className="text-red-200">
            {error?.message || 'Unable to load space stations. Please try again later.'}
          </p>
        </div>
      </div>
    )
  }

  // Get unique statuses for filter
  const statuses = ['all', ...new Set(data.results.map(station => station.status.name))]
  
  // Filter stations based on status
  const filteredStations = data.results.filter(station => 
    statusFilter === 'all' || station.status.name === statusFilter
  )

  const totalPages = Math.ceil(data.count / ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-glow">
            Space Stations
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore humanity&apos;s permanent presence in space, from the International Space Station to commercial space habitats.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <label className="flex items-center space-x-2 text-gray-300">
            <span className="font-medium">Filter by Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStations.map((station) => (
            <Link
              key={station.id}
              href={`/space-stations/${station.id}`}
              className="glass-card group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative h-48 rounded-t-lg overflow-hidden">
                <Image
                  src={station.image?.image_url || '/images/space-station-placeholder.svg'}
                  alt={station.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-bold text-white text-glow">
                        {station.name}
                      </h2>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${station.status.name === 'Active' ? 'bg-green-400/20 text-green-300 border border-green-400/30' : 
                          station.status.name === 'Under Construction' ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30' : 
                          'bg-gray-400/20 text-gray-300 border border-gray-400/30'}`}>
                        {station.status.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-2 text-gray-200">
                  <p>
                    <span className="font-semibold">Type:</span> {station.type.name}
                  </p>
                  <p>
                    <span className="font-semibold">Orbit:</span> {station.orbit || 'Not specified'}
                  </p>
                  {station.owners && station.owners.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Owner:</span>
                      <div className="flex items-center space-x-1">
                        {station.owners[0].logo_url && (
                          <div className="relative w-4 h-4">
                            <Image
                              src={station.owners[0].logo_url}
                              alt={station.owners[0].name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <span>{station.owners[0].name}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex items-center text-blue-300 group-hover:text-blue-200 transition-colors">
                  <span>Learn more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center space-x-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`glass-button ${
                page === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-white/10 hover:text-blue-300'
              }`}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`glass-button w-10 h-10 ${
                  page === i + 1
                    ? 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                    : 'hover:bg-white/10 hover:text-blue-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`glass-button ${
                page === totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-white/10 hover:text-blue-300'
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

export default SpaceStationsPage
