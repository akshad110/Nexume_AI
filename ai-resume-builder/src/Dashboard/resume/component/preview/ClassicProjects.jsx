import React from 'react'

function ClassicProjects({ resumeInfo }) {
  const projects = (resumeInfo?.projects ?? []).filter(
    (p) => p?.name || p?.description,
  )
  if (!projects.length) return null

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Projects
      </h2>
      <hr
        className="border-[1.5px] my-2"
        style={{ borderColor: resumeInfo?.themeColor }}
      />
      {projects.map((project, index) => (
        <div key={index} className="my-3 text-xs">
          <h3
            className="font-bold text-sm"
            style={{ color: resumeInfo?.themeColor }}
          >
            {project.name}
          </h3>
          {project.description && <p className="mt-1">{project.description}</p>}
        </div>
      ))}
    </div>
  )
}

export default ClassicProjects
