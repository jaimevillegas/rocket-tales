'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAPOD } from '@/hooks/useNasa'
import LoadingSpinner from '@/components/LoadingSpinner'

function HomePage() {
  const { data: apodData, isLoading } = useAPOD()

  if (isLoading) {
    return <LoadingSpinner message="Loading your space journey..." />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {apodData?.media_type === 'image' && (
            <Image
              src={apodData.url}
              alt={apodData.title}
              fill
              className="object-cover brightness-50"
              priority
            />
          )}
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Explore the Cosmos
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your gateway to space exploration, featuring missions, astronauts, rockets, and space stations.
          </p>
          <Link 
            href="/missions"
            className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Start Exploring
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Discover Space</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Missions Card */}
            <Link 
              href="/missions"
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-blue-500 flex items-center justify-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">Missions</h3>
                <p className="text-gray-600">Explore past and upcoming space missions.</p>
              </div>
            </Link>

            {/* Astronauts Card */}
            <Link 
              href="/astronauts"
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-green-500 flex items-center justify-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-green-500 transition-colors">Astronauts</h3>
                <p className="text-gray-600">Meet the heroes of space exploration.</p>
              </div>
            </Link>

            {/* Rockets Card */}
            <Link 
              href="/rockets"
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-red-500 flex items-center justify-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-red-500 transition-colors">Rockets</h3>
                <p className="text-gray-600">Discover the vehicles that take us to space.</p>
              </div>
            </Link>

            {/* Space Stations Card */}
            <Link 
              href="/space-stations"
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-purple-500 flex items-center justify-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-500 transition-colors">Space Stations</h3>
                <p className="text-gray-600">Visit humanity&apos;s homes in orbit.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* APOD Section */}
      {apodData && (
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Picture of the Day</h2>
            <p className="text-center text-gray-600 mb-8">{apodData.title}</p>
            <div className="max-w-4xl mx-auto">
              <Link 
                href="/apod"
                className="block group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                {apodData.media_type === 'image' && (
                  <div className="relative h-[400px]">
                    <Image
                      src={apodData.url}
                      alt={apodData.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">View Full Details →</span>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default HomePage