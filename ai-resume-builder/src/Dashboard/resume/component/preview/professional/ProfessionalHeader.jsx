import React from 'react'
import { PROFESSIONAL_FONT, proName, proRow } from '@/lib/resumeExportStyles'

function ProfessionalHeader({ resumeInfo, themeColor }) {
  const fullName = [resumeInfo?.firstName, resumeInfo?.lastName]
    .filter(Boolean)
    .join(' ')

  return (
    <div style={{ marginBottom: '12px' }}>
      {resumeInfo?.address && (
        <p
          style={{
            fontSize: PROFESSIONAL_FONT.body,
            margin: '0 0 6px 0',
            lineHeight: 1.4,
          }}
        >
          {resumeInfo.address}
        </p>
      )}
      <div style={proRow}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={proName(themeColor)}>{fullName || 'Your Name'}</h1>
          {resumeInfo?.website && (
            <a
              href={
                resumeInfo.website.startsWith('http')
                  ? resumeInfo.website
                  : `https://${resumeInfo.website}`
              }
              style={{
                fontSize: PROFESSIONAL_FONT.body,
                color: themeColor,
                textDecoration: 'underline',
                display: 'block',
                marginTop: '2px',
              }}
              target="_blank"
              rel="noreferrer"
            >
              {resumeInfo.website}
            </a>
          )}
        </div>
        <div
          style={{
            textAlign: 'right',
            fontSize: PROFESSIONAL_FONT.body,
            flexShrink: 0,
            lineHeight: 1.4,
          }}
        >
          {resumeInfo?.email && (
            <p style={{ margin: '0 0 2px 0' }}>
              <span style={{ fontWeight: 600 }}>Email : </span>
              {resumeInfo.email}
            </p>
          )}
          {resumeInfo?.phone && (
            <p style={{ margin: 0 }}>
              <span style={{ fontWeight: 600 }}>Mobile : </span>
              {resumeInfo.phone}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfessionalHeader
