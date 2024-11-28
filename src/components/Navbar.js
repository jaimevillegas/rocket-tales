import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          Rocket Tales
        </Link>
        <div className="space-x-6">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/missions" className="hover:text-gray-300">
            Missions
          </Link>
          <Link href="/astronauts" className="hover:text-gray-300">
            Astronauts
          </Link>
          <Link href="/rockets" className="hover:text-gray-300">
            Rockets
          </Link>
          <Link href="/space-stations" className="hover:text-gray-300">
            Space Stations
          </Link>
          <Link href="/apod" className="hover:text-gray-300">
            APOD
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar