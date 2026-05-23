import React from 'react'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/react'
import BrandLogo from '@/components/brand/BrandLogo'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'How it works', href: '#process' },
  { label: 'ATS scan', to: '/ats-checker' },
]

function NavLinkItem({ link, className }) {
  if (link.to) {
    return (
      <Link to={link.to} className={className}>
        {link.label}
      </Link>
    )
  }
  return (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  )
}

function LandingNav() {
  const { isSignedIn } = useUser()

  const linkClass =
    'text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap'

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 pb-2">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] px-4 py-2.5 md:px-6">
        <div className="relative flex items-center justify-between gap-4">
          <BrandLogo size="md" linkTo="/" className="shrink-0" />

          {/* Desktop — links centered together in the navbar */}
          <nav
            className={cn(
              'hidden md:flex items-center justify-center gap-8',
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            )}
          >
            {NAV_LINKS.map((link) => (
              <NavLinkItem key={link.label} link={link} className={linkClass} />
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0 ml-auto">
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

        {/* Mobile — same links grouped under logo row */}
        <nav className="flex md:hidden items-center justify-center gap-5 pt-2.5 mt-2 border-t border-gray-100/80 overflow-x-auto">
          {NAV_LINKS.map((link) => (
            <NavLinkItem
              key={link.label}
              link={link}
              className={cn(linkClass, 'text-xs')}
            />
          ))}
        </nav>
      </div>
    </header>
  )
}

export default LandingNav
