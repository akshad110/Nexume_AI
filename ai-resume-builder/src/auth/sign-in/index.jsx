import { SignIn } from '@clerk/react'
import React from 'react'
import BrandLogo from '@/components/brand/BrandLogo'

function SignInPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <div className="flex justify-center pt-10 pb-4">
        <BrandLogo size="md" linkTo="/" />
      </div>
      <div className="flex flex-1 justify-center items-center px-4 pb-16">
        <SignIn />
      </div>
    </div>
  )
}

export default SignInPage
