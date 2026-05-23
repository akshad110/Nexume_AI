import React from 'react'
import Summary from '../Summary'
import Experience from '../Experience'
import Education from '../Education'
import SkillsTable from '../SkillsTable'
import ModernProjects from './ModernProjects'

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
      className="resume-export text-black text-[11px] leading-relaxed"
      style={{ color: '#111', fontFamily: '"Times New Roman", Times, serif' }}
    >
      <header className="text-center mb-4 pb-3 border-b border-gray-300">
        <h1 className="text-2xl font-normal tracking-wide m-0 mb-2">{fullName}</h1>
        {contactParts.length > 0 && (
          <p className="text-[10px] text-gray-700 m-0 leading-relaxed">
            {contactParts.join(' · ')}
          </p>
        )}
        {resumeInfo?.jobTitle && (
          <p className="text-[10px] mt-1 mb-0 text-gray-600">{resumeInfo.jobTitle}</p>
        )}
      </header>

      {resumeInfo?.summery ? (
        <section className="mb-4">
          <h2
            className="text-sm font-normal uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-400"
          >
            Summary
          </h2>
          <Summary resumeInfo={resumeInfo} />
        </section>
      ) : null}

      <section className="mb-4">
        <h2 className="text-sm font-normal uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-400">
          Work Experience
        </h2>
        <Experience resumeInfo={resumeInfo} hideTitle />
      </section>

      {(resumeInfo?.projects ?? []).some((p) => p?.name || p?.description) && (
        <section className="mb-4">
          <h2 className="text-sm font-normal uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-400">
            Projects
          </h2>
          <ModernProjects resumeInfo={resumeInfo} />
        </section>
      )}

      {(resumeInfo?.education ?? []).length > 0 && (
        <section className="mb-4">
          <h2 className="text-sm font-normal uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-400">
            Education
          </h2>
          <Education resumeInfo={resumeInfo} />
        </section>
      )}

      {(resumeInfo?.skills ?? []).length > 0 && (
        <section>
          <h2 className="text-sm font-normal uppercase tracking-[0.2em] mb-2 pb-1 border-b border-gray-400">
            Skills
          </h2>
          <SkillsTable skills={resumeInfo.skills} themeColor={accent} />
        </section>
      )}
    </div>
  )
}

export default ModernPreview
