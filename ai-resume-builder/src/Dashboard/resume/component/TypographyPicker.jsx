import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Type, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ResumeInfoContext } from '@/context/ResumeContext'
import GlobalApis from '../../../../service/GlobalApis'
import {
  BODY_FONT_SIZE_OPTIONS,
  HEADING_FONT_SIZE_OPTIONS,
  getActiveBodySize,
  getActiveHeadingSize,
} from '@/data/resumeTypography'
import { toast } from 'sonner'

function TypographyPicker() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const { resumeid } = useParams()
  const [saving, setSaving] = useState(false)

  const headingSize = getActiveHeadingSize(resumeInfo)
  const bodySize = getActiveBodySize(resumeInfo)

  const saveSizes = (patch) => {
    const updated = { ...resumeInfo, ...patch }
    setResumeInfo(updated)
    setSaving(true)

    GlobalApis.UpdateResumeInfo(resumeid, { data: patch })
      .then(() => {
        toast.success('Font sizes updated')
      })
      .catch(() => {
        toast.error('Failed to save font sizes')
        setResumeInfo(resumeInfo)
      })
      .finally(() => setSaving(false))
  }

  const onHeadingChange = (e) => {
    const headingFontSize = Number(e.target.value)
    if (headingFontSize === headingSize) return
    saveSizes({ headingFontSize })
  }

  const onBodyChange = (e) => {
    const bodyFontSize = Number(e.target.value)
    if (bodyFontSize === bodySize) return
    saveSizes({ bodyFontSize })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2" disabled={saving}>
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Type className="h-4 w-4" />
          )}
          Font size
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 p-4" align="start">
        <p className="mb-3 text-xs font-medium text-muted-foreground">
          Same size for all headings and all body text in this resume
        </p>

        <label className="mb-3 block">
          <span className="mb-1.5 block text-xs font-semibold text-foreground">
            Headings
          </span>
          <span className="mb-1 block text-[10px] text-muted-foreground">
            Section titles, job titles, school names
          </span>
          <select
            value={headingSize}
            onChange={onHeadingChange}
            disabled={saving}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {HEADING_FONT_SIZE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold text-foreground">
            Body text
          </span>
          <span className="mb-1 block text-[10px] text-muted-foreground">
            Paragraphs, bullets, dates, contact, skills
          </span>
          <select
            value={bodySize}
            onChange={onBodyChange}
            disabled={saving}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {BODY_FONT_SIZE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TypographyPicker
