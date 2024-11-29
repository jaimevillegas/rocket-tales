'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSpaceStation } from '@/hooks/useSpaceStations'
import LoadingSpinner from '@/components/LoadingSpinner'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function SpaceStationContent({ id }) {
  const { data: station, isLoading, isError, error } = useSpaceStation(id)
  const [activeTab, setActiveTab] = useState('overview')

  if (isLoading) {
    return <LoadingSpinner message="Loading space station details..." />
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
            <h2 className="text-lg font-semibold text-red-300">Error Loading Space Station</h2>
          </div>
          <p className="text-red-200">
            {error?.message || 'Unable to load space station details. Please try again later.'}
          </p>
          <Link
            href="/space-stations"
            className="inline-flex items-center px-4 py-2 mt-4 glass-button-error"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Space Stations
          </Link>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Technical Details' },
    { id: 'history', label: 'History' },
  ]

  const getStatusColor = (status) => {
    if (!status || typeof status !== 'string') {
      return 'bg-blue-400/20 text-blue-300 border-blue-400/30'
    }

    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30'
      case 'retired':
        return 'bg-gray-400/20 text-gray-300 border-gray-400/30'
      case 'under construction':
        return 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30'
      default:
        return 'bg-blue-400/20 text-blue-300 border-blue-400/30'
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-glow">Description</h3>
              <p className="text-gray-300 leading-relaxed">{station.description}</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3 text-glow">Key Information</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card p-4">
                  <dt className="text-sm font-medium text-gray-400">Founded</dt>
                  <dd className="mt-1 text-lg font-semibold text-white">
                    {new Date(station.founded).toLocaleDateString()}
                  </dd>
                </div>
                <div className="glass-card p-4">
                  <dt className="text-sm font-medium text-gray-400">Status</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(station.status?.name)}`}>
                      {station.status?.name || 'Unknown'}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )
      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-glow">Technical Specifications</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card p-4">
                  <dt className="text-sm font-medium text-gray-400">Type</dt>
                  <dd className="mt-1 text-lg text-white">{station.type}</dd>
                </div>
                <div className="glass-card p-4">
                  <dt className="text-sm font-medium text-gray-400">Orbit</dt>
                  <dd className="mt-1 text-lg text-white">{station.orbit}</dd>
                </div>
                <div className="glass-card p-4">
                  <dt className="text-sm font-medium text-gray-400">Owners</dt>
                  <dd className="mt-1 text-lg text-white">{station.owners}</dd>
                </div>
                <div className="glass-card p-4">
                  <dt className="text-sm font-medium text-gray-400">Contractors</dt>
                  <dd className="mt-1 text-lg text-white">{station.contractors}</dd>
                </div>
              </dl>
            </div>
          </div>
        )
      case 'history':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-glow">Historical Timeline</h3>
              <div className="glass-card p-6">
                <div className="space-y-4">
                  {station.history?.map((event, index) => (
                    <div key={index} className="border-l-2 border-blue-500/30 pl-4 pb-4">
                      <div className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString()}</div>
                      <div className="mt-1 text-white">{event.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/space-stations"
        className="inline-flex items-center mb-6 text-blue-400 hover:text-blue-300 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Space Stations
      </Link>

      <div className="glass-card overflow-hidden mb-8">
        <div className="relative h-64 md:h-96">
          {station.image_url && (
            <Image
              src={station.image_url}
              alt={station.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-4xl font-bold text-white mb-2 text-glow">{station.name}</h1>
            <p className="text-gray-300">{station.type}</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex space-x-4 mb-6 border-b border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-4">{renderTabContent()}</div>
      </div>
    </div>
  )
}
