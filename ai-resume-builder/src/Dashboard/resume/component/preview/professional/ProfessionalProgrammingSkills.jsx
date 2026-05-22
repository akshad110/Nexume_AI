import React from 'react'

function ProfessionalProgrammingSkills({ programmingSkills, themeColor }) {
  const { languages, technologies } = programmingSkills || {}

  return (
    <div style={{ fontSize: '10px', lineHeight: 1.45 }}>
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
