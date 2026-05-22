import React from 'react'
import { useUser } from '@clerk/react'
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
    <div className="min-h-screen bg-[#fafafa] flex flex-col overflow-x-hidden">
      <LandingNav />

      <main className="flex-1">
        <LandingHero startHref={startHref} isSignedIn={isSignedIn} />
        <LandingTrust />
        <LandingFeatureTabs startHref={startHref} />
        <LandingProcess />
        <LandingStats />
        <LandingDarkCta startHref={startHref} isSignedIn={isSignedIn} />
      </main>

      <LandingFooter />
    </div>
  )
}

export default Home
