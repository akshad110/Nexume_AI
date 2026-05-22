import React from 'react'
import ScrollReveal from './ScrollReveal'

const LOGOS = ['Google', 'Meta', 'Stripe', 'Airbnb', 'Shopify', 'Notion']

function LandingTrust() {
  return (
    <section className="border-y border-gray-100 bg-white/50 py-10">
      <ScrollReveal className="mx-auto max-w-6xl px-5 text-center">
        <p className="text-sm font-semibold text-gray-500">
          Built for candidates targeting top companies
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {LOGOS.map((name) => (
            <span
              key={name}
              className="text-lg md:text-xl font-bold text-gray-300 select-none tracking-tight"
            >
              {name}
            </span>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}

export default LandingTrust
