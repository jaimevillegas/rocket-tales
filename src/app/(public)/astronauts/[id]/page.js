import React from 'react'
import Link from 'next/link'

const AstronautDetailsPage = ({ params }) => {
  const { id } = params

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/astronauts"
          className="inline-block mb-6 text-blue-500 hover:text-blue-600"
        >
          ← Back to Astronauts
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-48 h-48 bg-gray-200 rounded-full mb-4" />
            <h1 className="text-4xl font-bold">Astronaut {id}</h1>
            <p className="text-gray-600">Space Explorer</p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Biography</h2>
              <p className="text-gray-600">
                A dedicated astronaut with years of experience in space exploration. 
                This section will be updated with the real astronaut's biography.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Personal Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Nationality</h3>
                  <p className="text-gray-600">TBD</p>
                </div>
                <div>
                  <h3 className="font-semibold">Time in Space</h3>
                  <p className="text-gray-600">TBD</p>
                </div>
                <div>
                  <h3 className="font-semibold">Missions</h3>
                  <p className="text-gray-600">TBD</p>
                </div>
                <div>
                  <h3 className="font-semibold">Status</h3>
                  <p className="text-gray-600">Active</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AstronautDetailsPage
