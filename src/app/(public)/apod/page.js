'use client'

import React from 'react'
import Image from 'next/image'
import { useAPOD } from '@/hooks/useNasa'
import LoadingSpinner from '@/components/LoadingSpinner'

function APODPage() {
  const { data: apodData, isLoading, isError, error } = useAPOD()

  if (isLoading) {
    return <LoadingSpinner message="Loading NASA's Picture of the Day..." />
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">
            {error?.message || 'Unable to load NASA\'s Astronomy Picture of the Day. Please try again later.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Astronomy Picture of the Day</h1>
        <p className="text-gray-600 mb-6">{new Date(apodData.date).toLocaleDateString()}</p>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative w-full h-[600px]">
            {apodData.media_type === 'image' ? (
              <Image
                src={apodData.url}
                alt={apodData.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            ) : (
              <iframe
                src={apodData.url}
                title={apodData.title}
                className="w-full h-full"
                allowFullScreen
              />
            )}
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{apodData.title}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">{apodData.explanation}</p>
            
            {apodData.copyright && (
              <p className="text-sm text-gray-500">
                &copy; {apodData.copyright}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default APODPage
