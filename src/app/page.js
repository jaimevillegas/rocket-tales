import Link from 'next/link'
import Image from 'next/image'

const features = [
  {
    title: 'Mars Curiosity Rover',
    description: 'Explore the red planet through the eyes of NASA\'s Curiosity rover. View the latest images captured on Mars and filter by different camera types.',
    image: '/images/curiosity.jpg',
    link: '/mars-rovers',
    color: 'from-red-500/40 to-orange-500/40',
  },
  {
    title: 'Space Missions',
    description: 'Stay updated with past and upcoming space missions. Track launches, learn about mission objectives, and follow space exploration progress.',
    image: '/images/missions.jpg',
    link: '/missions',
    color: 'from-blue-500/40 to-purple-500/40',
  },
  {
    title: 'Rockets',
    description: 'Discover the vehicles that make space exploration possible. Explore detailed specifications of various rockets and their launch history.',
    image: '/images/rockets.jpg',
    link: '/rockets',
    color: 'from-green-500/40 to-teal-500/40',
  },
  {
    title: 'Space Stations',
    description: 'Learn about the orbital outposts that enable human presence in space. Get real-time updates on current space stations and their missions.',
    image: '/images/stations.jpg',
    link: '/space-stations',
    color: 'from-yellow-500/40 to-orange-500/40',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Space background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-glow">
            Rocket Tales
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Your gateway to space exploration. Discover the latest Mars rover images,
            track space missions, explore rockets, and stay updated with space stations.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.link}
              className="glass-card group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative h-64 rounded-t-lg overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>
              <div className="relative p-6">
                <h3 className="text-2xl font-bold text-white mb-2 text-glow">{feature.title}</h3>
                <p className="text-gray-300 text-lg">{feature.description}</p>
                <div className="mt-4 flex items-center text-blue-300 group-hover:text-blue-200">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* API Attribution */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-card">
          <h2 className="text-2xl font-bold text-white mb-4 text-glow">Powered By</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-2 text-glow">NASA APIs</h3>
              <p className="text-gray-300">
                Mars Rover Photos API providing the latest images from the Curiosity rover on Mars.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2 text-glow">The Space Devs</h3>
              <p className="text-gray-300">
                Launch Library 2 API delivering comprehensive data about space missions, rockets, and more.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="glass-card mt-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">
            Built with Next.js 14, React, and Tailwind CSS. All space images and data are provided
            by NASA and The Space Devs.
          </p>
        </div>
      </footer>
    </div>
  )
}
