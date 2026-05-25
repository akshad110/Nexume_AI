import React from 'react'
import { useUser } from '@clerk/react'
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect'
import LandingNav from '@/components/landing/LandingNav'
import LandingHero from '@/components/landing/LandingHero'
import LandingTrust from '@/components/landing/LandingTrust'
import LandingFeatureTabs from '@/components/landing/LandingFeatureTabs'
import LandingProcess from '@/components/landing/LandingProcess'
import LandingStats from '@/components/landing/LandingStats'
import LandingDarkCta from '@/components/landing/LandingDarkCta'
import LandingFooter from '@/components/landing/LandingFooter'

function Home() {
  const { isSignedIn } = useUser()
  const startHref = isSignedIn ? '/dashboard' : '/auth/sign-in'

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-[#fafafa]">
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-white">
        <BackgroundRippleEffect cols={36} className="z-[1]" />
        <LandingNav />
        <LandingHero startHref={startHref} isSignedIn={isSignedIn} />
      </div>

      <main className="flex-1">
        <LandingTrust />
        <LandingFeatureTabs startHref={startHref} />
        <LandingProcess />
        <LandingStats />
        <LandingDarkCta />
      </main>

      <LandingFooter />
    </div>
  )
}

export default Home
