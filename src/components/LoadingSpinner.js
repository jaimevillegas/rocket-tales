import React from 'react'

export default function LoadingSpinner({ size = 'default' }) {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-16 h-16',
    large: 'w-24 h-24',
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className={`loading-ring ${sizeClasses[size]}`}>
        <div className="text-blue-500 dark:text-blue-400"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-pulse text-blue-500 dark:text-blue-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
      </div>
    </div>
  )
}
