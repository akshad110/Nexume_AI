import React from 'react'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/react'
import BrandLogo from '@/components/brand/BrandLogo'

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#process' },
  { label: 'ATS scan', to: '/ats-checker' },
  { label: 'Dashboard', to: '/dashboard' },
]

function LandingNav() {
  const { isSignedIn } = useUser()

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 pb-2">
      <div className="mx-auto max-w-6xl flex items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] px-4 py-2.5 md:px-6">
        <BrandLogo size="md" linkTo="/" />

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link
              to="/auth/sign-in"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 hover:bg-gray-800 transition-colors"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default LandingNav
