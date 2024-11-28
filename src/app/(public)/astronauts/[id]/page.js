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
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">
            {error?.message || 'Unable to load astronaut details. Please try again later.'}
          </p>
        </div>
      </div>
    )
  }

  const imageUrl = astronaut.image?.image_url || '/images/astronaut-placeholder.svg'

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/astronauts"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Astronauts
          </Link>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header Section with Image */}
            <div className="relative h-96">
              <button
                onClick={() => setIsImageModalOpen(true)}
                className="absolute inset-0 w-full h-full group cursor-zoom-in focus:outline-none"
                aria-label="View full image"
              >
                <Image
                  src={imageUrl}
                  alt={astronaut.name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-12 w-12 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" 
                      />
                    </svg>
                  </div>
                </div>
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                      {astronaut.name}
                    </h1>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium
                        ${astronaut.status.name === 'Active' ? 'bg-green-500' : 
                          astronaut.status.name === 'Retired' ? 'bg-gray-500' : 
                          'bg-blue-500'} text-white`}>
                        {astronaut.status.name}
                      </span>
                      {astronaut.nationality && (
                        <span className="text-white">
                          {typeof astronaut.nationality === 'object' 
                            ? astronaut.nationality.name || astronaut.nationality.nationality_name 
                            : astronaut.nationality}
                        </span>
                      )}
                    </div>
                  </div>
                  {astronaut.agency && (
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-2">
                      {astronaut.agency.image_url && (
                        <div className="relative w-8 h-8 mr-2">
                          <Image
                            src={astronaut.agency.image_url}
                            alt={astronaut.agency.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="text-white font-medium">
                        {astronaut.agency.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - Personal Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {astronaut.date_of_birth && (
                        <div>
                          <p className="text-sm text-gray-500">Date of Birth</p>
                          <p className="font-medium">
                            {new Date(astronaut.date_of_birth).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      {astronaut.date_of_death && (
                        <div>
                          <p className="text-sm text-gray-500">Date of Death</p>
                          <p className="font-medium">
                            {new Date(astronaut.date_of_death).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      {astronaut.twitter && (
                        <div>
                          <p className="text-sm text-gray-500">Twitter</p>
                          <a 
                            href={astronaut.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            @{astronaut.twitter.split('/').pop()}
                          </a>
                        </div>
                      )}
                      {astronaut.instagram && (
                        <div>
                          <p className="text-sm text-gray-500">Instagram</p>
                          <a 
                            href={astronaut.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            @{astronaut.instagram.split('/').pop()}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {astronaut.agency && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Space Agency</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          {astronaut.agency.image_url && (
                            <div className="relative w-6 h-6 mr-2">
                              <Image
                                src={astronaut.agency.image_url}
                                alt={astronaut.agency.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                          <p className="font-medium">{astronaut.agency.name}</p>
                        </div>
                        {astronaut.agency.description && (
                          <p className="text-sm text-gray-600">
                            {astronaut.agency.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Bio and Stats */}
                <div className="md:col-span-2 space-y-8">
                  {/* Bio Section */}
                  <section>
                    <h2 className="text-2xl font-semibold mb-4">Biography</h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-600 whitespace-pre-line">
                        {astronaut.bio || 'No biography available.'}
                      </p>
                    </div>
                  </section>

                  {/* Stats Section */}
                  <section>
                    <h2 className="text-2xl font-semibold mb-4">Space Experience</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {astronaut.first_flight && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-500">First Flight</p>
                          <p className="font-medium">
                            {new Date(astronaut.first_flight).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      {astronaut.last_flight && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-500">Last Flight</p>
                          <p className="font-medium">
                            {new Date(astronaut.last_flight).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Flights Count</p>
                        <p className="font-medium">{astronaut.flights_count || 0}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Landings Count</p>
                        <p className="font-medium">{astronaut.landings_count || 0}</p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={imageUrl}
        altText={astronaut.name}
      />
    </div>
  )
}
