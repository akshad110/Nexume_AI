import React from 'react'

/** Minimal document silhouette — no stock illustration */
function ResumeDocMock({ accent = '#171717', label }) {
  return (
    <div className="relative mx-auto mt-5 mb-3 w-[78%] aspect-[1/1.32] max-w-[140px]">
      <div
        className="absolute inset-0 rounded-[3px] border border-gray-200/90 bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)]"
        style={{ transform: 'rotate(-1.5deg)' }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-[5px] rounded-l-[2px]"
          style={{ backgroundColor: accent }}
        />
        <div className="pl-4 pr-3 pt-4 pb-3 space-y-2.5">
          <div
            className="h-2 rounded-sm opacity-90"
            style={{ width: '72%', backgroundColor: accent }}
          />
          <div className="h-1 w-[45%] rounded-sm bg-gray-200" />
          <div className="pt-2 space-y-1.5">
            <div className="h-1 w-full rounded-sm bg-gray-100" />
            <div className="h-1 w-[92%] rounded-sm bg-gray-100" />
            <div className="h-1 w-[88%] rounded-sm bg-gray-100" />
            <div className="h-1 w-[70%] rounded-sm bg-gray-100" />
          </div>
          <div className="pt-1 space-y-1.5">
            <div className="h-1 w-full rounded-sm bg-gray-100" />
            <div className="h-1 w-[80%] rounded-sm bg-gray-100" />
          </div>
        </div>
      </div>
      {label && (
        <span className="absolute -bottom-1 right-0 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400">
          {label}
        </span>
      )}
    </div>
  )
}

export default ResumeDocMock
