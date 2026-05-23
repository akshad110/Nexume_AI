import React from 'react'
import { MODERN_FONT } from '@/lib/resumeExportStyles'
import { classicHrStyle } from '@/lib/resumeDividerStyles'

function Education({ resumeInfo, hideTitle = false, variant = 'classic' }) {
  const accent = resumeInfo?.themeColor
  const isModern = variant === 'modern'

  return (
    <div className={hideTitle ? 'my-2' : 'my-6'}>
      {!hideTitle && (
        <>
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{ color: accent }}
          >
            Education
          </h2>
          <hr data-resume-hr style={classicHrStyle(accent)} />
        </>
      )}

      {(resumeInfo?.education ?? []).map((education, index) => (
        <div key={index} className="my-5">
          <h3
            className={isModern ? 'font-bold' : 'text-sm font-bold'}
            style={{
              color: accent,
              ...(isModern ? { fontSize: MODERN_FONT.section } : {}),
            }}
          >
            {education.universityName}
          </h3>
          <p
            className={
              isModern
                ? 'flex justify-between flex-wrap gap-1'
                : 'text-xs flex justify-between flex-wrap gap-1'
            }
            style={isModern ? { fontSize: MODERN_FONT.body } : undefined}
          >
            <span>
              {education?.degree}
              {education?.major ? ` in ${education.major}` : ''}
            </span>
            <span>
              {education?.startDate}
              {education?.endDate ? ` - ${education.endDate}` : ''}
            </span>
          </p>
          {education?.description && (
            <p
              className={isModern ? 'my-2' : 'text-sm my-2'}
              style={isModern ? { fontSize: MODERN_FONT.body } : undefined}
            >
              {education.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export default Education
