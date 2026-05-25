import React from 'react'
import { getResumeTypography } from '@/data/resumeTypography'
import { MODERN_SECTION_DIVIDER, classicHrStyle } from '@/lib/resumeDividerStyles'
import RichHtmlContent from './shared/RichHtmlContent'

function CustomSections({ resumeInfo, variant = 'classic' }) {
  const sections = (resumeInfo?.customSections ?? []).filter(
    (s) => s?.title?.trim(),
  )
  if (!sections.length) return null

  const fonts = getResumeTypography(resumeInfo)
  const accent = resumeInfo?.themeColor || '#333'
  const isModern = variant === 'modern'

  const headingClass = isModern
    ? 'mb-2 border-b border-gray-400 pb-1 font-normal uppercase tracking-[0.2em]'
    : 'mb-2 text-center font-bold'

  const headingStyle = isModern
    ? { ...MODERN_SECTION_DIVIDER, fontSize: fonts.section }
    : { fontSize: fonts.section, color: accent }

  return (
    <>
      {sections.map((section, index) => (
        <div key={index} className={isModern ? 'mb-4' : 'my-6'}>
          <h2 className={headingClass} style={headingStyle}>
            {section.title}
          </h2>
          {!isModern && <hr data-resume-hr style={classicHrStyle(accent)} />}
          {section.content && (
            <RichHtmlContent html={section.content} style={{ fontSize: fonts.body }} />
          )}
        </div>
      ))}
    </>
  )
}

export default CustomSections
