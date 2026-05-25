import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function TextGlitch({
  text,
  hoverText,
  href,
  className = '',
  delay = 0,
  variant = 'default',
  as: Tag = 'h1',
}) {
  const textRef = useRef(null)
  const spanRef = useRef(null)
  const [displayHoverText, setDisplayHoverText] = useState(hoverText || text)
  const hoverIntervalRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    const loadGSAP = async () => {
      const { gsap } = await import('gsap')
      if (cancelled || !textRef.current) return

      gsap.set(textRef.current, {
        backgroundSize: '0%',
        scale: 0.95,
        opacity: 0.7,
      })

      const tl = gsap.timeline({ delay })

      tl.to(textRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }).to(
        textRef.current,
        {
          backgroundSize: '100%',
          duration: variant === 'hero' ? 1.2 : 2,
          ease: 'elastic.out(1, 0.5)',
        },
        '-=0.3',
      )
    }

    loadGSAP()
    return () => {
      cancelled = true
    }
  }, [delay, variant])

  const handleMouseEnter = () => {
    const target = hoverText || text
    let iteration = 0

    if (hoverIntervalRef.current) {
      clearInterval(hoverIntervalRef.current)
    }

    hoverIntervalRef.current = setInterval(() => {
      setDisplayHoverText(
        target
          .split('')
          .map((letter, index) => {
            if (index < iteration) return target[index]
            if (letter === ' ') return ' '
            return LETTERS[Math.floor(Math.random() * 26)]
          })
          .join(''),
      )

      if (iteration >= target.length) {
        clearInterval(hoverIntervalRef.current)
      }

      iteration += 1 / 3
    }, 30)

    if (spanRef.current) {
      spanRef.current.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
    }
  }

  const handleMouseLeave = () => {
    if (hoverIntervalRef.current) {
      clearInterval(hoverIntervalRef.current)
    }
    setDisplayHoverText(hoverText || text)

    if (spanRef.current) {
      spanRef.current.style.clipPath = 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)'
    }
  }

  useEffect(
    () => () => {
      if (hoverIntervalRef.current) {
        clearInterval(hoverIntervalRef.current)
      }
    },
    [],
  )

  const spanContent = href ? (
    <a href={href} target="_blank" rel="noreferrer" className="text-inherit no-underline">
      {displayHoverText}
    </a>
  ) : (
    displayHoverText
  )

  const isHero = variant === 'hero'

  return (
    <Tag
      ref={textRef}
      className={cn(
        'relative m-0 flex cursor-pointer flex-col justify-center overflow-hidden font-bold tracking-tight transition-all duration-500 ease-out',
        isHero
          ? 'w-full max-w-none border-0 text-left text-4xl leading-[1.1] text-gray-900/20 sm:text-5xl lg:text-[3.4rem]'
          : 'w-full max-w-[100vw] border-b border-neutral-600/20 text-[10vw] leading-none text-neutral-600/20',
        'bg-gradient-to-r bg-clip-text bg-no-repeat',
        isHero ? 'from-gray-900 to-gray-700' : 'from-neutral-700 to-neutral-500',
        className,
      )}
      style={{
        backgroundSize: '0%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        wordBreak: 'break-word',
        whiteSpace: isHero ? 'normal' : 'nowrap',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
      <span
        ref={spanRef}
        className={cn(
          'pointer-events-none absolute flex h-full w-full flex-col justify-center overflow-hidden font-bold text-black transition-all duration-400 ease-out',
          isHero ? 'items-start text-left' : 'items-center',
        )}
        style={{
          clipPath: 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)',
          transformOrigin: 'center',
          backgroundColor: '#FFFF02',
          maxWidth: '100%',
          whiteSpace: isHero ? 'normal' : 'nowrap',
        }}
      >
        {spanContent}
      </span>
    </Tag>
  )
}

export default TextGlitch
