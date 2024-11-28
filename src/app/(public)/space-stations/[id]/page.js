'use client'

import React, { useState, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSpaceStation } from '@/hooks/useSpaceStations'
import LoadingSpinner from '@/components/LoadingSpinner'

function SpaceStationContent({ id }) {
  const { data: station, isLoading, isError, error } = useSpaceStation(id)
  const [activeTab, setActiveTab] = useState('overview')

  if (isLoading) {
    return <LoadingSpinner message="Loading space station details..." />
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">
            {error?.message || 'Unable to load space station details. Please try again later.'}
          </p>
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{station.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Key Information</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Founded</dt>
                  <dd className="mt-1 text-lg font-semibold">
                    {new Date(station.founded).toLocaleDateString()}
                  </dd>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                      ${station.status.name === 'Active' ? 'bg-green-100 text-green-800' : 
                        station.status.name === 'Under Construction' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {station.status.name}
                    </span>
                  </dd>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-lg font-semibold">{station.type.name}</dd>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500">Orbit</dt>
                  <dd className="mt-1 text-lg font-semibold">{station.orbit || 'Not specified'}</dd>
                </div>
                {station.orbit_height && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <dt className="text-sm font-medium text-gray-500">Orbit Height</dt>
                    <dd className="mt-1 text-lg font-semibold">{station.orbit_height}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        )
      case 'owners':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Operating Organizations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {station.owners?.map((owner) => (
                <div key={owner.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center space-x-4">
                    {owner.logo_url && (
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={owner.logo_url}
                          alt={owner.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="text-lg font-semibold">{owner.name}</h4>
                      {owner.abbrev && (
                        <p className="text-gray-500 text-sm">{owner.abbrev}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[50vh] bg-black">
        <Image
          src={station.image_url || '/images/space-station-placeholder.jpg'}
          alt={station.name}
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link
              href="/space-stations"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Space Stations
            </Link>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {station.name}
                </h1>
                <p className="text-white/80 text-lg">
                  {station.type.name}
                </p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium
                ${station.status.name === 'Active' ? 'bg-green-500' : 
                  station.status.name === 'Under Construction' ? 'bg-yellow-500' : 
                  'bg-gray-500'} text-white`}>
                {station.status.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm
                  ${activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('owners')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm
                  ${activeTab === 'owners'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Owners
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

import SpaceStationServer from './SpaceStationServer'

export default function SpaceStationPage({ params }) {
  return <SpaceStationServer id={params.id} />
}
