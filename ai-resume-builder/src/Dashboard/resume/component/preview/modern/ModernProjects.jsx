import React from 'react'
import { getResumeTypography } from '@/data/resumeTypography'
import RichHtmlContent from '../shared/RichHtmlContent'

function ModernProjects({ resumeInfo }) {
  const projects = (resumeInfo?.projects ?? []).filter(
    (p) => p?.name || p?.description,
  )
  if (!projects.length) return null

  const fonts = getResumeTypography(resumeInfo)
  const accent = resumeInfo?.themeColor || '#0f172a'

  return (
    <div className="space-y-3">
      {projects.map((project, index) => (
        <div key={index} className="leading-relaxed" style={{ fontSize: fonts.body }}>
          <p
            className="m-0 font-bold"
            style={{ fontSize: fonts.section, color: accent }}
          >
            {project.name}
          </p>
          {project.techUsed && (
            <p
              className="m-0 mt-0.5 text-gray-600"
              style={{ fontSize: fonts.small }}
            >
              {project.techUsed}
            </p>
          )}
          {project.description && (
            <RichHtmlContent
              html={project.description}
              className="mb-0 mt-1 text-gray-800"
              style={{ fontSize: fonts.body }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ModernProjects
