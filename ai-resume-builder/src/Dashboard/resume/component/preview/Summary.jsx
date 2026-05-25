import React from 'react'
import { getResumeTypography } from '@/data/resumeTypography'

function Summary({ resumeInfo }) {
  const fonts = getResumeTypography(resumeInfo)

  return (
    <p style={{ fontSize: fonts.body, margin: 0 }}>{resumeInfo?.summery}</p>
  )
}

export default Summary
