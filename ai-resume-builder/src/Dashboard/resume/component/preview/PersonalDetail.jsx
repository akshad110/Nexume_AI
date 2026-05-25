import React from 'react'
import { classicHrStyle } from '@/lib/resumeDividerStyles'
import { getResumeTypography } from '@/data/resumeTypography'
import ResumeSocialLinks from './ResumeSocialLinks'

function PersonalDetail({ resumeInfo }) {
  const fonts = getResumeTypography(resumeInfo)
  const accent = resumeInfo?.themeColor

  return (
    <div>
      <h2
        className="text-center font-bold"
        style={{ fontSize: fonts.name, color: accent }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2
        className="text-center font-medium"
        style={{ fontSize: fonts.section, color: accent }}
      >
        {resumeInfo?.jobTitle}
      </h2>
      <h2
        className="text-center font-normal"
        style={{ fontSize: fonts.body, color: accent }}
      >
        {resumeInfo?.address}
      </h2>

      <div
        className="mt-1 grid w-full items-center gap-2"
        style={{ gridTemplateColumns: '1fr auto 1fr' }}
      >
        <h2
          className="justify-self-start font-normal"
          style={{ fontSize: fonts.body, color: accent }}
        >
          {resumeInfo?.phone}
        </h2>
        <ResumeSocialLinks
          resumeInfo={resumeInfo}
          variant="classic"
          iconColor={accent || '#333333'}
          inline
        />
        <h2
          className="justify-self-end text-right font-normal"
          style={{ fontSize: fonts.body, color: accent }}
        >
          {resumeInfo?.email}
        </h2>
      </div>
      <hr data-resume-hr style={classicHrStyle(accent)} />
    </div>
  )
}

export default PersonalDetail
