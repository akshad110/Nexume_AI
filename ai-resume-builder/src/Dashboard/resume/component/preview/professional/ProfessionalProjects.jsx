import React from 'react'
import RichHtmlContent from '../shared/RichHtmlContent'

function ProfessionalProjects({ projects, themeColor, fonts }) {
  const list = (projects ?? []).filter((p) => p?.name || p?.description)
  if (!list.length) return null

  return (
    <div style={{ fontSize: fonts.body, lineHeight: 1.45 }}>
      {list.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: index < list.length - 1 ? '10px' : 0,
          }}
        >
          <p
            style={{
              margin: '0 0 2px 0',
              fontWeight: 700,
              fontSize: fonts.section,
              color: themeColor,
            }}
          >
            {item.name}
          </p>
          {item.techUsed && (
            <p
              style={{
                margin: '0 0 4px 0',
                fontStyle: 'italic',
                fontSize: fonts.small,
              }}
            >
              Technologies: {item.techUsed}
            </p>
          )}
          {item.description && (
            <RichHtmlContent
              html={item.description}
              style={{
                marginTop: '4px',
                fontSize: fonts.body,
                fontStyle: 'normal',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ProfessionalProjects
