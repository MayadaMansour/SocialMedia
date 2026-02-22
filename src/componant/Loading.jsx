import React from 'react'




export default function Loading({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
    
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      </div>


      <p className="text-gray-500 text-sm animate-pulse">
        {text}
      </p>
    </div>
  );
}
