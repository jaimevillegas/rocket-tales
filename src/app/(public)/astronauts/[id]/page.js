'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAstronaut } from '@/hooks/useAstronauts'
import LoadingSpinner from '@/components/LoadingSpinner'
import ImageModal from '@/components/ImageModal'

export default function AstronautDetailsPage({ params }) {
  const { id } = params
  const { data: astronaut, isLoading, isError, error } = useAstronaut(id)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  if (isLoading) {
    return <LoadingSpinner message="Loading astronaut details..." />
  }

  if (isError) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4">
          <div className="glass-card text-center p-8">
            <h1 className="text-4xl font-bold text-white mb-4 text-glow">Error Loading Astronaut</h1>
            <p className="text-gray-300 mb-8">
              {error?.message || 'Unable to load astronaut details. Please try again later.'}
            </p>
            <Link 
              href="/astronauts"
              className="glass-button hover:bg-blue-500/20 hover:text-blue-300"
            >
              Back to Astronauts
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const imageUrl = astronaut.image?.image_url || '/images/astronaut-placeholder.svg'

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/astronauts"
          className="inline-flex items-center text-blue-300 hover:text-blue-200 mb-8 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Astronauts
        </Link>

        <div className="glass-card overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-[40vh] min-h-[400px]">
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="absolute inset-0 w-full h-full group cursor-zoom-in focus:outline-none"
              aria-label="View full image"
            >
              <Image
                src={imageUrl}
                alt={astronaut.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Astronaut Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <h1 className="text-4xl font-bold text-white mb-4 text-glow">
                {astronaut.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  astronaut.status.name === 'active' 
                    ? 'bg-green-500/20 text-green-300' 
                    : astronaut.status.name === 'retired'
                    ? 'bg-gray-500/20 text-gray-300'
                    : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {astronaut.status.name.charAt(0).toUpperCase() + astronaut.status.name.slice(1)}
                </span>
                {astronaut.nationality && (
                  <span className="text-gray-300">
                    {typeof astronaut.nationality === 'object' 
                      ? astronaut.nationality.nationality_name || astronaut.nationality.name
                      : astronaut.nationality}
                  </span>
                )}
                {astronaut.date_of_birth && (
                  <span className="text-gray-300">
                    Born: {new Date(astronaut.date_of_birth).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8">
            {/* Bio */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 text-glow">Biography</h2>
              <p className="text-gray-300 leading-relaxed">
                {astronaut.bio || 'No biography available.'}
              </p>
            </div>

            {/* Agency Info */}
            {astronaut.agency && (
              <div className="glass-card-secondary p-6 mb-8">
                <h2 className="text-xl font-semibold text-white mb-4 text-glow">Space Agency</h2>
                <div className="flex items-center space-x-4">
                  {astronaut.agency.image_url && (
                    <div className="relative w-16 h-16 bg-white/10 rounded-lg overflow-hidden">
                      <Image
                        src={astronaut.agency.image_url}
                        alt={astronaut.agency.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {astronaut.agency.name}
                    </h3>
                    {astronaut.agency.description && (
                      <p className="text-gray-300 mt-1">
                        {astronaut.agency.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {astronaut.flights_count > 0 && (
                <div className="glass-card-secondary p-6">
                  <h3 className="text-lg font-medium text-white mb-2">Space Flights</h3>
                  <p className="text-3xl font-bold text-blue-300">{astronaut.flights_count}</p>
                </div>
              )}
              {astronaut.landings_count > 0 && (
                <div className="glass-card-secondary p-6">
                  <h3 className="text-lg font-medium text-white mb-2">Landings</h3>
                  <p className="text-3xl font-bold text-blue-300">{astronaut.landings_count}</p>
                </div>
              )}
              {astronaut.spacewalks_count > 0 && (
                <div className="glass-card-secondary p-6">
                  <h3 className="text-lg font-medium text-white mb-2">Spacewalks</h3>
                  <p className="text-3xl font-bold text-blue-300">{astronaut.spacewalks_count}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image Modal */}
        <ImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          imageUrl={imageUrl}
          altText={astronaut.name}
        />
      </div>
    </div>
  )
}
