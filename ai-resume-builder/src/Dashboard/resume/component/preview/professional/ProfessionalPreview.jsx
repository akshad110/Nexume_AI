import React from 'react'
import ProfessionalHeader from './ProfessionalHeader'
import ProfessionalSection from './ProfessionalSection'
import ProfessionalEducation from './ProfessionalEducation'
import ProfessionalExperience from './ProfessionalExperience'
import ProfessionalProjects from './ProfessionalProjects'
import ProfessionalProgrammingSkills from './ProfessionalProgrammingSkills'

function ProfessionalPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || '#171717'
  const hasEducation = (resumeInfo?.education ?? []).length > 0
  const hasExperience = (resumeInfo?.experience ?? []).some(
    (e) => e?.title || e?.companyName,
  )
  const hasProjects = (resumeInfo?.projects ?? []).some(
    (p) => p?.name || p?.description,
  )
  const hasProgrammingSkills =
    resumeInfo?.programmingSkills?.languages ||
    resumeInfo?.programmingSkills?.technologies

  return (
    <div
      className="resume-export"
      style={{
        background: '#ffffff',
        color: '#000000',
        fontFamily: 'Georgia, "Times New Roman", Times, serif',
        fontSize: '11px',
        lineHeight: 1.35,
      }}
    >
      <ProfessionalHeader resumeInfo={resumeInfo} themeColor={themeColor} />

      {hasEducation && (
        <ProfessionalSection title="Education" themeColor={themeColor}>
          <ProfessionalEducation
            education={resumeInfo.education}
            themeColor={themeColor}
          />
        </ProfessionalSection>
      )}

      {hasExperience && (
        <ProfessionalSection title="Experience" themeColor={themeColor}>
          <ProfessionalExperience
            experience={resumeInfo.experience}
            themeColor={themeColor}
          />
        </ProfessionalSection>
      )}

      {hasProjects && (
        <ProfessionalSection title="Projects" themeColor={themeColor}>
          <ProfessionalProjects
            projects={resumeInfo.projects}
            themeColor={themeColor}
          />
        </ProfessionalSection>
      )}

      {hasProgrammingSkills && (
        <ProfessionalSection title="Programming Skills" themeColor={themeColor}>
          <ProfessionalProgrammingSkills
            programmingSkills={resumeInfo.programmingSkills}
            themeColor={themeColor}
          />
        </ProfessionalSection>
      )}
    </div>
  )
}

export default ProfessionalPreview
