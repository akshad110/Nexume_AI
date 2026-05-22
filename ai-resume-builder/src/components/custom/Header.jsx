import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import React from 'react'
import { UserButton, useUser } from '@clerk/react'

function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <img src="/logo.svg" width={30} height={30} />

      {isSignedIn ? (
        <div className="flex items-center gap-2">
          <Link to={'/dashboard'}>
          <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header
