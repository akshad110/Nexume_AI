import React from 'react'
import { proRow } from '@/lib/resumeExportStyles'
import RichHtmlContent from '../shared/RichHtmlContent'

function ProfessionalExperience({ experience, themeColor, fonts }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {(experience ?? []).map((item, index) => (
        <li
          key={index}
          style={{
            fontSize: fonts.body,
            marginBottom: index < experience.length - 1 ? '10px' : 0,
          }}
        >
          <div style={{ ...proRow, fontWeight: 700, fontSize: fonts.section }}>
            <span style={{ color: themeColor }}>{item?.companyName}</span>
            <span style={{ fontWeight: 400, flexShrink: 0, textAlign: 'right' }}>
              {[item?.city, item?.state].filter(Boolean).join(', ')}
            </span>
          </div>
          <div
            style={{
              ...proRow,
              fontSize: fonts.small,
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
            <RichHtmlContent
              html={item.workSummery}
              style={{
                marginTop: '4px',
                fontSize: fonts.body,
                fontStyle: 'normal',
              }}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default ProfessionalExperience
