import React from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import { useCountUp } from '@/hooks/useCountUp'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import UserAvatars, { HERO_SOCIAL_USERS } from '@/components/ui/user-avatars'
import { cn } from '@/lib/utils'
import TextRoll from '@/components/ui/text-roll'

const HERO_HEADING_CLASS =
  'cursor-pointer max-w-full font-extrabold leading-[1.15] tracking-tight whitespace-nowrap text-[clamp(1.1rem,3.9vw,3.4rem)] text-gray-900 md:text-5xl lg:text-[3.4rem]'

const HERO_GRADIENT_CLASS =
  'cursor-pointer max-w-full font-extrabold leading-[1.15] tracking-tight whitespace-nowrap text-[clamp(1.1rem,3.9vw,3.4rem)] md:text-5xl lg:text-[3.4rem]'

function LandingHero({ startHref, isSignedIn }) {
  const { ref: countRef, visible: countVisible } = useScrollReveal({ threshold: 0.5 })
  const resumeCount = useCountUp(2000, { enabled: countVisible, duration: 2200 })

  return (
    <section className="relative z-10 flex flex-1 flex-col justify-center overflow-x-hidden pb-12 pt-4 sm:pb-16 md:pb-24 md:pt-0">
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-5">
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)] lg:gap-12 xl:gap-16">
          <div className="relative z-10 min-w-0 text-center lg:pr-4 lg:text-left xl:pr-8">
            <ScrollReveal delay={0}>
            <div className="mx-auto mb-5 inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 text-xs shadow-sm backdrop-blur sm:mb-6 sm:px-4 sm:text-sm lg:mx-0 lg:justify-start">
              <span className="shrink-0 font-bold text-amber-500">★★★★★</span>
              <span className="text-center text-gray-600 lg:text-left">
                <strong className="text-gray-900">4.9</strong> rating · trusted by job
                seekers
              </span>
            </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
            <h1 className="sr-only">
              The Resume platform for serious applicants
            </h1>
            <div
              className="mx-auto flex w-full min-w-0 max-w-full flex-col items-center gap-0.5 lg:mx-0 lg:items-start"
              aria-hidden
            >
              <TextRoll
                center
                text="The Resume platform"
                className={HERO_HEADING_CLASS}
              />
              <div className="flex w-full max-w-full flex-wrap items-baseline justify-center lg:flex-nowrap lg:justify-start">
                <TextRoll
                  center
                  inline
                  text="for serious "
                  className={HERO_HEADING_CLASS}
                />
                <TextRoll
                  center
                  inline
                  text="applicants"
                  gradient
                  className={HERO_GRADIENT_CLASS}
                />
              </div>
            </div>
            </ScrollReveal>

            <ScrollReveal delay={160}>
            <p className="mx-auto mt-4 max-w-xl break-words text-base leading-relaxed text-gray-600 sm:mt-5 sm:text-lg lg:mx-0">
              Build polished resumes, run instant ATS checks against any job post,
              and export print-perfect PDFs — without juggling five different tools.
            </p>
            </ScrollReveal>

            <ScrollReveal delay={240}>
            <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to={startHref}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-gray-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-gray-900/20 transition-all hover:-translate-y-0.5 hover:bg-gray-800 sm:w-auto sm:px-8 sm:py-4"
              >
                {isSignedIn ? 'Open workspace' : 'Start free'}
              </Link>
              <a
                href="#features"
                className="inline-flex w-full items-center justify-center rounded-2xl border-2 border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition-all hover:border-gray-400 sm:w-auto sm:px-8 sm:py-4"
              >
                See how it works
              </a>
            </div>
            </ScrollReveal>

            <ScrollReveal delay={320}>
            <div
              ref={countRef}
              className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4 lg:justify-start"
            >
              <UserAvatars
                users={HERO_SOCIAL_USERS}
                size={36}
                maxVisible={5}
                overlap={55}
                focusScale={1.15}
              />
              <p className="text-center text-sm text-gray-600 sm:text-left">
                <strong className="text-gray-900 tabular-nums">
                  {resumeCount.toLocaleString()}+
                </strong>{' '}
                resumes created this month
              </p>
            </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
            <ul className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-600 sm:mt-8 sm:gap-x-6 lg:justify-start">
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

          <ScrollReveal
            delay={200}
            direction="left"
            className="relative z-0 mt-2 w-full min-w-0 sm:mt-4 lg:mt-0 lg:pl-6 xl:pl-10"
          >
          <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0 lg:max-w-[24rem] lg:translate-x-3 xl:max-w-[26rem] xl:translate-x-6">
            <div className="relative bg-transparent p-0">
              <img
                src="/recruitment-ezgif.com-gif-maker.gif"
                alt="Recruitment and resume search illustration"
                className="mx-auto h-auto w-full max-w-[280px] object-contain mix-blend-screen sm:max-w-[320px] lg:max-w-full"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default LandingHero
