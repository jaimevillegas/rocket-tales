'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useRocket } from '@/hooks/useRockets'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function RocketDetailsPage({ params }) {
  const router = useRouter()
  const { id } = params
  
  const {
    data: rocket,
    isLoading,
    error,
    isError,
  } = useRocket(id)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/rockets"
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
            Back to Rockets
          </Link>
          
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
              <h2 className="text-lg font-semibold text-red-300">Error Loading Rocket Details</h2>
            </div>
            <p className="text-red-200 mb-4">{error?.message}</p>
            <button
              onClick={() => router.refresh()}
              className="glass-button text-red-300 border-red-400/30 hover:bg-red-500/20"
            >
              <svg
                className="w-4 h-4 mr-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/rockets"
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
          Back to Rockets
        </Link>
        
        <div className="glass-card overflow-hidden">
          <div className="relative h-96">
            <Image
              src={rocket.image_url || '/images/rocket-placeholder.jpg'}
              alt={rocket.full_name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>

          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl font-bold text-white text-glow">{rocket.full_name}</h1>
                <div className="flex gap-2">
                  {rocket.active && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-400/20 text-green-300 border border-green-400/30">
                      Active
                    </span>
                  )}
                  {rocket.reusable && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-400/20 text-blue-300 border border-blue-400/30">
                      Reusable
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-300">{rocket.description}</p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white text-glow">Overview</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-300">Manufacturer</h3>
                    <p className="text-gray-400">{rocket.manufacturer?.name || 'Unknown'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-300">Family</h3>
                    <p className="text-gray-400">{rocket.family || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-300">Variant</h3>
                    <p className="text-gray-400">{rocket.variant || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-300">Alias</h3>
                    <p className="text-gray-400">{rocket.alias || 'N/A'}</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3 text-white text-glow">Technical Specifications</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-300">Minimum Stages</h3>
                    <p className="text-gray-400">{rocket.min_stage || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-300">Maximum Stages</h3>
                    <p className="text-gray-400">{rocket.max_stage || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-300">Length</h3>
                    <p className="text-gray-400">{rocket.length ? `${rocket.length} m` : 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-300">Diameter</h3>
                    <p className="text-gray-400">{rocket.diameter ? `${rocket.diameter} m` : 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-300">Launch Mass</h3>
                    <p className="text-gray-400">{rocket.launch_mass ? `${rocket.launch_mass} kg` : 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-300">To Thrust</h3>
                    <p className="text-gray-400">{rocket.to_thrust ? `${rocket.to_thrust} kN` : 'N/A'}</p>
                  </div>
                </div>
              </section>

              {rocket.program?.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold mb-3 text-white text-glow">Programs</h2>
                  <div className="space-y-4">
                    {rocket.program.map((program) => (
                      <div key={program.id} className="glass-card p-4">
                        <h3 className="font-semibold text-gray-300 mb-2">{program.name}</h3>
                        <p className="text-gray-400">{program.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
