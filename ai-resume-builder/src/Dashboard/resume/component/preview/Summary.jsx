import React from 'react'
import { MODERN_FONT } from '@/lib/resumeExportStyles'

function Summary({ resumeInfo, variant = 'classic' }) {
  const isModern = variant === 'modern'

  return (
    <p
      className={isModern ? undefined : 'text-xs'}
      style={isModern ? { fontSize: MODERN_FONT.body, margin: 0 } : undefined}
    >
      {resumeInfo?.summery}
    </p>
  )
}

export default Summary
