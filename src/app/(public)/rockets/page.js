import React from 'react'
import Link from 'next/link'

const RocketsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Rockets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((rocket) => (
          <div 
            key={rocket}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Rocket {rocket}</h2>
            <p className="text-gray-600 mb-4">
              A powerful spacecraft designed for space exploration and payload delivery.
            </p>
            <Link 
              href={`/rockets/${rocket}`}
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RocketsPage
