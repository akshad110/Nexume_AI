import React from 'react'
import { Link } from 'react-router-dom'
import { MockResumeEditor } from './mock/LandingMocks'
import ScrollReveal from './ScrollReveal'
import { useCountUp } from '@/hooks/useCountUp'
import { useScrollReveal } from '@/hooks/useScrollReveal'

function LandingHero({ startHref, isSignedIn }) {
  const avatars = ['AK', 'JR', 'MS', 'PL', 'TC']
  const { ref: countRef, visible: countVisible } = useScrollReveal({ threshold: 0.5 })
  const resumeCount = useCountUp(2000, { enabled: countVisible, duration: 2200 })

  return (
    <section className="relative overflow-hidden pt-4 pb-16 md:pb-24">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[min(900px,120vw)] h-[500px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.35) 0%, rgba(159, 91, 255, 0.2) 45%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-center lg:text-left">
            <ScrollReveal delay={0}>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur px-4 py-1.5 text-sm shadow-sm mb-6">
              <span className="text-amber-500 font-bold">★★★★★</span>
              <span className="text-gray-600">
                <strong className="text-gray-900">4.9</strong> rating · trusted by
                job seekers
              </span>
            </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              The resume platform for{' '}
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">
                serious applicants
              </span>
            </h1>
            </ScrollReveal>

            <ScrollReveal delay={160}>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Build polished resumes, run instant ATS checks against any job post,
              and export print-perfect PDFs — without juggling five different tools.
            </p>
            </ScrollReveal>

            <ScrollReveal delay={240}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                to={startHref}
                className="inline-flex justify-center items-center rounded-2xl bg-gray-900 text-white font-bold text-sm px-8 py-4 hover:bg-gray-800 shadow-lg shadow-gray-900/20 transition-all hover:-translate-y-0.5"
              >
                {isSignedIn ? 'Open workspace' : 'Start free'}
              </Link>
              <a
                href="#features"
                className="inline-flex justify-center items-center rounded-2xl border-2 border-gray-200 bg-white text-gray-900 font-semibold text-sm px-8 py-4 hover:border-gray-400 transition-all"
              >
                See how it works
              </a>
            </div>
            </ScrollReveal>

            <ScrollReveal delay={320}>
            <div
              ref={countRef}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {avatars.map((initials, i) => (
                  <div
                    key={initials}
                    className="h-9 w-9 rounded-full border-2 border-white bg-gradient-to-br from-violet-400 to-cyan-400 flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                    style={{ zIndex: avatars.length - i }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <strong className="text-gray-900 tabular-nums">
                  {resumeCount.toLocaleString()}+
                </strong>{' '}
                resumes created this month
              </p>
            </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-gray-600">
              {[
                'Ready in minutes',
                'No design skills needed',
                'Works with any job listing',
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                  {t}
                </li>
              ))}
            </ul>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={200} direction="left" className="relative lg:pl-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-200/40 to-violet-200/40 rounded-[2rem] blur-2xl scale-95" />
            <div className="relative rounded-[2rem] border border-white/50 bg-white/40 backdrop-blur p-6 shadow-[0_24px_80px_-20px_rgba(99,102,241,0.35)]">
              <MockResumeEditor />
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default LandingHero
