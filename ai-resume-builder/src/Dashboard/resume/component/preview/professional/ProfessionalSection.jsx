import React from 'react'
import { proSectionTitle } from '@/lib/resumeExportStyles'

function ProfessionalSection({ title, themeColor, children }) {
  return (
    <section style={{ marginBottom: '12px' }}>
      <h2 style={proSectionTitle(themeColor)}>{title}</h2>
      {children}
    </section>
  )
}

export default ProfessionalSection
