import { ResumeInfoContext } from '@/context/ResumeContext'
import React, { useContext } from 'react'
import PersonalDetail from './preview/PersonalDetail'
import { OrderedResumeBody } from './preview/ResumeSectionBlock'
import ProfessionalPreview from './preview/professional/ProfessionalPreview'
import ModernPreview from './preview/modern/ModernPreview'
import PaginatedResumePreview from './PaginatedResumePreview'
import DataSciencePreview from './preview/datascience/DataSciencePreview'
import DeveloperPreview from './preview/developer/DeveloperPreview'
import SidebarPreview from './preview/sidebar/SidebarPreview'
import {
  isProfessionalTemplate,
  isModernTemplate,
  isDataScienceTemplate,
  isDeveloperTemplate,
  isSidebarTemplate,
} from '@/data/resumeTemplates'
import { getResumeTypography } from '@/data/resumeTypography'

/** Template 1 — sans-serif, ordered body sections */
function ClassicPreview({ resumeInfo }) {
  const fonts = getResumeTypography(resumeInfo)

  return (
    <div
      className="text-black px-1"
      style={{
        background: '#ffffff',
        color: '#1a1a1a',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: fonts.body,
      }}
    >
      <PersonalDetail resumeInfo={resumeInfo} />
      <OrderedResumeBody resumeInfo={resumeInfo} variant="classic" />
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

  if (isDataScienceTemplate(resumeInfo?.templateId)) {
    return <DataSciencePreview resumeInfo={resumeInfo} />
  }

  if (isDeveloperTemplate(resumeInfo?.templateId)) {
    return <DeveloperPreview resumeInfo={resumeInfo} />
  }

  if (isSidebarTemplate(resumeInfo?.templateId)) {
    return <SidebarPreview resumeInfo={resumeInfo} />
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

  if (!resumeInfo) return null

  const content = renderTemplateContent(resumeInfo)

  return (
    <PaginatedResumePreview forExport={forExport}>
      {content}
    </PaginatedResumePreview>
  )
}

export default ResumePreview
