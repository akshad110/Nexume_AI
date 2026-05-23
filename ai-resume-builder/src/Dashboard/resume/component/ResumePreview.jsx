import { ResumeInfoContext } from '@/context/ResumeContext'
import React, { useContext } from 'react'
import PersonalDetail from './preview/PersonalDetail'
import Summary from './preview/Summary'
import Experience from './preview/Experience'
import Education from './preview/Education'
import Skills from './preview/Skills'
import ClassicProjects from './preview/ClassicProjects'
import ProfessionalPreview from './preview/professional/ProfessionalPreview'
import ModernPreview from './preview/modern/ModernPreview'
import PaginatedResumePreview from './PaginatedResumePreview'
import {
  isProfessionalTemplate,
  isModernTemplate,
} from '@/data/resumeTemplates'

/** Template 1 — sans-serif, experience → projects → education → skills */
function ClassicPreview({ resumeInfo }) {
  return (
    <div
      className="h-full text-black px-1"
      style={{
        background: '#ffffff',
        color: '#1a1a1a',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '11px',
      }}
    >
      <PersonalDetail resumeInfo={resumeInfo} />
      {resumeInfo?.summery ? <Summary resumeInfo={resumeInfo} /> : null}
      <Experience resumeInfo={resumeInfo} />
      <ClassicProjects resumeInfo={resumeInfo} />
      <Education resumeInfo={resumeInfo} />
      <Skills resumeInfo={resumeInfo} />
    </div>
  )
}

function renderTemplateContent(resumeInfo) {
  if (isProfessionalTemplate(resumeInfo?.templateId)) {
    return <ProfessionalPreview resumeInfo={resumeInfo} />
  }

  if (isModernTemplate(resumeInfo?.templateId)) {
    return <ModernPreview resumeInfo={resumeInfo} />
  }

  return (
    <div
      className="border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor || '#333333' }}
    >
      <ClassicPreview resumeInfo={resumeInfo} />
    </div>
  )
}

function ResumePreview({ forExport = false }) {
  const { resumeInfo } = useContext(ResumeInfoContext)
  const content = renderTemplateContent(resumeInfo)

  return (
    <PaginatedResumePreview forExport={forExport}>
      {content}
    </PaginatedResumePreview>
  )
}

export default ResumePreview
