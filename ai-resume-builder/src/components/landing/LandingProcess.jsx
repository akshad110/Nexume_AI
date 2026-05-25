import React from 'react'
import { useUser } from '@clerk/react'
import {
  MockAtsPanel,
  MockResumeEditor,
  MockTemplatePicker,
} from './mock/LandingMocks'
import ScrollReveal from './ScrollReveal'
import CardFlip from '@/components/ui/flip-card'
import { LayoutTemplate, ScanSearch } from '@/components/ui/flip-card'

const CARDS = [
  {
    title: 'Pick your template',
    subtitle: 'Structure recruiters expect',
    description:
      'Classic, professional, or modern — start with structure that recruiters expect and switch layouts anytime.',
    features: [
      'Classic, Professional & Modern',
      'Theme colors in one click',
      'ATS-friendly layouts',
      'Live preview while editing',
    ],
    color: '#7c3aed',
    frontContent: <MockTemplatePicker />,
    frontIcon: LayoutTemplate,
    ctaHref: '/dashboard',
  },
  {
    title: 'Edit with live preview',
    subtitle: 'See your resume on paper',
    description:
      'Fill each section once. See exactly how your resume looks on paper with real-time A4 pagination.',
    features: [
      'Personal & experience sections',
      'Education, skills & projects',
      'Rich text bullet points',
      'Autosave to your workspace',
    ],
    color: '#9f5bff',
    frontContent: <MockResumeEditor />,
    ctaHref: '/dashboard',
  },
  {
    title: 'Scan & download',
    subtitle: 'Match the job, ship your PDF',
    description:
      'Compare against the job post, fix gaps, and export a print-ready PDF in one click.',
    features: [
      'ATS match score',
      'Keyword gap analysis',
      'Role-fit suggestions',
      'One-click PDF export',
    ],
    color: '#06b6d4',
    frontContent: <MockAtsPanel />,
    frontIcon: ScanSearch,
    ctaHref: '/ats-checker',
  },
]

function LandingProcess() {
  const { isSignedIn } = useUser()
  const startHref = isSignedIn ? '/dashboard' : '/auth/sign-in'

  return (
    <section id="process" className="border-y border-gray-100 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <ScrollReveal>
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
            Go from blank page to application-ready in a few steps
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="mx-auto mt-3 max-w-lg text-center text-gray-600">
            NEXUME AI guides you through building, checking, and shipping — no chaos, no
            guesswork.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {CARDS.map((card, i) => (
            <ScrollReveal key={card.title} delay={150 + i * 100}>
              <CardFlip
                title={card.title}
                subtitle={card.subtitle}
                description={card.description}
                features={card.features}
                color={card.color}
                frontContent={card.frontContent}
                frontIcon={card.frontIcon}
                ctaHref={card.ctaHref || startHref}
                ctaLabel="Start for free"
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LandingProcess
