import React from 'react'
import { cn } from '@/lib/utils'

/** A4 dimensions for screen preview and PDF capture (210mm × 297mm) */
function A4ResumeWrapper({ children, className, id }) {
  return (
    <div
      id={id}
      className={cn('resume-a4-export resume-export mx-auto bg-white shadow-lg', className)}
      style={{
        width: '210mm',
        minHeight: '297mm',
        maxWidth: '100%',
        padding: '14mm 16mm',
        boxSizing: 'border-box',
        color: '#000000',
        background: '#ffffff',
      }}
    >
      {children}
    </div>
  )
}

export default A4ResumeWrapper
