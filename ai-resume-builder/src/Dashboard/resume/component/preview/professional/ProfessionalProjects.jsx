import React from 'react'

function ProfessionalProjects({ projects, themeColor }) {
  const list = (projects ?? []).filter((p) => p?.name || p?.description)
  if (!list.length) return null

  return (
    <div style={{ fontSize: '10px', lineHeight: 1.45 }}>
      {list.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: index < list.length - 1 ? '10px' : 0,
          }}
        >
          <p style={{ margin: '0 0 2px 0', fontWeight: 700, color: themeColor }}>
            {item.name}
          </p>
          {item.techUsed && (
            <p style={{ margin: '0 0 4px 0', fontStyle: 'italic', fontSize: '9px' }}>
              Technologies: {item.techUsed}
            </p>
          )}
          {item.description && (
            <ul
              style={{
                margin: 0,
                paddingLeft: '14px',
                listStyleType: 'disc',
              }}
            >
              {item.description
                .split(/(?<=[.!?])\s+/)
                .filter(Boolean)
                .map((line, i) => (
                  <li key={i} style={{ marginBottom: '2px' }}>
                    {line.trim()}
                  </li>
                ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProfessionalProjects
