import React from 'react'
import ProfessionalHeader from './ProfessionalHeader'
import { OrderedResumeBody } from '../ResumeSectionBlock'
import { getResumeTypography } from '@/data/resumeTypography'

/** Template 2 — header + ordered body sections */
function ProfessionalPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || '#171717'
  const fonts = getResumeTypography(resumeInfo)

  return (
    <div
      className="resume-export"
      style={{
        background: '#ffffff',
        color: '#000000',
        fontFamily: 'Georgia, "Times New Roman", Times, serif',
        fontSize: fonts.base,
        lineHeight: 1.4,
      }}
    >
      <ProfessionalHeader resumeInfo={resumeInfo} themeColor={themeColor} />
      <OrderedResumeBody resumeInfo={resumeInfo} variant="professional" />
    </div>
  )
}

export default ProfessionalPreview
