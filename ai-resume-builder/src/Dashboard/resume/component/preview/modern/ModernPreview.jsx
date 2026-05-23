import React from 'react'
import Summary from '../Summary'
import Experience from '../Experience'
import Education from '../Education'
import SkillsTable from '../SkillsTable'
import ModernProjects from './ModernProjects'
import CustomSections from '../CustomSections'
import { hasExperienceContent, getCustomSections } from '@/lib/resumeSections'
import { MODERN_FONT } from '@/lib/resumeExportStyles'
import {
  MODERN_HEADER_DIVIDER,
  MODERN_SECTION_DIVIDER,
} from '@/lib/resumeDividerStyles'

const sectionHeadingStyle = {
  ...MODERN_SECTION_DIVIDER,
  fontSize: MODERN_FONT.section,
}

/** Template 3 — centered header, summary, experience, projects, education, skills */
function ModernPreview({ resumeInfo }) {
  const accent = resumeInfo?.themeColor || '#0f172a'
  const fullName = [resumeInfo?.firstName, resumeInfo?.lastName]
    .filter(Boolean)
    .join(' ')

  const contactParts = [
    resumeInfo?.email,
    resumeInfo?.phone,
    resumeInfo?.website,
    resumeInfo?.address,
  ].filter(Boolean)

  return (
    <div
      className="resume-export text-black leading-relaxed"
      style={{
        color: '#111',
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: MODERN_FONT.base,
      }}
    >
      <header
        className="text-center mb-4 pb-3 border-b border-gray-300"
        style={MODERN_HEADER_DIVIDER}
      >
        <h1
          className="font-normal tracking-wide m-0 mb-2"
          style={{ fontSize: MODERN_FONT.name }}
        >
          {fullName}
        </h1>
        {contactParts.length > 0 && (
          <p
            className="text-gray-700 m-0 leading-relaxed"
            style={{ fontSize: MODERN_FONT.body }}
          >
            {contactParts.join(' · ')}
          </p>
        )}
        {resumeInfo?.jobTitle && (
          <p
            className="mt-1 mb-0 text-gray-600"
            style={{ fontSize: MODERN_FONT.body }}
          >
            {resumeInfo.jobTitle}
          </p>
        )}
      </header>

      {resumeInfo?.summery ? (
        <section className="mb-4">
          <h2
            className="font-normal uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-400"
            style={sectionHeadingStyle}
          >
            Summary
          </h2>
          <Summary resumeInfo={resumeInfo} variant="modern" />
        </section>
      ) : null}

      {hasExperienceContent(resumeInfo) && (
        <section className="mb-4">
          <h2
            className="font-normal uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-400"
            style={sectionHeadingStyle}
          >
            Work Experience
          </h2>
          <Experience resumeInfo={resumeInfo} hideTitle variant="modern" />
        </section>
      )}

      {(resumeInfo?.projects ?? []).some((p) => p?.name || p?.description) && (
        <section className="mb-4">
          <h2
            className="font-normal uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-400"
            style={sectionHeadingStyle}
          >
            Projects
          </h2>
          <ModernProjects resumeInfo={resumeInfo} />
        </section>
      )}

      {(resumeInfo?.education ?? []).length > 0 && (
        <section className="mb-4">
          <h2
            className="font-normal uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-400"
            style={sectionHeadingStyle}
          >
            Education
          </h2>
          <Education resumeInfo={resumeInfo} hideTitle variant="modern" />
        </section>
      )}

      {(resumeInfo?.skills ?? []).length > 0 && (
        <section className="mb-4">
          <h2
            className="font-normal uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-400"
            style={sectionHeadingStyle}
          >
            Skills
          </h2>
          <SkillsTable
            skills={resumeInfo.skills}
            themeColor={accent}
            fontSize={MODERN_FONT.body}
          />
        </section>
      )}

      {getCustomSections(resumeInfo).length > 0 && (
        <CustomSections resumeInfo={resumeInfo} variant="modern" />
      )}
    </div>
  )
}

export default ModernPreview
