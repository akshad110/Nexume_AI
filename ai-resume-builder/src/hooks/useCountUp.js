import { useEffect, useState } from 'react'

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

export function useCountUp(target, { duration = 1800, enabled = true, decimals = 0 } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setValue(0)
      return undefined
    }

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced) {
      setValue(target)
      return undefined
    }

    let start = null
    let frame = null
    let cancelled = false

    setValue(0)

    const step = (timestamp) => {
      if (cancelled) return
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = easeOutCubic(progress)
      setValue(Number((target * eased).toFixed(decimals)))
      if (progress < 1) {
        frame = requestAnimationFrame(step)
      }
    }

    frame = requestAnimationFrame(step)

    return () => {
      cancelled = true
      if (frame) cancelAnimationFrame(frame)
    }
  }, [target, duration, enabled, decimals])

  return value
}
