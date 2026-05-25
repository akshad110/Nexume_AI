import React from 'react'
import { getResumeTypography } from '@/data/resumeTypography'
import RichHtmlContent from './shared/RichHtmlContent'

function ClassicProjects({ resumeInfo }) {
  const projects = (resumeInfo?.projects ?? []).filter(
    (p) => p?.name || p?.description,
  )
  if (!projects.length) return null

  const fonts = getResumeTypography(resumeInfo)
  const accent = resumeInfo?.themeColor || '#333'

  return (
    <div className="my-5">
      <h2
        className="mb-1 border-b-2 pb-1 font-bold uppercase tracking-wide"
        style={{ fontSize: fonts.section, borderColor: '#d4d4d4', color: '#333' }}
      >
        Projects
      </h2>
      {projects.map((project, index) => (
        <div key={index} className="my-3 leading-snug" style={{ fontSize: fonts.body }}>
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-bold" style={{ fontSize: fonts.section, color: accent }}>
              {project.name}
            </span>
          </div>
          {project.techUsed && (
            <p className="mt-0.5 italic text-gray-600" style={{ fontSize: fonts.small }}>
              Tech: {project.techUsed}
            </p>
          )}
          {project.description && (
            <RichHtmlContent
              html={project.description}
              className="mt-1"
              style={{ fontSize: fonts.body }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ClassicProjects
