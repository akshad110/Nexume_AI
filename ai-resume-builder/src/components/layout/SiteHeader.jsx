import React from 'react'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/react'
import BrandLogo from '@/components/brand/BrandLogo'
import { Button } from '@/components/ui/button'
import TubeLightNavBar from '@/components/ui/tube-light-navbar'
import { cn } from '@/lib/utils'

function SiteHeader({ items, logoSize = 'md', className }) {
  const { isSignedIn } = useUser()

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[200] border-b border-gray-200/60 bg-white/85 backdrop-blur-md',
          className,
        )}
      >
        <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-5">
          <div className="flex w-[100px] shrink-0 items-center sm:w-[120px]">
            <BrandLogo size={logoSize} linkTo="/" />
          </div>

          <div className="flex min-w-0 flex-1 justify-center px-1 sm:px-4">
            <TubeLightNavBar items={items} embedded />
          </div>

          <div className="flex w-[100px] shrink-0 items-center justify-end sm:w-[120px]">
            {isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'h-9 w-9',
                  },
                }}
              />
            ) : (
              <Link to="/auth/sign-in">
                <Button size="sm" className="h-9 rounded-full px-4 text-xs font-semibold">
                  Log in
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Spacer so page content sits below fixed header */}
      <div className="h-[60px] shrink-0" aria-hidden />
    </>
  )
}

export default SiteHeader
