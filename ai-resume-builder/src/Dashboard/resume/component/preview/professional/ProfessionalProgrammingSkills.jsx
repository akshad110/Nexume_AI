import React from 'react'
import { PROFESSIONAL_FONT } from '@/lib/resumeExportStyles'

function ProfessionalProgrammingSkills({ programmingSkills, themeColor }) {
  const { languages, technologies } = programmingSkills || {}

  return (
    <div style={{ fontSize: PROFESSIONAL_FONT.body, lineHeight: 1.45 }}>
      {languages && (
        <p style={{ margin: '0 0 4px 0' }}>
          <span style={{ fontWeight: 700, color: themeColor }}>Languages</span>
          {': '}
          {languages}
        </p>
      )}
      {technologies && (
        <p style={{ margin: 0 }}>
          <span style={{ fontWeight: 700, color: themeColor }}>Technologies</span>
          {': '}
          {technologies}
        </p>
      )}
    </div>
  )
}

export default ProfessionalProgrammingSkills
