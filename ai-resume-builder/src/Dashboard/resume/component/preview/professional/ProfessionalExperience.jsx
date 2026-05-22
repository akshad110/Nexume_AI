import React from 'react'
import { proRow } from '@/lib/resumeExportStyles'

function ProfessionalExperience({ experience, themeColor }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {(experience ?? []).map((item, index) => (
        <li
          key={index}
          style={{
            fontSize: '10px',
            marginBottom: index < experience.length - 1 ? '10px' : 0,
          }}
        >
          <div style={{ ...proRow, fontWeight: 700 }}>
            <span style={{ color: themeColor }}>{item?.companyName}</span>
            <span style={{ fontWeight: 400, flexShrink: 0, textAlign: 'right' }}>
              {[item?.city, item?.state].filter(Boolean).join(', ')}
            </span>
          </div>
          <div
            style={{
              ...proRow,
              fontSize: '9px',
              fontStyle: 'italic',
              marginTop: '2px',
            }}
          >
            <span>{item?.title}</span>
            <span
              style={{
                flexShrink: 0,
                fontStyle: 'normal',
                textAlign: 'right',
              }}
            >
              {item?.startDate}
              {item?.startDate ? ' - ' : ''}
              {item?.currenlyworking ? 'Present' : item?.endDate}
            </span>
          </div>
          {item?.workSummery && (
            <div
              className="pro-exp-html"
              style={{
                marginTop: '4px',
                fontSize: '9px',
                fontStyle: 'normal',
              }}
              dangerouslySetInnerHTML={{ __html: item.workSummery }}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default ProfessionalExperience
