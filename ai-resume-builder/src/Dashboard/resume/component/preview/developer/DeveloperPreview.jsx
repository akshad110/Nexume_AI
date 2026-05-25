import React from 'react'
import { getResumeTypography } from '@/data/resumeTypography'
import { getSocialHref, isSocialWebsiteUrl } from '@/lib/resumeLinks'
import ResumeSocialLinks from '../ResumeSocialLinks'
import TemplateSectionTitle from '../shared/TemplateSectionTitle'
import RichHtmlContent from '../shared/RichHtmlContent'
import { getOrderedVisibleSections, hasSectionContent } from '@/lib/resumeSectionLayout'
import { getCustomSections } from '@/lib/resumeSections'

function SkillRows({ skills, fonts, themeColor }) {
  const rows = (skills ?? []).filter(
    (item) => item?.title || (item?.skills && item.skills.length),
  )
  if (!rows.length) return null

  return (
    <ul className="m-0 list-none space-y-1 p-0">
      {rows.map((item, index) => (
        <li key={index} style={{ fontSize: fonts.body }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ width: '18%', fontWeight: 700, verticalAlign: 'top', color: themeColor }}>
                  {item.title}
                </td>
                <td style={{ width: '2%', verticalAlign: 'top' }}>:</td>
                <td style={{ width: '80%', verticalAlign: 'top' }}>
                  {(item.skills ?? []).join(', ')}
                </td>
              </tr>
            </tbody>
          </table>
        </li>
      ))}
    </ul>
  )
}

