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
    return <LoadingSpinner message="Loading rocket details..." />
  }

  if (isError) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4">
          <div className="glass-card text-center p-8">
            <h1 className="text-4xl font-bold text-white mb-4 text-glow">Error Loading Rocket</h1>
            <p className="text-gray-300 mb-8">
              {error?.message || 'Unable to load rocket details. Please try again later.'}
            </p>
            <Link 
              href="/rockets"
              className="glass-button hover:bg-blue-500/20 hover:text-blue-300"
            >
              Back to Rockets
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
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

        <div className="glass-card p-8">
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
