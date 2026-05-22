import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ResumeInfoContext } from '@/context/ResumeContext'
import { getTemplateSample } from '@/data/templateSamples'
import { getTemplateMeta } from '@/data/resumeTemplates'
import ResumePreview from '../resume/component/ResumePreview'

function TemplatePreviewCard({ templateId, selected, onSelect }) {
  const template = getTemplateMeta(templateId)
  const sampleData = getTemplateSample(templateId)

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'relative flex w-full flex-col rounded-xl border-2 bg-card p-2 text-left transition-all hover:shadow-lg overflow-hidden',
        selected
          ? 'border-primary ring-2 ring-primary/30 shadow-md'
          : 'border-border hover:border-primary/40',
      )}
    >
      {selected && (
        <span className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
      )}

      <div className="h-56 w-full overflow-hidden rounded-lg border border-gray-200 bg-slate-100 relative flex justify-center">
        <div
          className="pointer-events-none origin-top"
          style={{
            width: '794px',
            transform: 'scale(0.28)',
            marginTop: '4px',
          }}
        >
          <ResumeInfoContext.Provider
            value={{ resumeInfo: sampleData, setResumeInfo: () => {} }}
          >
            <ResumePreview />
          </ResumeInfoContext.Provider>
        </div>
      </div>

      <div className="px-1 pt-2 pb-1">
        <p className="text-sm font-semibold text-foreground">{template.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
          {template.description}
        </p>
      </div>
    </button>
  )
}

export default TemplatePreviewCard
