import React from 'react'
import { getResumeTypography } from '@/data/resumeTypography'
import { classicHrStyle } from '@/lib/resumeDividerStyles'

function Education({ resumeInfo, hideTitle = false, variant = 'classic' }) {
  const fonts = getResumeTypography(resumeInfo)
  const accent = resumeInfo?.themeColor

  return (
    <div className={hideTitle ? 'my-2' : 'my-6'}>
      {!hideTitle && (
        <>
          <h2
            className="mb-2 text-center font-bold"
            style={{ fontSize: fonts.section, color: accent }}
          >
            Education
          </h2>
          <hr data-resume-hr style={classicHrStyle(accent)} />
        </>
      )}

      {(resumeInfo?.education ?? []).map((education, index) => (
        <div key={index} className="my-5">
          <h3 className="font-bold" style={{ fontSize: fonts.section, color: accent }}>
            {education.universityName}
          </h3>
          <p
            className="flex flex-wrap justify-between gap-1"
            style={{ fontSize: fonts.body, color: accent }}
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
            <p className="my-2" style={{ fontSize: fonts.body }}>
              {education.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export default Education
