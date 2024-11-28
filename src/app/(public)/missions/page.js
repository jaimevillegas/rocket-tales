import React from 'react'
import Link from 'next/link'

const MissionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Space Missions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder Mission Cards */}
        {[1, 2, 3].map((mission) => (
          <div 
            key={mission}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-3">Mission {mission}</h2>
            <p className="text-gray-600 mb-4">
              This is a placeholder for mission {mission} details. Soon this will display real mission information.
            </p>
            <Link 
              href={`/missions/${mission}`}
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MissionsPage