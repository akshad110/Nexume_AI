import * as React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  MockAtsPanel,
  MockJobList,
  MockResumeEditor,
  MockTemplatePicker,
} from '@/components/landing/mock/LandingMocks'

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

const FeatureShowcase = React.forwardRef(function FeatureShowcase(
  {
    startHref = '/auth/sign-in',
    title = 'Everything you need to land the interview — in one workspace',
    className,
    ...props
  },
  ref,
) {
  const [active, setActive] = React.useState('builder')
  const [paused, setPaused] = React.useState(false)
  const pauseUntil = React.useRef(0)
  const content = TAB_CONTENT[active]

  const goToTab = React.useCallback((tabId) => {
    setActive((current) => (current === tabId ? current : tabId))
  }, [])

  const goNext = React.useCallback(() => {
    setActive((current) => {
      const index = TAB_IDS.indexOf(current)
      return TAB_IDS[(index + 1) % TAB_IDS.length]
    })
  }, [])

  React.useEffect(() => {
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
    <section
      ref={ref}
      id="features"
      className={cn('mx-auto max-w-6xl px-5 py-16 md:py-20', className)}
      {...props}
    >
      {title ? (
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center max-w-3xl mx-auto leading-tight">
          {title}
        </h2>
      ) : null}

      <div
        className="mt-8 flex flex-wrap justify-center gap-2"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false)
          pauseUntil.current = Date.now() + 1500
        }}
      >
        {TABS.map((tab) => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleManualTab(tab.id)}
              className={cn(
                'relative rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 overflow-hidden',
                isActive
                  ? 'bg-gray-900 text-white shadow-lg scale-[1.02]'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400',
              )}
            >
              {tab.label}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 h-0.5 bg-white/50 animate-tab-progress"
                  style={{ animationDuration: `${ROTATE_MS}ms` }}
                />
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-8">
        <div
          className={cn(
            'rounded-[2rem] border border-gray-200/60 p-6 md:p-10 bg-gradient-to-br shadow-inner',
            content.gradient,
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className="grid lg:grid-cols-2 gap-10 items-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{content.title}</h3>
                <ul className="mt-6 space-y-4">
                  {content.bullets.map((bullet, i) => (
                    <motion.li
                      key={bullet}
                      className="flex gap-3 text-gray-700"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gray-900" />
                      <span className="text-base leading-relaxed">{bullet}</span>
                    </motion.li>
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
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-1.5">
            {TAB_IDS.map((id) => (
              <button
                key={id}
                type="button"
                aria-label={`Show ${id}`}
                onClick={() => handleManualTab(id)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  active === id
                    ? 'w-8 bg-gray-900'
                    : 'w-1.5 bg-gray-300 hover:bg-gray-500',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

FeatureShowcase.displayName = 'FeatureShowcase'

export { FeatureShowcase, TAB_CONTENT, TABS, TAB_IDS }
