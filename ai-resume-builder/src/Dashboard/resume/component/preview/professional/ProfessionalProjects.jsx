import React from 'react'

function ProfessionalProjects({ projects, themeColor }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {(projects ?? []).map((item, index) => (
        <li
          key={index}
          style={{
            fontSize: '10px',
            marginBottom: index < projects.length - 1 ? '6px' : 0,
            lineHeight: 1.4,
          }}
        >
          <span style={{ fontWeight: 700, color: themeColor }}>{item?.name}</span>
          {item?.description && (
            <span>
              {' : '}
              {item.description}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default ProfessionalProjects
