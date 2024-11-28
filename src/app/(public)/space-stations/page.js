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

  console.log('Space Stations List Data:', {
    fullData: data,
    firstStation: data?.results?.[0],
    imageFields: data?.results?.[0] ? {
      image_url: data.results[0].image_url,
      imageUrl: data.results[0].imageUrl,
      image: data.results[0].image,
      allKeys: Object.keys(data.results[0])
    } : null
  })

  if (isLoading) {
    return <LoadingSpinner message="Loading space stations..." />
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Space Stations
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore humanity's permanent presence in space, from the International Space Station to commercial space habitats.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <label className="flex items-center space-x-2 text-gray-700">
            <span className="font-medium">Filter by Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48">
                <Image
                  src={station.image?.image_url || '/images/space-station-placeholder.svg'}
                  alt={station.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-white">
                      {station.name}
                    </h2>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${station.status.name === 'Active' ? 'bg-green-500' : 
                        station.status.name === 'Under Construction' ? 'bg-yellow-500' : 
                        'bg-gray-500'} text-white`}>
                      {station.status.name}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Type:</span> {station.type.name}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Orbit:</span> {station.orbit || 'Not specified'}
                  </p>
                  {station.owners && station.owners.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-600">Owner:</span>
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
                        <span className="text-gray-600">{station.owners[0].name}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-800 transition-colors">
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
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-lg ${
                  page === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
