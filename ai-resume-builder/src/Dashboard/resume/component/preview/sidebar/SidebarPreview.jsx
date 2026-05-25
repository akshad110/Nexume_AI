import React from 'react'
import { getResumeTypography } from '@/data/resumeTypography'
import { getSocialLink, getSocialHref } from '@/lib/resumeLinks'
import { hasSectionContent } from '@/lib/resumeSectionLayout'
import { getCustomSections } from '@/lib/resumeSections'
import RichHtmlContent from '../shared/RichHtmlContent'

function SidebarRule({ width = '100%' }) {
  return <hr className="my-2 border-gray-400" style={{ width }} />
}

function SidebarBlock({ title, children }) {
  return (
    <div className="mb-3">
      <h3 className="mb-1 text-xs font-bold uppercase tracking-wide">{title}</h3>
      <SidebarRule />
      {children}
    </div>
  )
}

/** Template 6 — two-column sidebar (skills, education | experience, projects, achievements) */
function SidebarPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || '#1f2937'
  const fonts = getResumeTypography(resumeInfo)
  const fullName = [resumeInfo?.firstName, resumeInfo?.lastName].filter(Boolean).join(' ')

  const skills = (resumeInfo?.skills ?? []).filter(
    (s) => s?.title || (s?.skills && s.skills.length),
  )

  return (
    <div
      className="resume-export flex gap-4 text-black"
      style={{
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: fonts.body,
        lineHeight: 1.35,
      }}
    >
      {/* Left column ~33% */}
      <aside
        className="shrink-0"
        style={{ width: '33%', minWidth: '33%', paddingRight: '8px' }}
      >
        <div className="mb-2 text-lg font-bold leading-tight">{fullName || 'Your Name'}</div>
        {resumeInfo?.jobTitle && (
          <p className="m-0 mb-1" style={{ fontSize: fonts.body }}>
            {resumeInfo.jobTitle}
          </p>
        )}
        {resumeInfo?.summery && (
          <p className="m-0 mb-2 text-gray-700" style={{ fontSize: fonts.small }}>
            {resumeInfo.summery.slice(0, 200)}
            {resumeInfo.summery.length > 200 ? '…' : ''}
          </p>
        )}

        <SidebarBlock title="Links">
          {getSocialLink(resumeInfo, 'github') && (
            <p className="m-0 mb-1" style={{ fontSize: fonts.small }}>
              Github:{' '}
              <a href={getSocialHref(resumeInfo, 'github')} style={{ color: themeColor }}>
                {getSocialLink(resumeInfo, 'github').replace(/^https?:\/\//, '')}
              </a>
            </p>
          )}
          {getSocialLink(resumeInfo, 'linkedin') && (
            <p className="m-0" style={{ fontSize: fonts.small }}>
              LinkedIn:{' '}
              <a href={getSocialHref(resumeInfo, 'linkedin')} style={{ color: themeColor }}>
                {getSocialLink(resumeInfo, 'linkedin').replace(/^https?:\/\//, '')}
              </a>
            </p>
          )}
        </SidebarBlock>

        {skills.length > 0 && (
          <SidebarBlock title="Skills">
            {skills.map((group, index) => (
              <div key={index} className="mb-2">
                <p className="m-0 font-semibold" style={{ fontSize: fonts.small }}>
                  {group.title}
                </p>
                <p className="m-0 text-gray-800" style={{ fontSize: fonts.small }}>
                  {(group.skills ?? []).join(', ')}
                </p>
              </div>
            ))}
          </SidebarBlock>
        )}

        {hasSectionContent(resumeInfo, 'education') && (
          <SidebarBlock title="Education">
            {(resumeInfo.education ?? []).map((edu, index) => (
              <div key={index} className="mb-2">
                <p className="m-0 font-semibold" style={{ fontSize: fonts.small }}>
                  {edu.degree}
                </p>
                <p className="m-0" style={{ fontSize: fonts.small }}>
                  {edu.universityName}
                </p>
                <p className="m-0 text-gray-600" style={{ fontSize: fonts.small }}>
                  {edu.startDate}
                  {edu.startDate ? ' – ' : ''}
                  {edu.endDate}
                </p>
              </div>
            ))}
          </SidebarBlock>
        )}
      </aside>

      {/* Right column ~66% */}
      <main className="min-w-0 flex-1">
        <div className="mb-4 text-right" style={{ fontSize: fonts.small, lineHeight: 1.5 }}>
          {resumeInfo?.address && <div>{resumeInfo.address}</div>}
          {resumeInfo?.phone && <div>Mob.: {resumeInfo.phone}</div>}
          {resumeInfo?.email && (
            <div>
              Email:{' '}
              <a href={`mailto:${resumeInfo.email}`} style={{ color: themeColor }}>
                {resumeInfo.email}
              </a>
            </div>
          )}
          {resumeInfo?.website && (
            <div>
              Web:{' '}
              <a
                href={
                  resumeInfo.website.startsWith('http')
                    ? resumeInfo.website
                    : `https://${resumeInfo.website}`
                }
                style={{ color: themeColor }}
              >
                {resumeInfo.website}
              </a>
            </div>
          )}
        </div>

        {hasSectionContent(resumeInfo, 'experience') && (
          <SidebarBlock title="Experience">
            {(resumeInfo.experience ?? []).map((exp, index) => (
              <div key={index} className="mb-3">
                <p className="m-0 font-bold" style={{ fontSize: fonts.section }}>
                  {exp.companyName}
                  <span className="font-normal text-gray-600" style={{ fontSize: fonts.small }}>
                    {' '}
                    · {exp.startDate}
                    {exp.startDate ? ' – ' : ''}
                    {exp.currenlyworking ? 'Present' : exp.endDate}
                  </span>
                </p>
                <p className="m-0 italic" style={{ fontSize: fonts.body }}>
                  {exp.title}
                </p>
                {exp.workSummery && (
                  <RichHtmlContent
                    html={exp.workSummery}
                    className="mt-1"
                    style={{ fontSize: fonts.small }}
                  />
                )}
              </div>
            ))}
          </SidebarBlock>
        )}

        {getCustomSections(resumeInfo).map((section, index) => (
          <SidebarBlock key={index} title={section.title || 'Achievements'}>
            {section.content && (
              <RichHtmlContent html={section.content} style={{ fontSize: fonts.body }} />
            )}
          </SidebarBlock>
        ))}

        {hasSectionContent(resumeInfo, 'projects') && (
          <SidebarBlock title="Side Projects">
            {(resumeInfo.projects ?? []).map((project, index) => (
              <div key={index} className="mb-2">
                <p className="m-0 font-bold">{project.name}</p>
                {project.techUsed && (
                  <p className="m-0 italic text-gray-600" style={{ fontSize: fonts.small }}>
                    {project.techUsed}
                  </p>
                )}
                {project.description && (
                  <RichHtmlContent
                    html={project.description}
                    className="mt-0.5"
                    style={{ fontSize: fonts.small }}
                  />
                )}
              </div>
            ))}
          </SidebarBlock>
        )}
      </main>
    </div>
  )
}

export default SidebarPreview
