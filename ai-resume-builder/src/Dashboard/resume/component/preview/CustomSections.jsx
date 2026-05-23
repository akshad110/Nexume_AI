import React from 'react'
import { MODERN_FONT } from '@/lib/resumeExportStyles'
import { MODERN_SECTION_DIVIDER, classicHrStyle } from '@/lib/resumeDividerStyles'

function CustomSections({ resumeInfo, variant = 'classic' }) {
  const sections = (resumeInfo?.customSections ?? []).filter(
    (s) => s?.title?.trim(),
  )
  if (!sections.length) return null

  const accent = resumeInfo?.themeColor || '#333'
  const isModern = variant === 'modern'

  const headingClass = isModern
    ? 'font-normal uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-400'
    : 'text-center font-bold text-sm mb-2'

  const modernHeadingStyle = isModern
    ? { ...MODERN_SECTION_DIVIDER, fontSize: MODERN_FONT.section }
    : undefined

  return (
    <>
      {sections.map((section, index) => (
        <div key={index} className={isModern ? 'mb-4' : 'my-6'}>
          <h2
            className={headingClass}
            style={isModern ? modernHeadingStyle : { color: accent }}
          >
            {section.title}
          </h2>
          {!isModern && (
            <hr data-resume-hr style={classicHrStyle(accent)} />
          )}
          {section.content && (
            <div
              className={
                isModern
                  ? 'pro-exp-html [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5'
                  : 'text-xs pro-exp-html [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5'
              }
              style={isModern ? { fontSize: MODERN_FONT.body } : undefined}
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
        </div>
      ))}
    </>
  )
}

export default CustomSections
