import React from 'react'
import { getResumeTypography } from '@/data/resumeTypography'
import { classicHrStyle } from '@/lib/resumeDividerStyles'
import RichHtmlContent from './shared/RichHtmlContent'

function Experience({ resumeInfo, hideTitle = false, variant = 'classic' }) {
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
            Professional Experience
          </h2>
          <hr data-resume-hr style={classicHrStyle(accent)} />
        </>
      )}

      {(resumeInfo?.experience ?? []).map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            className="font-bold"
            style={{ fontSize: fonts.section, color: accent }}
          >
            {experience?.title}
          </h2>
          <h2
            className="flex justify-between"
            style={{ fontSize: fonts.body, color: accent }}
          >
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>
              {experience?.startDate}{' '}
              - {experience?.currenlyworking ? 'Present' : `   ${experience.endDate}`}
            </span>
          </h2>

          <RichHtmlContent
            html={experience?.workSummery}
            className="my-2"
            style={{ fontSize: fonts.body }}
          />
        </div>
      ))}
    </div>
  )
}

export default Experience
