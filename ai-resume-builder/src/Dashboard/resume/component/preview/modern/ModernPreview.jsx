import React from 'react'
import { OrderedResumeBody } from '../ResumeSectionBlock'
import { getResumeTypography } from '@/data/resumeTypography'
import { MODERN_HEADER_DIVIDER } from '@/lib/resumeDividerStyles'
import ResumeSocialLinks from '../ResumeSocialLinks'
import { isSocialWebsiteUrl } from '@/lib/resumeLinks'

/** Template 3 — centered header + ordered body sections */
function ModernPreview({ resumeInfo }) {
  const fonts = getResumeTypography(resumeInfo)
  const fullName = [resumeInfo?.firstName, resumeInfo?.lastName]
    .filter(Boolean)
    .join(' ')

  const contactParts = [
    resumeInfo?.email,
    resumeInfo?.phone,
    resumeInfo?.website && !isSocialWebsiteUrl(resumeInfo.website)
      ? resumeInfo.website
      : null,
    resumeInfo?.address,
  ].filter(Boolean)

  return (
    <div
      className="resume-export text-black leading-relaxed"
      style={{
        color: '#111',
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: fonts.base,
      }}
    >
      <header
        className="mb-4 border-b border-gray-300 pb-3 text-center"
        style={MODERN_HEADER_DIVIDER}
      >
        <h1
          className="m-0 mb-2 font-normal tracking-wide"
          style={{ fontSize: fonts.name }}
        >
          {fullName}
        </h1>
        {contactParts.length > 0 && (
          <p
            className="m-0 leading-relaxed text-gray-700"
            style={{ fontSize: fonts.body }}
          >
            {contactParts.join(' · ')}
          </p>
        )}
        {resumeInfo?.jobTitle && (
          <p className="mb-0 mt-1 text-gray-600" style={{ fontSize: fonts.body }}>
            {resumeInfo.jobTitle}
          </p>
        )}
        <ResumeSocialLinks resumeInfo={resumeInfo} variant="modern" />
      </header>

      <OrderedResumeBody resumeInfo={resumeInfo} variant="modern" />
    </div>
  )
}

export default ModernPreview
