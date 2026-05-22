import { Link, NavLink } from 'react-router-dom'
import { Button } from '../ui/button'
import React from 'react'
import { UserButton, useUser } from '@clerk/react'
import { cn } from '@/lib/utils'
import BrandLogo from '@/components/brand/BrandLogo'

const NAV_LINKS = [
  { label: 'Home', path: '/', end: true },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'ATS Checker', path: '/ats-checker' },
  { label: 'Generate with AI', path: '/generate-with-ai' },
]

function Header() {
  const { isSignedIn } = useUser()

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-5">
        <BrandLogo size="sm" linkTo="/" />

        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium tracking-wide transition-colors',
                  isActive
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-800',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link to="/auth/sign-in">
              <Button size="sm">Get Started</Button>
            </Link>
          )}
        </div>
      </div>

      <nav className="flex items-center justify-center gap-5 overflow-x-auto border-t px-4 py-2 md:hidden">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.end}
            className={({ isActive }) =>
              cn(
                'whitespace-nowrap text-xs font-medium transition-colors',
                isActive ? 'text-gray-900' : 'text-gray-500',
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header
