import { Children, isValidElement } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

const STAGGER = 0.035

const GRADIENT_STOPS =
  'linear-gradient(90deg, #7c3aed 0%, #d946ef 50%, #fb923c 100%)'

function childrenToString(children) {
  if (children == null || typeof children === 'boolean') return ''
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children)
  }
  if (Array.isArray(children)) {
    return children.map(childrenToString).join('')
  }
  if (isValidElement(children)) {
    return childrenToString(children.props.children)
  }
  return Children.toArray(children).map(childrenToString).join('')
}

function getGradientStyle(index, total) {
  const spread = Math.max(total - 1, 1)
  const position = (index / spread) * 100

  return {
    backgroundImage: GRADIENT_STOPS,
    backgroundSize: `${total * 100}% 100%`,
    backgroundPosition: `${position}% 0`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  }
}

function CharRoll({ char, index, total, center, gradient }) {
  const delay = center
    ? STAGGER * Math.abs(index - (total - 1) / 2)
    : STAGGER * index

  const display = char === ' ' ? '\u00A0' : char
  const gradientStyle = gradient ? getGradientStyle(index, total) : undefined

  return (
    <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
      <motion.span
        className="inline-block will-change-transform"
        style={gradientStyle}
        variants={{
          initial: { y: 0 },
          hovered: { y: '-100%' },
        }}
        transition={{ ease: 'easeInOut', delay }}
      >
        {display}
      </motion.span>
      <motion.span
        className="absolute inset-x-0 top-0 inline-block will-change-transform"
        style={gradientStyle}
        variants={{
          initial: { y: '100%' },
          hovered: { y: 0 },
        }}
        transition={{ ease: 'easeInOut', delay }}
      >
        {display}
      </motion.span>
    </span>
  )
}

export function TextRoll({
  text,
  children,
  className,
  center = false,
  gradient = false,
  inline = false,
}) {
  const content = text ?? childrenToString(children)

  if (!content) return null

  const chars = content.split('')

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn(
        'relative max-w-full align-bottom text-gray-900 dark:text-white/90',
        inline ? 'inline-block w-auto' : 'block w-full',
        className,
      )}
      style={{ lineHeight: 1.15 }}
    >
      {chars.map((char, i) => (
        <CharRoll
          key={`${i}-${char}`}
          char={char}
          index={i}
          total={chars.length}
          center={center}
          gradient={gradient}
        />
      ))}
    </motion.span>
  )
}

export default TextRoll
