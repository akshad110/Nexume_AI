import React from 'react'
import { PROFESSIONAL_FONT } from '@/lib/resumeExportStyles'

function ProfessionalProjects({ projects, themeColor }) {
  const list = (projects ?? []).filter((p) => p?.name || p?.description)
  if (!list.length) return null

  return (
    <div style={{ fontSize: PROFESSIONAL_FONT.body, lineHeight: 1.45 }}>
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
            <p
              style={{
                margin: '0 0 4px 0',
                fontStyle: 'italic',
                fontSize: PROFESSIONAL_FONT.small,
              }}
            >
              Technologies: {item.techUsed}
            </p>
          )}
          {item.description && (
            <div
              className="pro-exp-html"
              style={{
                marginTop: '4px',
                fontSize: PROFESSIONAL_FONT.small,
                fontStyle: 'normal',
              }}
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ProfessionalProjects
