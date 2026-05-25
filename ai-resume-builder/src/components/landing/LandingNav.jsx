import React from 'react'
import SiteHeader from '@/components/layout/SiteHeader'
import { LANDING_TUBE_ITEMS } from '@/components/ui/tube-light-navbar'

function LandingNav() {
  return <SiteHeader items={LANDING_TUBE_ITEMS} logoSize="md" />
}

export default LandingNav
