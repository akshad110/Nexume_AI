import React from 'react'
import { Link } from 'react-router-dom'
import { MockScoreWidget } from './mock/LandingMocks'
import ScrollReveal from './ScrollReveal'
import { useCountUp } from '@/hooks/useCountUp'
import { useScrollReveal } from '@/hooks/useScrollReveal'

function LandingDarkCta({ startHref, isSignedIn }) {
  const { ref: scoreRef, visible: scoreVisible } = useScrollReveal({ threshold: 0.4 })
  const matchScore = useCountUp(84, { enabled: scoreVisible, duration: 2000 })

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <ScrollReveal>
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gray-900 text-white">
        <div
          className="pointer-events-none absolute top-0 right-0 w-[400px] h-[400px] opacity-30 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(159, 91, 255, 0.6) 0%, transparent 70%)',
          }}
        />

        <div className="relative grid lg:grid-cols-2 gap-10 p-8 md:p-14 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Build. Scan. Export.
              <br />
              Land your next role.
            </h2>
            <ul className="mt-8 space-y-5 text-gray-300">
              <li>
                <p className="font-bold text-white text-base">Optimized resumes</p>
                <p className="text-sm mt-1 leading-relaxed">
                  Templates and themes tuned for ATS parsers and human recruiters.
                </p>
              </li>
              <li>
                <p className="font-bold text-white text-base">Job match intelligence</p>
                <p className="text-sm mt-1 leading-relaxed">
                  Paste any listing — see score, gaps, and fixes before you apply.
                </p>
              </li>
              <li>
                <p className="font-bold text-white text-base">Interview-ready PDFs</p>
                <p className="text-sm mt-1 leading-relaxed">
                  One-click download with proper A4 pages, ready to attach or print.
                </p>
              </li>
            </ul>
            <Link
              to={startHref}
              className="mt-10 inline-flex rounded-2xl bg-white text-gray-900 font-bold text-sm px-8 py-4 hover:bg-gray-100 transition-colors"
            >
              {isSignedIn ? 'Go to dashboard' : 'Sign up today'}
            </Link>
          </div>

          <div className="relative flex items-center justify-center min-h-[280px]">
            <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-violet-600/40 to-cyan-500/30 border border-white/10" />
            <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-br from-slate-700 to-slate-900 p-8 border border-white/10 shadow-2xl">
              <div className="space-y-3 opacity-90">
                <div className="h-2 w-2/3 bg-white/20 rounded" />
                <div className="h-2 w-full bg-white/10 rounded" />
                <div className="h-2 w-5/6 bg-white/10 rounded" />
                <div className="h-2 w-full bg-white/10 rounded" />
                <div className="h-2 w-4/5 bg-white/10 rounded" />
              </div>
            </div>
            <div ref={scoreRef} className="absolute bottom-6 right-6 md:right-10">
              <MockScoreWidget score={Math.round(matchScore)} />
            </div>
          </div>
        </div>
      </div>
      </ScrollReveal>
    </section>
  )
}

export default LandingDarkCta
