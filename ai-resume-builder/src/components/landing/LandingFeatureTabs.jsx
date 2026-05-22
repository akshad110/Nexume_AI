import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import ScrollReveal from './ScrollReveal'
import {
  MockAtsPanel,
  MockJobList,
  MockResumeEditor,
  MockTemplatePicker,
} from './mock/LandingMocks'

const TAB_IDS = ['builder', 'ats', 'templates', 'export']

const TABS = [
  { id: 'builder', label: 'Resume builder' },
  { id: 'ats', label: 'ATS intelligence' },
  { id: 'templates', label: 'Templates' },
  { id: 'export', label: 'PDF export' },
]

const TAB_CONTENT = {
  builder: {
    title: 'Build section by section',
    bullets: [
      'Live A4 preview as you type',
      'Personal, experience, education & skills',
      'Autosave to your workspace',
    ],
    gradient: 'from-emerald-50 via-teal-50 to-cyan-50',
    mock: 'editor',
  },
  ats: {
    title: 'Match any job posting',
    bullets: [
      'Upload PDF or paste job description',
      'Keyword gaps & role fit analysis',
      'Actionable rewrite suggestions',
    ],
    gradient: 'from-violet-50 via-purple-50 to-fuchsia-50',
    mock: 'ats',
  },
  templates: {
    title: 'Three pro layouts',
    bullets: [
      'Classic, Professional & Modern',
      'Theme colors in one click',
      'Designed for ATS readability',
    ],
    gradient: 'from-amber-50 via-orange-50 to-rose-50',
    mock: 'templates',
  },
  export: {
    title: 'Print-ready PDFs',
    bullets: [
      'True A4 pagination',
      'Download from preview',
      'Share with recruiters instantly',
    ],
    gradient: 'from-sky-50 via-blue-50 to-indigo-50',
    mock: 'jobs',
  },
}

const ROTATE_MS = 5000
const FADE_MS = 400

function FeatureMock({ type }) {
  return (
    <div className="w-full max-w-md mx-auto">
      {type === 'editor' && <MockResumeEditor />}
      {type === 'ats' && <MockAtsPanel />}
      {type === 'templates' && <MockTemplatePicker />}
      {type === 'jobs' && <MockJobList />}
    </div>
  )
}

function LandingFeatureTabs({ startHref }) {
  const [active, setActive] = useState('builder')
  const [contentVisible, setContentVisible] = useState(true)
  const [paused, setPaused] = useState(false)
  const pauseUntil = useRef(0)
  const activeIndex = TAB_IDS.indexOf(active)
  const content = TAB_CONTENT[active]

  const goToTab = useCallback((tabId) => {
    if (tabId === active) return
    setContentVisible(false)
    window.setTimeout(() => {
      setActive(tabId)
      setContentVisible(true)
    }, FADE_MS)
  }, [active])

  const goNext = useCallback(() => {
    const next = TAB_IDS[(activeIndex + 1) % TAB_IDS.length]
    goToTab(next)
  }, [activeIndex, goToTab])

  useEffect(() => {
    if (paused) return undefined

    const tick = window.setInterval(() => {
      if (Date.now() < pauseUntil.current) return
      goNext()
    }, ROTATE_MS)

    return () => window.clearInterval(tick)
  }, [paused, goNext])

  const handleManualTab = (tabId) => {
    pauseUntil.current = Date.now() + ROTATE_MS * 2
    goToTab(tabId)
  }

  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center max-w-3xl mx-auto leading-tight">
          Everything you need to land the interview — in one workspace
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={120} className="mt-8">
        <div
          className="flex flex-wrap justify-center gap-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false)
            pauseUntil.current = Date.now() + 1500
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleManualTab(tab.id)}
              className={cn(
                'relative rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 overflow-hidden',
                active === tab.id
                  ? 'bg-gray-900 text-white shadow-lg scale-[1.02]'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400',
              )}
            >
              {tab.label}
              {active === tab.id && (
                <span
                  className="absolute bottom-0 left-0 h-0.5 bg-white/50 animate-tab-progress"
                  style={{ animationDuration: `${ROTATE_MS}ms` }}
                />
              )}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200} className="mt-8">
        <div
          className={cn(
            'rounded-[2rem] border border-gray-200/60 p-6 md:p-10 bg-gradient-to-br shadow-inner transition-all duration-500',
            content.gradient,
          )}
        >
          <div
            className={cn(
              'grid lg:grid-cols-2 gap-10 items-center transition-all duration-[400ms] ease-out',
              contentVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3',
            )}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{content.title}</h3>
              <ul className="mt-6 space-y-4">
                {content.bullets.map((b, i) => (
                  <li
                    key={b}
                    className="flex gap-3 text-gray-700 transition-all duration-500"
                    style={{
                      transitionDelay: contentVisible ? `${80 + i * 60}ms` : '0ms',
                      opacity: contentVisible ? 1 : 0,
                      transform: contentVisible
                        ? 'translateX(0)'
                        : 'translateX(-8px)',
                    }}
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gray-900" />
                    <span className="text-base leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={startHref}
                className="mt-8 inline-flex rounded-2xl bg-gray-900 text-white font-bold text-sm px-6 py-3.5 hover:bg-gray-800 transition-colors"
              >
                Start for free
              </Link>
            </div>

            <div className="relative min-h-[220px] flex items-center justify-center">
              <FeatureMock type={content.mock} />
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-1.5">
            {TAB_IDS.map((id) => (
              <button
                key={id}
                type="button"
                aria-label={`Show ${id}`}
                onClick={() => handleManualTab(id)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  active === id ? 'w-8 bg-gray-900' : 'w-1.5 bg-gray-300 hover:bg-gray-500',
                )}
              />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

export default LandingFeatureTabs
