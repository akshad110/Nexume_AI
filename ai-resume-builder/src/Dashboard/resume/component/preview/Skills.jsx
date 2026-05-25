import React from 'react'
import { getResumeTypography } from '@/data/resumeTypography'
import { classicHrStyle } from '@/lib/resumeDividerStyles'

function Skills({ resumeInfo }) {
  const fonts = getResumeTypography(resumeInfo)
  const accent = resumeInfo?.themeColor

  return (
    <div className="my-6">
      <h2
        className="mb-2 text-center font-bold"
        style={{ fontSize: fonts.section, color: accent }}
      >
        Skills
      </h2>

      <hr data-resume-hr style={classicHrStyle(accent)} />

      <div className="my-4 space-y-2">
        {(resumeInfo?.skills ?? []).map((item, index) => (
          <div key={index} style={{ fontSize: fonts.body }}>
            <span className="font-bold" style={{ color: accent }}>
              {item?.title}:
            </span>{' '}
            {(item?.skills ?? []).join(', ')}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
