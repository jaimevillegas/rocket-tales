import React from 'react'
import Link from 'next/link'

const RocketDetailsPage = ({ params }) => {
  const { id } = params

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/rockets"
          className="inline-block mb-6 text-blue-500 hover:text-blue-600"
        >
          ← Back to Rockets
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-4" />
            <h1 className="text-4xl font-bold">Rocket {id}</h1>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Overview</h2>
              <p className="text-gray-600">
                This advanced rocket is designed for reliable space exploration and payload delivery. 
                This section will be updated with real rocket specifications and capabilities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Technical Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold">Height</h3>
                  <p className="text-gray-600">TBD meters</p>
                </div>
                <div>
                  <h3 className="font-semibold">Diameter</h3>
                  <p className="text-gray-600">TBD meters</p>
                </div>
                <div>
                  <h3 className="font-semibold">Mass</h3>
                  <p className="text-gray-600">TBD kg</p>
                </div>
                <div>
                  <h3 className="font-semibold">Payload Capacity</h3>
                  <p className="text-gray-600">TBD kg to LEO</p>
                </div>
                <div>
                  <h3 className="font-semibold">Stages</h3>
                  <p className="text-gray-600">TBD</p>
                </div>
                <div>
                  <h3 className="font-semibold">Status</h3>
                  <p className="text-gray-600">Active</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Launch History</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Launch history and success rate will be displayed here.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RocketDetailsPage
