'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useMission } from '@/hooks/useMissions'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function MissionDetailPage() {
  const { id } = useParams()
  const { data: mission, isLoading } = useMission(id)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!mission) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4">
          <div className="glass-card text-center p-8">
            <h1 className="text-4xl font-bold text-white mb-4 text-glow">Mission Not Found</h1>
            <p className="text-gray-300 mb-8">
              The mission you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/missions"
              className="glass-button hover:bg-blue-500/20 hover:text-blue-300"
            >
              Back to Missions
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <Link
          href="/missions"
          className="inline-flex items-center text-blue-300 hover:text-blue-200 mb-8 group"
        >
          <svg
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Missions
        </Link>

        <div className="glass-card overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-96">
            <Image
              src={mission.image || '/images/mission-placeholder.jpg'}
              alt={mission.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h1 className="text-4xl font-bold text-white mb-4 text-glow">{mission.name}</h1>
                <div className="flex items-center space-x-4">
                  {mission.status && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        mission.status.id === 1
                          ? 'bg-green-400/20 text-green-300 border border-green-400/30'
                          : mission.status.id === 3
                          ? 'bg-red-400/20 text-red-300 border border-red-400/30'
                          : 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30'
                      }`}
                    >
                      {mission.status.name}
                    </span>
                  )}
                  <span className="text-gray-300">
                    {new Date(mission.net).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Mission Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4 text-glow">Mission Details</h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-400">Launch Provider</dt>
                    <dd className="text-base text-gray-200">
                      {mission.launch_service_provider?.name || 'Unknown'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-400">Rocket</dt>
                    <dd className="text-base text-gray-200">
                      {mission.rocket?.configuration?.name || 'Unknown'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-400">Launch Site</dt>
                    <dd className="text-base text-gray-200">
                      {mission.pad?.name || 'Unknown'} ({mission.pad?.location?.name || 'Unknown Location'})
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-400">Mission Type</dt>
                    <dd className="text-base text-gray-200">
                      {mission.mission?.type || 'Unknown'}
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4 text-glow">Mission Description</h2>
                <p className="text-gray-300 whitespace-pre-line">
                  {mission.mission?.description || 'No description available.'}
                </p>
              </div>
            </div>

            {/* Updates */}
            {mission.updates?.length > 0 && (
              <div className="border-t border-white/10 pt-8">
                <h2 className="text-2xl font-semibold text-white mb-4 text-glow">Mission Updates</h2>
                <div className="space-y-6">
                  {mission.updates.map((update, index) => (
                    <div key={index} className="glass-card p-6">
                      <p className="text-sm text-gray-400 mb-2">
                        {new Date(update.created_on).toLocaleDateString()}
                      </p>
                      <p className="text-gray-200">{update.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}