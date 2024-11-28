import React from 'react'

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div className="relative w-20 h-20 mb-4">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-pulse"></div>
        {/* Inner spinning ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        {/* Center dot */}
        <div className="absolute inset-[30%] bg-blue-500 rounded-full animate-pulse"></div>
      </div>
      <p className="text-lg text-gray-600 animate-pulse">{message}</p>
    </div>
  )
}

export default LoadingSpinner
