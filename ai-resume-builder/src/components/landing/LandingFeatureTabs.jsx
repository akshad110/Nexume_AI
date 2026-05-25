import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import TextRoll from '@/components/ui/text-roll'

const PILLAR_LABELS = [
  'Resume builder',
  'ATS intelligence',
  'Templates',
  'PDF export',
]

const featureCardsData = [
  {
    title: 'Resume builder',
    description:
      'Build section by section with live A4 preview. Add personal details, experience, education, skills, and custom sections in one clean flow.',
    link: '/dashboard',
    background:
      'linear-gradient(90deg, hsla(233, 100%, 90%, 1) 0%, hsla(0, 0%, 89%, 1) 100%)',
    textClass: 'text-slate-900',
    rotation: 'rotate-6',
  },
  {
    title: 'ATS intelligence',
    description:
      'Match any job posting with keyword gap analysis, role-fit insights, and actionable rewrite suggestions before you apply.',
    link: '/ats-checker',
    background:
      'linear-gradient(90deg, hsla(197, 14%, 57%, 1) 0%, hsla(192, 17%, 94%, 1) 100%)',
    textClass: 'text-slate-900',
    rotation: 'rotate-0',
  },
  {
    title: 'Templates',
    description:
      'Choose from Classic, Professional, and Modern layouts with editable sections and color themes designed for ATS readability.',
    link: '/dashboard',
    background:
      'linear-gradient(90deg, hsla(248, 21%, 15%, 1) 0%, hsla(250, 14%, 61%, 1) 100%)',
    textClass: 'text-white',
    rotation: '-rotate-6',
  },
  {
    title: 'PDF export',
    description:
      'Generate print-ready, paginated A4 PDFs that match your preview, so your resume looks polished for recruiters and hiring managers.',
    link: '/dashboard',
    background: '#f2fcfe',
    textClass: 'text-slate-900',
    rotation: 'rotate-0',
  },
]

function LandingFeatureTabs({ startHref = '/auth/sign-in' }) {
  return (
    <section id="features" className="relative w-full bg-white text-gray-900">
      {/* Intro — scrolls away, then cards stack */}
      <div className="relative z-0">
        <section className="relative h-screen w-full grid place-content-center sticky top-0 bg-white">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#fff_70%,transparent_100%)]" />
          <h2 className="relative z-10 px-8 text-center text-4xl font-semibold tracking-tight leading-[120%] text-gray-900 md:text-5xl 2xl:text-6xl">
            Everything you need to land the interview
            <br />
            in one workspace scroll down
          </h2>
        </section>
      </div>

      {/* Stacking cards — each sticks on top of the previous */}
      <section className="relative w-full bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-0 px-5 lg:flex-row lg:justify-between lg:px-16">
          <div className="relative w-full lg:w-[55%]">
            {featureCardsData.map((card, index) => (
              <figure
                key={card.title}
                className="sticky top-0 flex h-screen items-center justify-center"
                style={{ zIndex: index + 1 }}
              >
                <article
                  className={cn(
                    'grid h-72 w-full max-w-[30rem] place-content-center gap-4 rounded-lg p-6 shadow-2xl',
                    card.textClass,
                    card.rotation,
                  )}
                  style={{ background: card.background }}
                >
                  <h3 className="text-2xl font-semibold">{card.title}</h3>
                  <p className="text-sm leading-relaxed opacity-90">{card.description}</p>
                  <Link
                    to={card.link}
                    className={cn(
                      'w-fit cursor-pointer rounded-md p-3 text-sm font-semibold transition-colors',
                      card.textClass === 'text-white'
                        ? 'bg-white text-slate-900 hover:bg-white/90'
                        : 'bg-black text-white hover:bg-black/90',
                    )}
                  >
                    Open feature
                  </Link>
                </article>
              </figure>
            ))}
          </div>

          <div
            className="sticky top-0 hidden h-screen items-center justify-center lg:flex lg:w-[40%]"
            style={{ zIndex: featureCardsData.length + 2 }}
          >
            <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-4">
                Four pillars
              </p>
              <ul className="flex flex-col items-center gap-1 px-4">
                {PILLAR_LABELS.map((label) => (
                  <li
                    key={label}
                    className="relative flex cursor-pointer flex-col items-center overflow-visible"
                  >
                    <TextRoll
                      center
                      text={label}
                      className="block cursor-pointer text-4xl font-extrabold leading-[0.8] tracking-[-0.03em] text-gray-900 transition-colors lg:text-5xl"
                    />
                  </li>
                ))}
              </ul>
              <Link
                to={startHref}
                className="mx-auto mt-8 block w-fit rounded-md bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-800 transition-colors"
              >
                Start for free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default LandingFeatureTabs
