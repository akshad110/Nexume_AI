import React from 'react'
import { MODERN_FONT } from '@/lib/resumeExportStyles'

function ModernProjects({ resumeInfo }) {
  const projects = (resumeInfo?.projects ?? []).filter(
    (p) => p?.name || p?.description,
  )
  if (!projects.length) return null
  const accent = resumeInfo?.themeColor || '#0f172a'

  return (
    <div className="space-y-3">
      {projects.map((project, index) => (
        <div
          key={index}
          className="leading-relaxed"
          style={{ fontSize: MODERN_FONT.body }}
        >
          <p className="font-bold m-0" style={{ color: accent }}>
            {project.name}
          </p>
          {project.techUsed && (
            <p
              className="text-gray-600 m-0 mt-0.5"
              style={{ fontSize: MODERN_FONT.small }}
            >
              {project.techUsed}
            </p>
          )}
          {project.description && (
            <div
              className="mt-1 mb-0 text-gray-800 pro-exp-html [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4"
              style={{ fontSize: MODERN_FONT.body }}
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ModernProjects
