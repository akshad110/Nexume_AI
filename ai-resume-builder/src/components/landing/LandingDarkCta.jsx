import React from 'react'
import TextMarquee from '@/components/ui/text-marquee'

const MARQUEE_CLASS =
  'font-bold tracking-[-0.07em] leading-[90%]'

function LandingDarkCta() {
  return (
    <section className="overflow-hidden bg-white py-16 md:py-24">
      <div className="flex flex-col gap-2 md:gap-4">
        <TextMarquee
          delay={500}
          baseVelocity={-1.5}
          clasname={MARQUEE_CLASS}
        >
          Build. Scan. Export. Land your next role.
        </TextMarquee>
        <TextMarquee
          delay={500}
          baseVelocity={1.5}
          clasname={MARQUEE_CLASS}
        >
          Paste any listing, see score, gaps, and fixes before you apply.
        </TextMarquee>
      </div>
    </section>
  )
}

export default LandingDarkCta
