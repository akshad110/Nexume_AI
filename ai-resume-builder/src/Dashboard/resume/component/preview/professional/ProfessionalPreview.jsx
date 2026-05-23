import React from 'react'
import ProfessionalHeader from './ProfessionalHeader'
import ProfessionalSection from './ProfessionalSection'
import ProfessionalEducation from './ProfessionalEducation'
import ProfessionalExperience from './ProfessionalExperience'
import ProfessionalProjects from './ProfessionalProjects'
import SkillsTable from '../SkillsTable'
import { hasExperienceContent, getCustomSections } from '@/lib/resumeSections'
import { PROFESSIONAL_FONT } from '@/lib/resumeExportStyles'

/** Template 2 — education, skills table, projects, experience */
function ProfessionalPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || '#171717'
  const hasEducation = (resumeInfo?.education ?? []).length > 0
  const hasExperience = hasExperienceContent(resumeInfo)
  const customSections = getCustomSections(resumeInfo)
  const hasProjects = (resumeInfo?.projects ?? []).some(
    (p) => p?.name || p?.description,
  )
  const hasSkills = (resumeInfo?.skills ?? []).some(
    (s) => s?.title || (s?.skills && s.skills.length),
  )

  return (
    <div
      className="resume-export"
      style={{
        background: '#ffffff',
        color: '#000000',
        fontFamily: 'Georgia, "Times New Roman", Times, serif',
        fontSize: PROFESSIONAL_FONT.base,
        lineHeight: 1.4,
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

      {hasSkills && (
        <ProfessionalSection title="Skills" themeColor={themeColor}>
          <SkillsTable
            skills={resumeInfo.skills}
            themeColor={themeColor}
            fontSize={PROFESSIONAL_FONT.body}
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

      {hasExperience && (
        <ProfessionalSection title="Experience" themeColor={themeColor}>
          <ProfessionalExperience
            experience={resumeInfo.experience}
            themeColor={themeColor}
          />
        </ProfessionalSection>
      )}

      {customSections.map((section, index) => (
        <ProfessionalSection
          key={index}
          title={section.title}
          themeColor={themeColor}
        >
          {section.content && (
            <div
              className="pro-exp-html"
              style={{ fontSize: PROFESSIONAL_FONT.body }}
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
        </ProfessionalSection>
      ))}
    </div>
  )
}

export default ProfessionalPreview
