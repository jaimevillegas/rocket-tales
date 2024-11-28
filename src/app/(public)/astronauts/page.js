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
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">
            {error?.message || 'Unable to load astronauts. Please try again later.'}
          </p>
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Astronauts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the brave explorers who venture into space, from pioneering legends to modern-day space travelers.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAstronauts.map((astronaut) => (
            <Link
              key={astronaut.id}
              href={`/astronauts/${astronaut.id}`}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-96">
                <Image
                  src={astronaut.image?.image_url || '/images/astronaut-placeholder.svg'}
                  alt={astronaut.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-white">
                      {astronaut.name}
                    </h2>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${astronaut.status.name === 'Active' ? 'bg-green-500' : 
                        astronaut.status.name === 'Retired' ? 'bg-gray-500' : 
                        'bg-blue-500'} text-white`}>
                      {astronaut.status.name}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Nationality:</span>{' '}
                    {typeof astronaut.nationality === 'object' 
                      ? astronaut.nationality.name || astronaut.nationality.nationality_name 
                      : astronaut.nationality}
                  </p>
                  {astronaut.agency && (
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-600">Agency:</span>
                      <div className="flex items-center space-x-1">
                        {astronaut.agency.image_url && (
                          <div className="relative w-4 h-4">
                            <Image
                              src={astronaut.agency.image_url}
                              alt={astronaut.agency.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <span className="text-gray-600">{astronaut.agency.name}</span>
                      </div>
                    </div>
                  )}
                  {astronaut.date_of_birth && (
                    <p className="text-gray-600">
                      <span className="font-semibold">Born:</span>{' '}
                      {new Date(astronaut.date_of_birth).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-800 transition-colors">
                  <span>View Profile</span>
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
          <div className="mt-12 flex justify-center items-center space-x-2">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              First
            </button>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {/* First page */}
            {page > 3 && (
              <>
                <button
                  onClick={() => setPage(1)}
                  className="w-10 h-10 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  1
                </button>
                {page > 4 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
              </>
            )}

            {/* Current page and neighbors */}
            {[...Array(5)].map((_, i) => {
              const pageNum = page - 2 + i
              if (pageNum > 0 && pageNum <= totalPages) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-lg ${
                      page === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              }
              return null
            })}

            {/* Last page */}
            {page < totalPages - 2 && (
              <>
                {page < totalPages - 3 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
                <button
                  onClick={() => setPage(totalPages)}
                  className="w-10 h-10 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
