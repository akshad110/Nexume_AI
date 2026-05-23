import React from 'react'

function ModernProjects({ resumeInfo }) {
  const projects = (resumeInfo?.projects ?? []).filter(
    (p) => p?.name || p?.description,
  )
  if (!projects.length) return null
  const accent = resumeInfo?.themeColor || '#0f172a'

  return (
    <div className="space-y-3">
      {projects.map((project, index) => (
        <div key={index} className="text-[10px] leading-relaxed">
          <p className="font-bold m-0" style={{ color: accent }}>
            {project.name}
          </p>
          {project.techUsed && (
            <p className="text-[9px] text-gray-600 m-0 mt-0.5">
              {project.techUsed}
            </p>
          )}
          {project.description && (
            <p className="mt-1 mb-0 text-gray-800">{project.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}

export default ModernProjects
