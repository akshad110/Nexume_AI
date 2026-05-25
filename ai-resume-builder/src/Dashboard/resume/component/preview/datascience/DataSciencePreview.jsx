import React from 'react'
import { getResumeTypography } from '@/data/resumeTypography'
import { getSocialHref } from '@/lib/resumeLinks'
import ResumeSocialLinks from '../ResumeSocialLinks'
import SkillsTable from '../SkillsTable'
import TemplateSectionTitle from '../shared/TemplateSectionTitle'
import RichHtmlContent from '../shared/RichHtmlContent'
import { getOrderedVisibleSections, hasSectionContent } from '@/lib/resumeSectionLayout'
import { getCustomSections } from '@/lib/resumeSections'
import ProfessionalExperience from '../professional/ProfessionalExperience'
import ProfessionalEducation from '../professional/ProfessionalEducation'

/** Template 4 — TLC / Data Science layout (objective → skills → experience → education → activities) */
function DataSciencePreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || '#2563eb'
  const fonts = getResumeTypography(resumeInfo)
  const fullName = [resumeInfo?.firstName, resumeInfo?.lastName].filter(Boolean).join(' ')
  const contactParts = [
    resumeInfo?.phone,
    resumeInfo?.address,
    resumeInfo?.email,
  ].filter(Boolean)

  const sectionTitles = {
    summary: 'Objective',
    skills: 'Skills',
    experience: 'Technical Experience',
    education: 'Education',
    customSections: 'Activities',
  }

  const order = getOrderedVisibleSections(resumeInfo)

  return (
    <div
      className="resume-export px-1 text-black"
      style={{
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: fonts.body,
        lineHeight: 1.4,
      }}
    >
      <header className="mb-3 border-b-2 pb-2" style={{ borderColor: themeColor }}>
        <h1 className="m-0 font-bold" style={{ fontSize: fonts.name, color: themeColor }}>
          {fullName || 'Your Name'}
        </h1>
        {resumeInfo?.jobTitle && (
          <p className="m-0 mt-1 font-semibold" style={{ fontSize: fonts.section }}>
            {resumeInfo.jobTitle}
          </p>
        )}
        {contactParts.length > 0 && (
          <p className="m-0 mt-1 text-gray-700" style={{ fontSize: fonts.small }}>
            {contactParts.join(' · ')}
          </p>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-3">
          {resumeInfo?.website && !getSocialHref(resumeInfo, 'linkedin') ? (
            <a
              href={
                resumeInfo.website.startsWith('http')
                  ? resumeInfo.website
                  : `https://${resumeInfo.website}`
              }
              style={{ fontSize: fonts.small, color: themeColor }}
              target="_blank"
              rel="noreferrer"
            >
              {resumeInfo.website}
            </a>
          ) : null}
          <ResumeSocialLinks resumeInfo={resumeInfo} variant="classic" iconColor={themeColor} inline />
        </div>
      </header>

      {order.map((sectionId) => {
        if (!hasSectionContent(resumeInfo, sectionId)) return null
        const title = sectionTitles[sectionId] || sectionId

        if (sectionId === 'summary') {
          return (
            <section key={sectionId}>
              <TemplateSectionTitle title={title} resumeInfo={resumeInfo} themeColor={themeColor} />
              <p style={{ fontSize: fonts.body, margin: 0 }}>{resumeInfo.summery}</p>
            </section>
          )
        }

        if (sectionId === 'skills') {
          return (
            <section key={sectionId}>
              <TemplateSectionTitle title={title} resumeInfo={resumeInfo} themeColor={themeColor} />
              <SkillsTable skills={resumeInfo.skills} themeColor={themeColor} fontSize={fonts.body} />
            </section>
          )
        }

        if (sectionId === 'experience') {
          return (
            <section key={sectionId}>
              <TemplateSectionTitle title={title} resumeInfo={resumeInfo} themeColor={themeColor} />
              <ProfessionalExperience
                experience={resumeInfo.experience}
                themeColor={themeColor}
                fonts={fonts}
              />
            </section>
          )
        }

        if (sectionId === 'education') {
          return (
            <section key={sectionId}>
              <TemplateSectionTitle title={title} resumeInfo={resumeInfo} themeColor={themeColor} />
              <ProfessionalEducation
                education={resumeInfo.education}
                themeColor={themeColor}
                fonts={fonts}
              />
            </section>
          )
        }

        if (sectionId === 'customSections') {
          return getCustomSections(resumeInfo).map((section, index) => (
            <section key={`${sectionId}-${index}`}>
              <TemplateSectionTitle
                title={section.title || title}
                resumeInfo={resumeInfo}
                themeColor={themeColor}
              />
              {section.content && (
                <RichHtmlContent html={section.content} style={{ fontSize: fonts.body }} />
              )}
            </section>
          ))
        }

        return null
      })}
    </div>
  )
}

export default DataSciencePreview
