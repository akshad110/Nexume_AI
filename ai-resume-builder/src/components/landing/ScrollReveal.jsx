import React from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  as: Component = 'div',
}) {
  const { ref, visible } = useScrollReveal({ once: false })

  const offset =
    direction === 'up'
      ? 'translate-y-10'
      : direction === 'down'
        ? '-translate-y-10'
        : direction === 'left'
          ? 'translate-x-10'
          : '-translate-x-10'

  return (
    <Component
      ref={ref}
      className={cn(
        'transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
        visible ? 'opacity-100 translate-x-0 translate-y-0' : cn('opacity-0', offset),
        className,
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Component>
  )
}

export default ScrollReveal
