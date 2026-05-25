import React from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import { APP_TUBE_ITEMS } from '@/components/ui/tube-light-navbar'

function Header() {
  return <SiteHeader items={APP_TUBE_ITEMS} logoSize="sm" />
}

export default Header
