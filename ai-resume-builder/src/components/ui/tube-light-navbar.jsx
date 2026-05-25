import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, LayoutGrid, ScanSearch, Sparkles, Workflow } from 'lucide-react'
import { cn } from '@/lib/utils'

export const LANDING_TUBE_ITEMS = [
  { name: 'Features', url: '#features', icon: Sparkles },
  { name: 'Dashboard', url: '/dashboard', icon: LayoutGrid },
  { name: 'How it works', url: '#process', icon: Workflow },
  { name: 'ATS scan', url: '/ats-checker', icon: ScanSearch },
]

export const APP_TUBE_ITEMS = [
  { name: 'Home', url: '/', icon: Sparkles },
  { name: 'Dashboard', url: '/dashboard', icon: LayoutGrid },
  { name: 'ATS Checker', url: '/ats-checker', icon: ScanSearch },
  { name: 'Generate with AI', url: '/generate-with-ai', icon: Brain },
]

function getActiveName(items, pathname, hash) {
  for (const item of items) {
    if (item.url.startsWith('/') && item.url !== '/') {
      if (pathname === item.url || pathname.startsWith(`${item.url}/`)) {
        return item.name
      }
    }
  }

  for (const item of items) {
    if (item.url.startsWith('#') && hash === item.url) {
      return item.name
    }
  }

  for (const item of items) {
    if (item.url === '/' && pathname === '/') {
      return item.name
    }
  }

  return items[0]?.name ?? ''
}

function NavLinkItem({ item, isActive, onSelect }) {
  const Icon = item.icon

  const className = cn(
    'relative flex cursor-pointer items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4',
    'text-gray-400 hover:text-white',
    isActive && 'text-white',
  )

  const content = (
    <>
      <span className="hidden md:inline">{item.name}</span>
      <span className="md:hidden">
        <Icon size={15} strokeWidth={2.5} aria-hidden />
      </span>
      {isActive && (
        <motion.div
          layoutId="tube-lamp"
          className="absolute inset-0 -z-10 w-full rounded-full bg-white/10"
          initial={false}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        >
          <div className="absolute -top-1.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-t-full bg-primary">
            <div className="absolute -left-1.5 -top-1.5 h-4 w-8 rounded-full bg-primary/30 blur-md" />
            <div className="absolute -top-0.5 h-4 w-6 rounded-full bg-primary/25 blur-md" />
            <div className="absolute left-1.5 top-0 h-2.5 w-2.5 rounded-full bg-primary/20 blur-sm" />
          </div>
        </motion.div>
      )}
    </>
  )

  if (item.url.startsWith('/')) {
    return (
      <Link to={item.url} className={className} onClick={() => onSelect(item.name)}>
        {content}
      </Link>
    )
  }

  return (
    <a href={item.url} className={className} onClick={() => onSelect(item.name)}>
      {content}
    </a>
  )
}

export function TubeLightNavBar({
  items = APP_TUBE_ITEMS,
  className,
  wide = false,
  embedded = true,
}) {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(items[0]?.name ?? '')

  useEffect(() => {
    setActiveTab(getActiveName(items, location.pathname, location.hash))
  }, [items, location.pathname, location.hash])

  const pill = (
    <div
      className={cn(
        'flex items-center gap-0.5 rounded-full border border-black bg-black px-0.5 py-0.5 shadow-lg',
        wide ? 'mx-auto w-fit max-w-2xl' : 'w-max',
      )}
    >
      {items.map((item) => (
        <NavLinkItem
          key={item.name}
          item={item}
          isActive={activeTab === item.name}
          onSelect={setActiveTab}
        />
      ))}
    </div>
  )

  if (embedded) {
    return <div className={cn('flex h-max justify-center', className)}>{pill}</div>
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-1/2 z-[200] mb-6 h-max -translate-x-1/2 sm:top-0 sm:pt-6',
        className,
      )}
    >
      {pill}
    </div>
  )
}

export default TubeLightNavBar
