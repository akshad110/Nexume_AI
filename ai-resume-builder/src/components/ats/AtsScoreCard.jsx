import React from 'react'
import { getScoreLabel, getScoreRingColor } from '@/lib/parseAtsAnalysis'
import { useCountUp } from '@/hooks/useCountUp'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

function AtsScoreCard({ score }) {
  const { ref, visible } = useScrollReveal({ threshold: 0.2 })
  const animatedScore = useCountUp(score ?? 0, {
    enabled: visible && score != null,
    duration: 1400,
  })
  const { label } = getScoreLabel(score)
  const barColor = getScoreRingColor(score)
  const pct = score ?? 0

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-[2rem] border border-white/60 p-6 md:p-8 shadow-[0_20px_60px_-20px_rgba(99,102,241,0.25)] transition-all duration-700',
        'bg-gradient-to-br from-white via-violet-50/30 to-cyan-50/40',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      )}
      style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-40 blur-3xl"
        style={{ background: barColor }}
      />

      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 relative">
        01 · Match overview
      </p>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 relative">
        <div>
          {score != null ? (
            <p className="text-7xl md:text-8xl font-black tabular-nums leading-none tracking-tighter bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {Math.round(animatedScore)}
              <span className="text-3xl font-bold text-gray-400">%</span>
            </p>
          ) : (
            <p className="text-5xl font-bold text-gray-300">—</p>
          )}
        </div>
        <span
          className="inline-flex self-start rounded-full px-4 py-1.5 text-sm font-bold text-white shadow-md"
          style={{ backgroundColor: barColor }}
        >
          {label}
        </span>
      </div>

      <div className="mt-6 h-3 w-full rounded-full bg-gray-200/80 overflow-hidden relative">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: visible && score != null ? `${pct}%` : '0%',
            background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`,
          }}
        />
      </div>
      <div className="flex justify-between mt-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
        <span>Weak</span>
        <span>Average</span>
        <span>Strong</span>
      </div>
    </div>
  )
}

export default AtsScoreCard
