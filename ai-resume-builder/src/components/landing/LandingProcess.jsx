import React from 'react'
import { MockAtsPanel, MockResumeEditor, MockTemplatePicker } from './mock/LandingMocks'
import ScrollReveal from './ScrollReveal'

const CARDS = [
  {
    title: 'Pick your template',
    body: 'Classic, professional, or modern — start with structure that recruiters expect.',
    mock: <MockTemplatePicker />,
  },
  {
    title: 'Edit with live preview',
    body: 'Fill each section once. See exactly how your resume looks on paper.',
    mock: <MockResumeEditor />,
  },
  {
    title: 'Scan & download',
    body: 'Compare against the job post, fix gaps, export your PDF in one click.',
    mock: <MockAtsPanel />,
  },
]

function LandingProcess() {
  return (
    <section id="process" className="bg-white border-y border-gray-100">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center max-w-2xl mx-auto">
            Go from blank page to application-ready in a few steps
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="text-center text-gray-600 mt-3 max-w-lg mx-auto">
            NEXUME AI guides you through building, checking, and shipping — no chaos, no
            guesswork.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <ScrollReveal key={card.title} delay={150 + i * 100}>
              <article className="h-full rounded-[1.75rem] border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-6 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                <div className="min-h-[140px] flex items-center justify-center mb-5">
                  {card.mock}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{card.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LandingProcess
