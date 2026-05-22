import React from 'react'
import { cn } from '@/lib/utils'
import { useCountUp } from '@/hooks/useCountUp'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import ScrollReveal from './ScrollReveal'

const STATS = [
  {
    end: 68,
    suffix: '%',
    label: 'Less time spent formatting resumes',
    bg: 'bg-amber-100/80',
    text: 'text-amber-900',
  },
  {
    end: 80,
    suffix: '%',
    label: 'Average ATS alignment improvement',
    bg: 'bg-violet-100/80',
    text: 'text-violet-900',
  },
  {
    end: 3,
    suffix: '×',
    label: 'Faster from draft to PDF export',
    bg: 'bg-cyan-100/80',
    text: 'text-cyan-900',
  },
  {
    end: 92,
    suffix: '%',
    label: 'Would recommend to a friend',
    bg: 'bg-rose-100/80',
    text: 'text-rose-900',
  },
]

function StatCard({ stat, index }) {
  const { ref, visible } = useScrollReveal({ threshold: 0.3 })
  const count = useCountUp(stat.end, { enabled: visible, duration: 1600 + index * 150 })

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-[1.75rem] p-8 text-center transition-all duration-500 hover:-translate-y-1',
        stat.bg,
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
      )}
      style={{
        transitionDelay: visible ? `${index * 100}ms` : '0ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <p className={cn('text-4xl md:text-5xl font-black tracking-tight tabular-nums', stat.text)}>
        {count}
        {stat.suffix}
      </p>
      <p className="mt-3 text-sm font-medium text-gray-700 leading-snug">{stat.label}</p>
    </div>
  )
}

function LandingStats() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center max-w-3xl mx-auto">
          Apply smarter with resumes built for real hiring pipelines
        </h2>
      </ScrollReveal>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  )
}

export default LandingStats
