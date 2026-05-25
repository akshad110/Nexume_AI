import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/utils'

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function scrambleWord(word, progress) {
  return word
    .split('')
    .map((char, index) => {
      if (char === ' ') return ' '
      if (index < progress) return char
      return CHARSET[Math.floor(Math.random() * CHARSET.length)]
    })
    .join('')
}

function normalizeWord(entry) {
  if (typeof entry === 'string') {
    return { text: entry, revealedClassName: '', encryptedClassName: '' }
  }
  return {
    text: entry.text,
    revealedClassName: entry.revealedClassName ?? '',
    encryptedClassName: entry.encryptedClassName ?? '',
  }
}

function RevealWord({
  word,
  globalIndex,
  activeIndex,
  revealedClassName,
  encryptedClassName,
}) {
  const isRevealed = globalIndex < activeIndex
  const isActive = globalIndex === activeIndex
  const isVisible = isRevealed || isActive
  const [display, setDisplay] = useState(word)

  useEffect(() => {
    if (isRevealed) {
      setDisplay(word)
      return undefined
    }

    if (!isActive) {
      setDisplay(word)
      return undefined
    }

    let progress = 0
    setDisplay(scrambleWord(word, 0))

    const interval = setInterval(() => {
      progress += 0.45
      if (progress >= word.length) {
        clearInterval(interval)
        setDisplay(word)
        return
      }
      setDisplay(scrambleWord(word, progress))
    }, 35)

    return () => clearInterval(interval)
  }, [isActive, isRevealed, word])

  const text = isActive ? display : word

  return (
    <motion.span
      className={cn(
        'inline-block',
        isVisible
          ? isRevealed
            ? revealedClassName
            : encryptedClassName
          : 'text-gray-900',
      )}
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 12,
        filter: isVisible ? 'blur(0px)' : 'blur(4px)',
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-hidden={!isVisible}
    >
      {text}
    </motion.span>
  )
}

/**
 * Multi-line headline with word-by-word scramble + reveal.
 */
export function WordRevealText({
  lines = [],
  className,
  wordDelayMs = 150,
  startDelayMs = 200,
}) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-8% 0px' })
  const [activeIndex, setActiveIndex] = useState(-1)

  const totalWords = useMemo(
    () => lines.reduce((sum, line) => sum + (line.words?.length ?? 0), 0),
    [lines],
  )

  useEffect(() => {
    if (!isInView || totalWords === 0) return undefined

    let intervalId = null
    let current = 0

    const startTimer = setTimeout(() => {
      setActiveIndex(0)

      intervalId = setInterval(() => {
        current += 1
        if (current >= totalWords) {
          clearInterval(intervalId)
          setActiveIndex(totalWords)
        } else {
          setActiveIndex(current)
        }
      }, wordDelayMs)
    }, startDelayMs)

    return () => {
      clearTimeout(startTimer)
      if (intervalId) clearInterval(intervalId)
    }
  }, [isInView, totalWords, wordDelayMs, startDelayMs])

  let wordOffset = 0

  return (
    <div ref={containerRef} className={cn(className)}>
      {lines.map((line, lineIndex) => (
        <div
          key={`line-${lineIndex}`}
          className={cn('block whitespace-nowrap', line.className)}
        >
          {line.words.map((entry, wordIndex) => {
            const { text, revealedClassName: wordRevealed, encryptedClassName: wordEncrypted } =
              normalizeWord(entry)
            const globalIndex = wordOffset
            wordOffset += 1

            return (
              <span
                key={`${lineIndex}-${text}-${wordIndex}`}
                className="inline-block align-bottom"
              >
                <RevealWord
                  word={text}
                  globalIndex={globalIndex}
                  activeIndex={activeIndex}
                  revealedClassName={cn(
                    'text-gray-900',
                    line.revealedClassName,
                    wordRevealed,
                  )}
                  encryptedClassName={cn(
                    'text-neutral-400',
                    line.encryptedClassName,
                    wordEncrypted,
                  )}
                />
                {wordIndex < line.words.length - 1 ? (
                  <span className="inline-block w-[0.28em]" aria-hidden />
                ) : null}
              </span>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default WordRevealText
