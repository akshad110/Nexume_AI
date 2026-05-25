import React from 'react'
import { proRow } from '@/lib/resumeExportStyles'

function formatDateRange(start, end) {
  if (!start && !end) return ''
  if (start && end) return `${start} -- ${end}`
  return start || end
}

function ProfessionalEducation({ education, themeColor, fonts }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {(education ?? []).map((item, index) => (
        <li
          key={index}
          style={{
            fontSize: fonts.body,
            marginBottom: index < education.length - 1 ? '8px' : 0,
          }}
        >
          <div style={{ ...proRow, fontWeight: 700, fontSize: fonts.section }}>
            <span style={{ color: themeColor }}>{item?.universityName}</span>
            <span style={{ fontWeight: 400, flexShrink: 0, textAlign: 'right' }}>
              {item?.major || item?.degree}
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
            <span>
              {item?.degree}
              {item?.major && item?.degree ? ` in ${item.major}` : ''}
            </span>
            <span
              style={{
                flexShrink: 0,
                fontStyle: 'normal',
                textAlign: 'right',
              }}
            >
              {formatDateRange(item?.startDate, item?.endDate)}
            </span>
          </div>
          {item?.description && (
            <p
              style={{
                margin: '2px 0 0 0',
                fontSize: fonts.small,
                fontStyle: 'normal',
              }}
            >
              {item.description}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}

export default ProfessionalEducation
