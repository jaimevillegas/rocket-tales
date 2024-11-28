'use client'

export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-black dark:from-black dark:via-gray-900 dark:to-black transition-colors duration-500">
        {/* Stars layers */}
        <div className="absolute inset-0">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>

        {/* Nebula effect */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute inset-0 nebula-1"></div>
          <div className="absolute inset-0 nebula-2"></div>
        </div>

        {/* Shooting stars */}
        <div className="shooting-stars">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Glow effects */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-500/5 to-transparent"></div>
      </div>
    </div>
  )
}
