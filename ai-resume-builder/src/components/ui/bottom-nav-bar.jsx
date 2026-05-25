import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, LayoutGrid, ScanSearch, Sparkles, Workflow } from 'lucide-react'
import { cn } from '@/lib/utils'

function labelWidth(label) {
  return Math.min(148, Math.max(80, Math.ceil(label.length * 7.2) + 16))
}

export const LANDING_NAV_ITEMS = [
  { label: 'Features', icon: Sparkles, href: '#features' },
  { label: 'Dashboard', icon: LayoutGrid, to: '/dashboard' },
  { label: 'How it works', icon: Workflow, href: '#process' },
  { label: 'ATS scan', icon: ScanSearch, to: '/ats-checker' },
]

export const APP_NAV_ITEMS = [
  { label: 'Home', icon: Sparkles, to: '/' },
  { label: 'Dashboard', icon: LayoutGrid, to: '/dashboard' },
  { label: 'ATS Checker', icon: ScanSearch, to: '/ats-checker' },
  { label: 'Generate with AI', icon: Brain, to: '/generate-with-ai' },
]

function getActiveIndex(items, pathname, hash) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.to && item.to !== '/') {
      if (pathname === item.to || pathname.startsWith(`${item.to}/`)) return i
    }
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.href?.startsWith('#') && hash === item.href) return i
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.to === '/' && pathname === '/') return i
  }

  return 0
}

export function BottomNavBar({
  items = LANDING_NAV_ITEMS,
  className,
  defaultIndex = 0,
  stickyBottom = false,
  wide = false,
  onItemClick,
}) {
  const location = useLocation()
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  useEffect(() => {
    setActiveIndex(getActiveIndex(items, location.pathname, location.hash))
  }, [items, location.pathname, location.hash])

  const handleSelect = (idx) => {
    setActiveIndex(idx)
    onItemClick?.(idx, items[idx])
  }

  return (
    <motion.nav
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        'flex h-[56px] items-center rounded-full border border-border bg-white/90 p-2 shadow-xl backdrop-blur-md dark:border-sidebar-border dark:bg-card',
        wide
          ? 'w-full max-w-5xl justify-between gap-1 px-3'
          : 'min-w-[320px] max-w-[95vw] space-x-1',
        stickyBottom && 'fixed inset-x-0 bottom-4 z-20 mx-auto w-fit',
        className,
      )}
    >
      {items.map((item, idx) => {
        const Icon = item.icon
        const isActive = activeIndex === idx
        const expandedWidth = labelWidth(item.label)

        const buttonClass = cn(
          'relative flex h-10 max-h-[44px] min-h-[40px] min-w-[44px] items-center gap-0 rounded-full px-3 py-2 transition-colors duration-200',
          wide && 'flex-1 justify-center min-w-0 max-w-[200px]',
          isActive
            ? 'gap-2 bg-primary/10 text-primary dark:bg-primary/15'
            : 'bg-transparent text-muted-foreground hover:bg-muted',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
        )

        const inner = (
          <>
            <Icon size={22} strokeWidth={2} aria-hidden className="shrink-0" />
            <motion.div
              initial={false}
              animate={{
                width: isActive ? `${expandedWidth}px` : '0px',
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? '8px' : '0px',
              }}
              transition={{
                width: { type: 'spring', stiffness: 350, damping: 32 },
                opacity: { duration: 0.19 },
                marginLeft: { duration: 0.19 },
              }}
              className="flex items-center overflow-hidden"
              style={{ maxWidth: expandedWidth }}
            >
              <span
                className={cn(
                  'select-none overflow-hidden text-ellipsis whitespace-nowrap text-xs font-semibold leading-tight sm:text-sm',
                  isActive ? 'text-primary' : 'opacity-0',
                )}
                title={item.label}
              >
                {item.label}
              </span>
            </motion.div>
          </>
        )

        if (item.to) {
          return (
            <motion.div
              key={item.label}
              whileTap={{ scale: 0.97 }}
              className={cn(wide && 'flex flex-1 justify-center min-w-0')}
            >
              <Link
                to={item.to}
                className={buttonClass}
                aria-label={item.label}
                onClick={() => handleSelect(idx)}
              >
                {inner}
              </Link>
            </motion.div>
          )
        }

        return (
          <motion.a
            key={item.label}
            href={item.href}
            whileTap={{ scale: 0.97 }}
            className={cn(buttonClass, wide && 'flex-1 justify-center min-w-0')}
            aria-label={item.label}
            onClick={() => handleSelect(idx)}
          >
            {inner}
          </motion.a>
        )
      })}
    </motion.nav>
  )
}

export default BottomNavBar
