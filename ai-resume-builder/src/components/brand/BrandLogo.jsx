import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { BRAND_LOGO_SRC, BRAND_NAME } from '@/config/brand'

const SIZES = {
  sm: { height: 36, maxWidth: 120, text: 'text-sm' },
  md: { height: 44, maxWidth: 150, text: 'text-base' },
  lg: { height: 56, maxWidth: 180, text: 'text-lg' },
  xl: { height: 72, maxWidth: 220, text: 'text-2xl' },
}

function BrandLogo({
  size = 'md',
  showWordmark = false,
  linkTo = '/',
  className,
  imgClassName,
  wordmarkClassName,
  asLink = true,
}) {
  const s = SIZES[size] ?? SIZES.md

  const content = (
    <>
      <img
        src={BRAND_LOGO_SRC}
        alt={BRAND_NAME}
        className={cn('object-contain object-left shrink-0', imgClassName)}
        style={{
          height: s.height,
          width: 'auto',
          maxWidth: s.maxWidth,
        }}
      />
      {showWordmark && (
        <span
          className={cn(
            'font-black tracking-tight whitespace-nowrap',
            s.text,
            wordmarkClassName,
          )}
        >
          {BRAND_NAME}
        </span>
      )}
    </>
  )

  const wrapperClass = cn('inline-flex items-center gap-2 shrink-0', className)

  if (asLink && linkTo) {
    return (
      <Link to={linkTo} className={cn(wrapperClass, 'group')}>
        {content}
      </Link>
    )
  }

  return <div className={wrapperClass}>{content}</div>
}

export default BrandLogo
