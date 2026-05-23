import React from 'react'

function ClassicProjects({ resumeInfo }) {
  const projects = (resumeInfo?.projects ?? []).filter(
    (p) => p?.name || p?.description,
  )
  if (!projects.length) return null
  const accent = resumeInfo?.themeColor || '#333'

  return (
    <div className="my-5">
      <h2
        className="text-[11px] font-bold uppercase tracking-wide mb-1 pb-1 border-b-2"
        style={{ borderColor: '#d4d4d4', color: '#333' }}
      >
        Projects
      </h2>
      {projects.map((project, index) => (
        <div key={index} className="my-3 text-[10px] leading-snug">
          <div className="flex justify-between items-baseline gap-2">
            <span className="font-bold text-[11px]" style={{ color: accent }}>
              {project.name}
            </span>
          </div>
          {project.techUsed && (
            <p className="text-[9px] text-gray-600 mt-0.5 italic">
              Tech: {project.techUsed}
            </p>
          )}
          {project.description && (
            <div
              className="text-[10px] mt-1 pro-exp-html [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ClassicProjects
