'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useMarsRovers, useRoverPhotos } from '@/hooks/useMarsRovers'
import { getRoverCameras } from '@/utils/marsRovers'
import LoadingSpinner from '@/components/LoadingSpinner'
import ImageModal from '@/components/ImageModal'

export default function MarsRoversPage() {
  const [selectedCamera, setSelectedCamera] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  
  const { data: rovers, isLoading: isLoadingRovers } = useMarsRovers()
  const { data: photos, isLoading: isLoadingPhotos } = useRoverPhotos({
    camera: selectedCamera || undefined,
  })

  if (isLoadingRovers) {
    return <LoadingSpinner message="Loading Mars Rover..." />
  }

  const cameras = getRoverCameras()
  const curiosity = rovers?.[0]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Curiosity Rover Images</h1>
        
        {/* Rover Info */}
        {curiosity && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{curiosity.name}</h2>
                <p className="text-gray-600">
                  Launch Date: {new Date(curiosity.launch_date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Landing Date: {new Date(curiosity.landing_date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  ACTIVE
                </span>
              </div>
            </div>
          </div>
        )}
        
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Camera
            </label>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Cameras</option>
              {cameras.map((camera) => (
                <option key={camera.id} value={camera.id}>
                  {camera.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Photos Grid */}
        {isLoadingPhotos ? (
          <LoadingSpinner message="Loading photos..." />
        ) : photos?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No photos found for the selected camera.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos?.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative h-64">
                  <Image
                    src={photo.img_src}
                    alt={`Photo taken by Curiosity's ${photo.camera.full_name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm">
                        {photo.camera.full_name}
                      </p>
                      <p className="text-white/80 text-xs">
                        Earth Date: {new Date(photo.earth_date).toLocaleDateString()}
                      </p>
                      <p className="text-white/80 text-xs">
                        Sol: {photo.sol}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Modal */}
        {selectedPhoto && (
          <ImageModal
            isOpen={!!selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
            imageUrl={selectedPhoto.img_src}
            altText={`Photo taken by Curiosity's ${selectedPhoto.camera.full_name}`}
          />
        )}
      </div>
    </div>
  )
}