function ExperienceBlock({ experience, fonts, themeColor }) {
  return (
    <ul className="m-0 list-none space-y-3 p-0">
      {(experience ?? []).map((item, index) => (
        <li key={index} style={{ fontSize: fonts.body }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '4px' }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700 }}>{item?.title}</td>
                <td style={{ textAlign: 'right' }}>
                  {item?.startDate}
                  {item?.startDate ? ' – ' : ''}
                  {item?.currenlyworking ? 'Present' : item?.endDate}
                </td>
              </tr>
              <tr>
                <td style={{ fontStyle: 'italic', fontSize: fonts.small }}>{item?.companyName}</td>
                <td style={{ textAlign: 'right', fontStyle: 'italic', fontSize: fonts.small }}>
                  {[item?.city, item?.state].filter(Boolean).join(', ')}
                </td>
              </tr>
            </tbody>
          </table>
          {item?.workSummery && (
            <RichHtmlContent
              html={item.workSummery}
              className="ml-3"
              style={{ fontSize: fonts.body }}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

function EducationBlock({ education, fonts, themeColor }) {
  return (
    <ul className="m-0 list-none space-y-2 p-0">
      {(education ?? []).map((item, index) => (
        <li key={index}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, fontSize: fonts.body }}>{item?.universityName}</td>
                <td style={{ textAlign: 'right', fontSize: fonts.body }}>
                  {[item?.city, item?.major].filter(Boolean).join(', ')}
                </td>
              </tr>
              <tr>
                <td style={{ fontStyle: 'italic', fontSize: fonts.small }}>{item?.degree}</td>
                <td style={{ textAlign: 'right', fontStyle: 'italic', fontSize: fonts.small }}>
                  {item?.startDate}
                  {item?.startDate ? ' – ' : ''}
                  {item?.endDate}
                </td>
              </tr>
            </tbody>
          </table>
        </li>
      ))}
    </ul>
  )
}

function ProjectsBlock({ projects, fonts, themeColor }) {
  const list = (projects ?? []).filter((p) => p?.name || p?.description)
  if (!list.length) return null

  return (
    <ul className="m-0 list-none space-y-2 p-0">
      {list.map((project, index) => (
        <li key={index}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700 }}>{project.name}</td>
                <td style={{ fontStyle: 'italic', textAlign: 'center' }}>{project.techUsed}</td>
                <td style={{ textAlign: 'right', fontSize: fonts.small }} />
              </tr>
            </tbody>
          </table>
          {project.description && (
            <RichHtmlContent
              html={project.description}
              className="mt-0.5"
              style={{ fontSize: fonts.body }}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

/** Template 5 — Rezume / developer layout */
function DeveloperPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || '#2563eb'
  const fonts = getResumeTypography(resumeInfo)
  const fullName = [resumeInfo?.firstName, resumeInfo?.lastName].filter(Boolean).join(' ')

  const linkParts = []
  if (resumeInfo?.website && !isSocialWebsiteUrl(resumeInfo.website)) {
    linkParts.push(resumeInfo.website)
  }
  if (getSocialHref(resumeInfo, 'linkedin')) linkParts.push('LinkedIn')
  if (getSocialHref(resumeInfo, 'github')) linkParts.push('GitHub')

  const sectionTitles = {
    summary: resumeInfo?.jobTitle || 'Professional Summary',
    skills: 'Technical Skills',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    customSections: 'Certifications',
  }

  const order = getOrderedVisibleSections(resumeInfo)

  return (
    <div
      className="resume-export text-black"
      style={{
        fontFamily: '"Source Sans Pro", system-ui, sans-serif',
        fontSize: fonts.body,
        lineHeight: 1.35,
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '8px' }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: 'top' }}>
              <h1 className="m-0 font-bold" style={{ fontSize: fonts.name }}>
                {fullName || 'Your Name'}
              </h1>
            </td>
            <td style={{ textAlign: 'right', verticalAlign: 'top', fontSize: fonts.body }}>
              {resumeInfo?.address && <div>Location: {resumeInfo.address}</div>}
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ fontSize: fonts.small, paddingTop: '4px' }}>
              <span className="inline-flex flex-wrap items-center gap-2">
                {linkParts.length > 0 ? <span>{linkParts.join(' | ')}</span> : null}
                <ResumeSocialLinks resumeInfo={resumeInfo} variant="classic" iconColor={themeColor} inline />
              </span>
              <span style={{ float: 'right' }}>
                {resumeInfo?.email && (
                  <span>
                    Email: {resumeInfo.email}
                    {resumeInfo?.phone ? ' | ' : ''}
                  </span>
                )}
                {resumeInfo?.phone && <span>Mobile: {resumeInfo.phone}</span>}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {order.map((sectionId) => {
        if (!hasSectionContent(resumeInfo, sectionId)) return null
        const title = sectionTitles[sectionId] || sectionId

        if (sectionId === 'summary') {
          return (
            <section key={sectionId}>
              <TemplateSectionTitle
                title={title}
                resumeInfo={resumeInfo}
                themeColor={themeColor}
                uppercase
              />
              <p className="m-0" style={{ fontSize: fonts.body }}>
                {resumeInfo.summery}
              </p>
            </section>
          )
        }

        if (sectionId === 'skills') {
          return (
            <section key={sectionId}>
              <TemplateSectionTitle title={title} resumeInfo={resumeInfo} themeColor={themeColor} uppercase />
              <SkillRows skills={resumeInfo.skills} fonts={fonts} themeColor={themeColor} />
            </section>
          )
        }

        if (sectionId === 'experience') {
          return (
            <section key={sectionId}>
              <TemplateSectionTitle title={title} resumeInfo={resumeInfo} themeColor={themeColor} uppercase />
              <ExperienceBlock
                experience={resumeInfo.experience}
                fonts={fonts}
                themeColor={themeColor}
              />
            </section>
          )
        }

        if (sectionId === 'education') {
          return (
            <section key={sectionId}>
              <TemplateSectionTitle title={title} resumeInfo={resumeInfo} themeColor={themeColor} uppercase />
              <EducationBlock education={resumeInfo.education} fonts={fonts} themeColor={themeColor} />
            </section>
          )
        }

        if (sectionId === 'projects') {
          return (
            <section key={sectionId}>
              <TemplateSectionTitle title={title} resumeInfo={resumeInfo} themeColor={themeColor} uppercase />
              <ProjectsBlock projects={resumeInfo.projects} fonts={fonts} themeColor={themeColor} />
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
                uppercase
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

export default DeveloperPreview
