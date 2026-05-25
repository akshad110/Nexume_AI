import React from 'react'
import { cn } from '@/lib/utils'

/** Renders WYSIWYG HTML (experience bullets, project descriptions) with list styles. */
function RichHtmlContent({ html, className, style }) {
  if (!html?.trim()) return null

  return (
    <div
      className={cn('pro-exp-html', className)}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default RichHtmlContent
