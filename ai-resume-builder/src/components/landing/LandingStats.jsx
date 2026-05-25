import React from 'react'
import { cn } from '@/lib/utils'
import { useCountUp } from '@/hooks/useCountUp'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import ScrollReveal from './ScrollReveal'

const STAT_GRADIENT =
  'from-black from-10% via-gray-900 via-75% to-gray-400 to-100%'

const STATS = [
  {
    end: 68,
    suffix: '%',
    label: 'Less time spent formatting resumes',
    gradient: STAT_GRADIENT,
  },
  {
    end: 80,
    suffix: '%',
    label: 'Average ATS alignment improvement',
    gradient: STAT_GRADIENT,
  },
  {
    end: 3,
    suffix: '×',
    label: 'Faster from draft to PDF export',
    gradient: STAT_GRADIENT,
  },
  {
    end: 92,
    suffix: '%',
    label: 'Would recommend to a friend',
    gradient: STAT_GRADIENT,
  },
]

function StatItem({ stat, index }) {
  const { ref, visible } = useScrollReveal({ threshold: 0.25 })
  const count = useCountUp(stat.end, {
    enabled: visible,
    duration: 1600 + index * 150,
  })

  return (
    <div
      ref={ref}
      className={cn(
        'text-center transition-all duration-700',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
      )}
      style={{
        transitionDelay: visible ? `${index * 100}ms` : '0ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <p
        className={cn(
          'bg-gradient-to-br bg-clip-text text-5xl font-black tabular-nums tracking-tight text-transparent md:text-6xl',
          stat.gradient,
        )}
      >
        {count}
        {stat.suffix}
      </p>
      <p className="mx-auto mt-3 max-w-[14rem] text-sm font-medium leading-snug text-gray-500">
        {stat.label}
      </p>
    </div>
  )
}

function LandingStats() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <ScrollReveal>
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
          Apply smarter with resumes built for real hiring pipelines
        </h2>
      </ScrollReveal>

      <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {STATS.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  )
}

export default LandingStats
