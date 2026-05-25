import React from 'react'
import { getResumeTypography } from '@/data/resumeTypography'

/** LaTeX-style section heading with underline rule */
function TemplateSectionTitle({
  title,
  resumeInfo,
  themeColor,
  uppercase = true,
  className = '',
}) {
  const fonts = getResumeTypography(resumeInfo)
  const accent = themeColor || resumeInfo?.themeColor || '#171717'

  return (
    <h2
      className={`mb-2 mt-4 font-semibold tracking-wide ${uppercase ? 'uppercase' : ''} ${className}`}
      style={{
        fontSize: fonts.section,
        color: accent,
        borderBottom: `1px solid ${accent}`,
        paddingBottom: '2px',
      }}
    >
      {title}
    </h2>
  )
}

export default TemplateSectionTitle
