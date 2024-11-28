import React from 'react'
import Link from 'next/link'

const MissionDetailsPage = ({ params }) => {
  const { id } = params

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/missions"
          className="inline-block mb-6 text-blue-500 hover:text-blue-600"
        >
          ← Back to Missions
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold mb-4">Mission {id}</h1>
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Mission Overview</h2>
              <p className="text-gray-600">
                This is a detailed description for Mission {id}. This section will be updated with real mission data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Mission Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Launch Date</h3>
                  <p className="text-gray-600">TBD</p>
                </div>
                <div>
                  <h3 className="font-semibold">Status</h3>
                  <p className="text-gray-600">Planning</p>
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-gray-600">TBD</p>
                </div>
                <div>
                  <h3 className="font-semibold">Mission Type</h3>
                  <p className="text-gray-600">Exploration</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MissionDetailsPage