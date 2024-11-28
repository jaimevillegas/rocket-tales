import React from 'react'
import Link from 'next/link'

const AstronautsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Astronauts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((astronaut) => (
          <div 
            key={astronaut}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full" />
            <h2 className="text-2xl font-semibold mb-3 text-center">Astronaut {astronaut}</h2>
            <p className="text-gray-600 mb-4 text-center">
              Experienced space explorer with multiple missions under their belt.
            </p>
            <div className="text-center">
              <Link 
                href={`/astronauts/${astronaut}`}
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AstronautsPage
