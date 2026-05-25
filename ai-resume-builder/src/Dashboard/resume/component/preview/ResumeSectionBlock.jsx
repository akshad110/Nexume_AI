import React from 'react'
import Summary from './Summary'
import Experience from './Experience'
import Education from './Education'
import Skills from './Skills'
import ClassicProjects from './ClassicProjects'
import ModernProjects from './modern/ModernProjects'
import CustomSections from './CustomSections'
import ProfessionalSection from './professional/ProfessionalSection'
import ProfessionalEducation from './professional/ProfessionalEducation'
import ProfessionalExperience from './professional/ProfessionalExperience'
import ProfessionalProjects from './professional/ProfessionalProjects'
import SkillsTable from './SkillsTable'
import { getResumeTypography } from '@/data/resumeTypography'
import { MODERN_SECTION_DIVIDER } from '@/lib/resumeDividerStyles'
import {
  getOrderedVisibleSections,
  hasSectionContent,
} from '@/lib/resumeSectionLayout'
import { getCustomSections } from '@/lib/resumeSections'
import RichHtmlContent from './shared/RichHtmlContent'

function ModernSectionShell({ title, resumeInfo, children }) {
  const fonts = getResumeTypography(resumeInfo)
  return (
    <section className="mb-4">
      <h2
        className="mb-2 border-b border-gray-400 pb-1 font-normal uppercase tracking-[0.2em]"
        style={{ ...MODERN_SECTION_DIVIDER, fontSize: fonts.section }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function ResumeSectionBlock({ sectionId, resumeInfo, variant = 'classic' }) {
  if (!hasSectionContent(resumeInfo, sectionId)) return null

  const themeColor = resumeInfo?.themeColor || '#171717'
  const fonts = getResumeTypography(resumeInfo)

  if (variant === 'professional') {
    switch (sectionId) {
      case 'summary':
        return (
          <ProfessionalSection title="Summary" themeColor={themeColor} fonts={fonts}>
            <Summary resumeInfo={resumeInfo} />
          </ProfessionalSection>
        )
      case 'experience':
        return (
          <ProfessionalSection title="Experience" themeColor={themeColor} fonts={fonts}>
            <ProfessionalExperience
              experience={resumeInfo.experience}
              themeColor={themeColor}
              fonts={fonts}
            />
          </ProfessionalSection>
        )
      case 'projects':
        return (
          <ProfessionalSection title="Projects" themeColor={themeColor} fonts={fonts}>
            <ProfessionalProjects
              projects={resumeInfo.projects}
              themeColor={themeColor}
              fonts={fonts}
            />
          </ProfessionalSection>
        )
      case 'education':
        return (
          <ProfessionalSection title="Education" themeColor={themeColor} fonts={fonts}>
            <ProfessionalEducation
              education={resumeInfo.education}
              themeColor={themeColor}
              fonts={fonts}
            />
          </ProfessionalSection>
        )
      case 'skills':
        return (
          <ProfessionalSection title="Skills" themeColor={themeColor} fonts={fonts}>
            <SkillsTable
              skills={resumeInfo.skills}
              themeColor={themeColor}
              fontSize={fonts.body}
            />
          </ProfessionalSection>
        )
      case 'customSections':
        return getCustomSections(resumeInfo).map((section, index) => (
          <ProfessionalSection
            key={index}
            title={section.title}
            themeColor={themeColor}
            fonts={fonts}
          >
            {section.content && (
              <RichHtmlContent html={section.content} style={{ fontSize: fonts.body }} />
            )}
          </ProfessionalSection>
        ))
      default:
        return null
    }
  }

  if (variant === 'modern') {
    switch (sectionId) {
      case 'summary':
        return (
          <ModernSectionShell title="Summary" resumeInfo={resumeInfo}>
            <Summary resumeInfo={resumeInfo} />
          </ModernSectionShell>
        )
      case 'experience':
        return (
          <ModernSectionShell title="Work Experience" resumeInfo={resumeInfo}>
            <Experience resumeInfo={resumeInfo} hideTitle />
          </ModernSectionShell>
        )
      case 'projects':
        return (
          <ModernSectionShell title="Projects" resumeInfo={resumeInfo}>
            <ModernProjects resumeInfo={resumeInfo} />
          </ModernSectionShell>
        )
      case 'education':
        return (
          <ModernSectionShell title="Education" resumeInfo={resumeInfo}>
            <Education resumeInfo={resumeInfo} hideTitle />
          </ModernSectionShell>
        )
      case 'skills':
        return (
          <ModernSectionShell title="Skills" resumeInfo={resumeInfo}>
            <SkillsTable
              skills={resumeInfo.skills}
              themeColor={resumeInfo?.themeColor || '#0f172a'}
              fontSize={fonts.body}
            />
          </ModernSectionShell>
        )
      case 'customSections':
        return <CustomSections resumeInfo={resumeInfo} variant="modern" />
      default:
        return null
    }
  }

  switch (sectionId) {
    case 'summary':
      return <Summary resumeInfo={resumeInfo} />
    case 'experience':
      return <Experience resumeInfo={resumeInfo} />
    case 'projects':
      return <ClassicProjects resumeInfo={resumeInfo} />
    case 'education':
      return <Education resumeInfo={resumeInfo} />
    case 'skills':
      return <Skills resumeInfo={resumeInfo} />
    case 'customSections':
      return <CustomSections resumeInfo={resumeInfo} variant="classic" />
    default:
      return null
  }
}

export function OrderedResumeBody({ resumeInfo, variant = 'classic' }) {
  const order = getOrderedVisibleSections(resumeInfo)

  return (
    <>
      {order.map((sectionId) => (
        <React.Fragment key={sectionId}>
          <ResumeSectionBlock
            sectionId={sectionId}
            resumeInfo={resumeInfo}
            variant={variant}
          />
        </React.Fragment>
      ))}
    </>
  )
}

export default ResumeSectionBlock
